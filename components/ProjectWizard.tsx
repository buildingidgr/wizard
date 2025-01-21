"use client"

import { useState } from 'react'
import { IntroStep } from '@/components/wizard/steps/IntroStep'
import { CategoryStep } from '@/components/wizard/steps/CategoryStep'
import { LocationStep } from '@/components/wizard/steps/LocationStep'
import { ProjectInfoStep } from '@/components/wizard/steps/ProjectInfoStep'
import { ContactStep } from '@/components/wizard/steps/ContactStep'
import { ConfirmationStep } from '@/components/wizard/steps/ConfirmationStep'
import { SuccessStep } from '@/components/wizard/steps/SuccessStep'
import { GoogleMapsProvider } from '@/components/providers/GoogleMapsProvider'
import { WizardSummary } from '@/components/wizard/WizardSummary'
import { WizardBranding } from '@/components/wizard/WizardBranding'
import { cn } from '@/lib/utils'

interface AddressComponents {
  streetNumber: string;
  route: string;
  streetAddress: string;
  subpremise: string;
  locality: string;
  sublocality: string;
  administrativeAreaLevel1: string;
  administrativeAreaLevel2: string;
  administrativeAreaLevel3: string;
  country: string;
  countryCode: string;
  postalCode: string;
  formattedAddress: string;
}

type ExtendedPlaceResult = google.maps.places.PlaceResult & {
  parsedAddress?: AddressComponents;
};

const categories = [

  {
    id: "construction",
    title: "Κατασκευές",
    description: "Ανακαινίσεις, επισκευές, νέες κατασκευές",
    imageSrc: "/construction.png"
  },
  {
    id: "architecture",
    title: "Αρχιτεκτονική",
    description: "Αρχιτεκτονικές μελέτες και σχεδιασμός",
    imageSrc: "/architecture.png"
  },
  {
    title: "Τεχνικοί Έλεγχοι & Νομιμοποιήσεις",
    description: "Τεχνικοί έλεγχοι κτιρίων, τακτοποιήσεις αυθαιρέτων, έκδοση ταυτότητας κτηρίου, πιστοποιήσεις και άδειες",
    imageSrc: "/technical-control.png"
  },
  {
    title: "Τεχνικά Έργα & Υποδομές",
    description: "Τοπικές οδοποιίες, δίκτυα ύδρευσης, αντιπλημμυρικά έργα, γεωτεχνικές μελέτες, μικρά τεχνικά έργα",
    imageSrc: "/engineering.png"
  },
  {
    title: "Ηλεκτρομηχανολογικές Εγκαταστάσεις",
    description: "Ηλεκτρολογικές και μηχανολογικές μελέτες, συστήματα κλιματισμού, υδραυλικές εγκαταστάσεις, ανελκυστήρες",
    imageSrc: "/mechanical.png"
  },
  {
    title: "Ενεργειακές Υπηρεσίες",
    description: "Ενεργειακή πιστοποίηση, βιοκλιματικός σχεδιασμός, φωτοβολταϊκά συστήματα, ενεργειακές αναβαθμίσεις",
    imageSrc: "/energy.png"
  },
  {
    title: "Συστήματα Ασφαλείας",
    description: "Πυρασφάλεια, συστήματα παρακολούθησης, συστήματα ασφαλείας, έξυπνοι αυτοματισμοί",
    imageSrc: "/security.png"
  },
  {
    title: "Δίκτυα & Επικοινωνίες",
    description: "Τηλεπικοινωνιακά δίκτυα, δομημένη καλωδίωση, δίκτυα υπολογιστών, συστήματα επικοινωνίας",
    imageSrc: "/networks.png"
  }
]

export default function ProjectWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [address, setAddress] = useState('')
  const [selectedAddressData, setSelectedAddressData] = useState<ExtendedPlaceResult | null>(null)
  const [additionalInfo, setAdditionalInfo] = useState('')
  const [contactDetails, setContactDetails] = useState({
    fullName: '',
    email: '',
    phone: '',
    countryCode: '+30'
  })

  const handleContinue = () => {
    setCurrentStep(prev => prev + 1)
  }

  const handleBack = () => {
    setCurrentStep(prev => prev - 1)
  }

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
  }

  const handleAddressChange = (value: string, placeData?: ExtendedPlaceResult) => {
    setAddress(value)
    setSelectedAddressData(placeData || null)
  }

  const handleInfoChange = (info: string) => {
    setAdditionalInfo(info)
  }

  const handleContactDetailsChange = (details: typeof contactDetails) => {
    setContactDetails(details)
  }

  const handleReset = () => {
    setSelectedCategory('')
    setAddress('')
    setSelectedAddressData(null)
    setAdditionalInfo('')
    setContactDetails({
      fullName: '',
      email: '',
      phone: '',
      countryCode: '+30'
    })
    setCurrentStep(0)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <IntroStep onContinue={handleContinue} />
      case 1:
        return (
          <CategoryStep
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
            onContinue={handleContinue}
            onBack={handleBack}
            categories={categories}
          />
        )
      case 2:
        return (
          <LocationStep
            address={address}
            selectedAddressData={selectedAddressData}
            onAddressChange={handleAddressChange}
            onContinue={handleContinue}
            onBack={handleBack}
          />
        )
      case 3:
        return (
          <ProjectInfoStep
            additionalInfo={additionalInfo}
            onInfoChange={handleInfoChange}
            onContinue={handleContinue}
            onBack={handleBack}
          />
        )
      case 4:
        return (
          <ContactStep
            contactDetails={contactDetails}
            onContactDetailsChange={handleContactDetailsChange}
            onContinue={handleContinue}
            onBack={handleBack}
          />
        )
      case 5:
        return (
          <ConfirmationStep
            selectedCategory={selectedCategory}
            address={address}
            additionalInfo={additionalInfo}
            contactDetails={contactDetails}
            onConfirm={handleContinue}
            onBack={handleBack}
            onReset={handleReset}
            categories={categories}
          />
        )
      case 6:
        return <SuccessStep onReset={handleReset} />
      default:
        return null
    }
  }

  return (
    <GoogleMapsProvider>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 lg:py-12">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Branding on the left */}
            <div className="lg:col-span-2 lg:sticky lg:top-8 bg-card rounded-lg p-6">
              <WizardBranding />
            </div>
            
            {/* Main wizard content in the middle */}
            <div className={cn(
              "lg:sticky lg:top-8 bg-card rounded-lg p-6",
              selectedCategory || address || additionalInfo || contactDetails.fullName
                ? "lg:col-span-6"
                : "lg:col-span-10"
            )}>
              {renderStep()}
            </div>
            
            {/* Progress summary on the right */}
            {(selectedCategory || address || additionalInfo || contactDetails.fullName) && (
              <div className="lg:col-span-4 lg:sticky lg:top-8 bg-card rounded-lg p-6">
                <WizardSummary
                  currentStep={currentStep}
                  selectedCategory={selectedCategory}
                  address={address}
                  additionalInfo={additionalInfo}
                  contactDetails={contactDetails}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </GoogleMapsProvider>
  )
}