"use client"

import { useState, useRef, ChangeEvent } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { DrawerSelect, DrawerSelectItem } from "@/components/ui/drawer-select"
import { AddressAutocomplete } from "@/components/AddressAutocomplete"
import type { ExtendedPlaceResult } from "@/types/address"

interface Category {
  title: string
  imageSrc: string
}

interface ContactDetails {
  fullName: string
  email: string
  phone: string
  countryCode: string
}

interface ProgressStepsProps {
  currentStep: number
}

interface IntroStepProps {
  onContinue: () => void
}

interface CategoryStepProps {
  selectedCategory: string
  onCategorySelect: (category: string) => void
  onContinue: () => void
  onBack: () => void
  categories: Category[]
}

interface LocationStepProps {
  address: string
  selectedAddressData: ExtendedPlaceResult | null
  onAddressChange: (address: string, placeData?: ExtendedPlaceResult) => void
  onContinue: () => void
  onBack: () => void
}

interface ProjectInfoStepProps {
  additionalInfo: string
  onInfoChange: (info: string) => void
  onContinue: () => void
  onBack: () => void
}

interface ContactStepProps {
  contactDetails: ContactDetails
  onContactDetailsChange: (details: ContactDetails) => void
  onContinue: () => void
  onBack: () => void
}

interface ConfirmationStepProps {
  selectedCategory: string
  address: string
  additionalInfo: string
  contactDetails: ContactDetails
  onConfirm: () => void
  onBack: () => void
}

// Shared ProgressSteps component
const ProgressSteps = ({ currentStep }: ProgressStepsProps) => (
  <div className="flex justify-center space-x-2 mb-8">
    {[0, 1, 2, 3, 4].map((step) => (
      <div
        key={step}
        className={`h-1 w-16 rounded ${
          step === currentStep ? "bg-primary" : "bg-muted"
        }`}
      />
    ))}
  </div>
)

// IntroStep Component
export const IntroStep = ({ onContinue }: IntroStepProps) => (
  <div className="flex items-center justify-center p-6">
    <Card className="w-full max-w-md space-y-6 p-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Καταχώρηση έργου</h1>
      </div>
      <Button onClick={onContinue} size="lg" className="w-full">
        Continue
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Κάνοντας κλκ στο κουμπί συνέχεια, συμφωνείτε αυτόματως με τους{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          Όρους Χρήσης
        </a>{" "}
        και{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          Πολιτική Απορρήτου
        </a>
        .
      </p>
    </Card>
  </div>
)

// CategoryStep Component
export const CategoryStep = ({ 
  selectedCategory, 
  onCategorySelect, 
  onContinue, 
  onBack,
  categories 
}: CategoryStepProps) => (
  <div className="flex flex-col items-center justify-center p-6">
    <div className="w-full max-w-md space-y-6">
      <ProgressSteps currentStep={0} />
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <span className="text-sm text-muted-foreground">
            Βήμα 1: Κατηγορία έργου
          </span>
          <h1 className="text-3xl font-bold">
            Επιλέξτε κατηγορία έργου
          </h1>
        </div>
        <DrawerSelect 
          onValueChange={onCategorySelect} 
          value={selectedCategory} 
          placeholder="Επιλέξτε κατηγορία"
        >
          {categories.map((category, index) => (
            <DrawerSelectItem 
              key={index} 
              value={category.title}
            >
              {category.title}
            </DrawerSelectItem>
          ))}
        </DrawerSelect>
        <Button 
          onClick={onContinue}
          disabled={!selectedCategory}
          className="w-full"
          size="lg"
        >
          Επιβεβαίωση
        </Button>
        <Button 
          variant="outline"
          onClick={onBack}
          className="w-full flex items-center justify-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Επιστροφή
        </Button>
      </div>
    </div>
  </div>
)

// LocationStep Component
export const LocationStep = ({
  address,
  selectedAddressData,
  onAddressChange,
  onContinue,
  onBack
}: LocationStepProps) => {
  const mapContainerRef = useRef(null)

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <ProgressSteps currentStep={1} />
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <span className="text-sm text-muted-foreground">
              Βήμα 2: Τοποθεσία έργου
            </span>
            <h1 className="text-3xl font-bold">
              Επιλέξτε τοποθεσία έργου
            </h1>
          </div>
          <div className="space-y-4">
            <AddressAutocomplete
              value={address}
              onChange={onAddressChange}
              className="w-full"
            />
            <div className="relative" ref={mapContainerRef}>
              <div 
                id="map"
                className="w-full rounded-lg overflow-hidden border shadow-sm transition-all h-[300px]"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <Button 
              onClick={onContinue}
              disabled={!selectedAddressData}
              className="w-full"
              size="lg"
            >
              Επιβεβαίωση
            </Button>
            <Button 
              variant="outline"
              onClick={onBack}
              className="flex items-center justify-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Επιστροφή
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ProjectInfoStep Component
export const ProjectInfoStep = ({
  additionalInfo,
  onInfoChange,
  onContinue,
  onBack
}: ProjectInfoStepProps) => {
  const [localInfo, setLocalInfo] = useState(additionalInfo)

  const handleSubmit = () => {
    onInfoChange(localInfo)
    onContinue()
  }

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <ProgressSteps currentStep={2} />
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <span className="text-sm text-muted-foreground">
              Βήμα 3: Επιπλέον πληροφορίες
            </span>
            <h1 className="text-3xl font-bold">
              Πληροφορίες έργου
            </h1>
          </div>
          <div className="space-y-4">
            <Textarea
              placeholder="Περιγράψτε το έργο σας με περισσότερες λεπτομέρειες..."
              value={localInfo}
              onChange={(e) => setLocalInfo(e.target.value)}
              className="min-h-[200px] resize-none"
            />
          </div>
          <div className="flex gap-4">
            <Button 
              onClick={handleSubmit}
              disabled={!localInfo.trim()}
              className="w-full"
              size="lg"
            >
              Επιβεβαίωση
            </Button>
            <Button 
              variant="outline"
              onClick={onBack}
              className="flex items-center justify-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Επιστροφή
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ContactStep Component
export const ContactStep = ({
  contactDetails,
  onContactDetailsChange,
  onContinue,
  onBack
}: ContactStepProps) => {
  const [localContactDetails, setLocalContactDetails] = useState({
    fullName: contactDetails.fullName,
    email: contactDetails.email,
    phone: contactDetails.phone,
    countryCode: '+30'
  })

  const handleInputChange = (field: keyof ContactDetails) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (field === 'phone' && !/^\d*$/.test(value)) return
    setLocalContactDetails(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = () => {
    onContactDetailsChange(localContactDetails)
    onContinue()
  }

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <ProgressSteps currentStep={3} />
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <span className="text-sm text-muted-foreground">
              Βήμα 4: Στοιχεία επικοινωνίας
            </span>
            <h1 className="text-3xl font-bold">
              Στοιχεία επικοινωνίας
            </h1>
          </div>
          <div className="space-y-4">
            <Input
              placeholder="Ονοματεπώνυμο"
              value={localContactDetails.fullName}
              onChange={handleInputChange('fullName')}
              className="w-full"
            />
            <Input
              type="email"
              placeholder="Email"
              value={localContactDetails.email}
              onChange={handleInputChange('email')}
              className="w-full"
            />
            <div className="flex gap-2">
              <select
                value={localContactDetails.countryCode}
                onChange={(e) => setLocalContactDetails(prev => ({
                  ...prev,
                  countryCode: e.target.value
                }))}
                className="flex h-10 w-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="+30">🇬🇷 +30</option>
                <option value="+357">🇨🇾 +357</option>
                <option value="+44">🇬🇧 +44</option>
              </select>
              <Input
                type="tel"
                placeholder="Κινητό τηλέφωνο"
                value={localContactDetails.phone}
                onChange={handleInputChange('phone')}
                className="flex-1"
                maxLength={10}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <Button 
              onClick={handleSubmit}
              disabled={!localContactDetails.fullName || !localContactDetails.email || !localContactDetails.phone}
              className="w-full"
              size="lg"
            >
              Επιβεβαίωση
            </Button>
            <Button 
              variant="outline"
              onClick={onBack}
              className="flex items-center justify-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Επιστροφή
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ConfirmationStep Component
export const ConfirmationStep = ({
  selectedCategory,
  address,
  additionalInfo,
  contactDetails,
  onConfirm,
  onBack
}: ConfirmationStepProps) => (
  <div className="flex flex-col items-center justify-center p-6">
    <div className="w-full max-w-md space-y-6">
      <ProgressSteps currentStep={4} />
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <span className="text-sm text-muted-foreground">
            Βήμα 5: Τελική επιβεβαίωση
          </span>
          <h1 className="text-3xl font-bold">
            Επιβεβαίωση στοιχείων
          </h1>
        </div>

        <Card className="p-4 space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">Κατηγορία</h3>
            <p className="text-sm text-muted-foreground">{selectedCategory}</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Διεύθυνση</h3>
            <p className="text-sm text-muted-foreground">{address}</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Πληροφορίες</h3>
            <p className="text-sm text-muted-foreground">{additionalInfo}</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Στοιχεία επικοινωνίας</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>{contactDetails.fullName}</p>
              <p>{contactDetails.email}</p>
              <p>{contactDetails.phone}</p>
            </div>
          </div>
        </Card>

        <div className="flex gap-4">
          <Button 
            onClick={onConfirm}
            className="w-full"
            size="lg"
          >
            Επιβεβαίωση
          </Button>
          <Button 
            variant="outline"
            onClick={onBack}
            className="flex items-center justify-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Επιστροφή
          </Button>
        </div>
      </div>
    </div>
  </div>
)