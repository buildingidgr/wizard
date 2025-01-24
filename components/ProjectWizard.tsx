"use client"

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { parsePhoneNumber } from 'libphonenumber-js'
import type { CountryCode } from 'libphonenumber-js'
import { CategoryStep } from '@/components/wizard/steps/CategoryStep'
import { LocationStep } from '@/components/wizard/steps/LocationStep'
import { ProjectInfoStep } from '@/components/wizard/steps/ProjectInfoStep'
import { ContactStep } from '@/components/wizard/steps/ContactStep'
import { ConfirmationStep } from '@/components/wizard/steps/ConfirmationStep'
import { SuccessStep } from '@/components/wizard/steps/SuccessStep'
import { WizardSummary } from '@/components/wizard/WizardSummary'
import { WizardBranding } from '@/components/wizard/WizardBranding'
import { GoogleMapsProvider } from '@/components/providers/GoogleMapsProvider'
import { cn } from '@/lib/utils'

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

interface ContactDetails {
  fullName: string;
  email: string;
  phone: string;
  countryCode: string;
}

export const ProjectWizard = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedAddressData, setSelectedAddressData] = useState<google.maps.places.PlaceResult | null>(null)
  const [projectTitle, setProjectTitle] = useState<string>('')
  const [additionalInfo, setAdditionalInfo] = useState<string>('')
  const [contactDetails, setContactDetails] = useState<ContactDetails>({
    fullName: '',
    email: '',
    phone: '',
    countryCode: '+30'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleContinue = async () => {
    if (currentStep === 5) {
      try {
        setIsSubmitting(true)
        
        // Parse the phone number to get the actual country code
        const phoneNumber = parsePhoneNumber(contactDetails.phone, 'GR' as CountryCode)
        const actualCountryCode = phoneNumber ? phoneNumber.countryCallingCode : '30' // Default to Greece if parsing fails
        
        const submissionData = {
          project: {
            category: selectedCategory,
            location: {
              address: selectedAddressData?.formatted_address || '',
              lat: selectedAddressData?.geometry?.location?.lat() || 0,
              lng: selectedAddressData?.geometry?.location?.lng() || 0,
              parsedAddress: {} // We'll handle address parsing in the API
            },
            details: {
              title: projectTitle,
              description: additionalInfo
            }
          },
          contact: {
            ...contactDetails,
            countryCode: `+${actualCountryCode}`
          }
        }

        const response = await fetch('/api/webhook', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(submissionData)
        })

        if (!response.ok) {
          throw new Error('Failed to submit form')
        }

        setCurrentStep(6) // Move to success step
      } catch (error) {
        console.error('Form submission error:', error)
        toast.error('Υπήρξε ένα πρόβλημα κατά την υποβολή. Παρακαλώ δοκιμάστε ξανά.')
      } finally {
        setIsSubmitting(false)
      }
      return
    }

    setCurrentStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleReset = () => {
    setCurrentStep(1)
    setSelectedCategory('')
    setSelectedAddressData(null)
    setProjectTitle('')
    setAdditionalInfo('')
    setContactDetails({
      fullName: '',
      email: '',
      phone: '',
      countryCode: '+30'
    })
  }

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
  }

  const handleAddressChange = (value: string, placeData?: google.maps.places.PlaceResult) => {
    setSelectedAddressData(placeData || null)
  }

  const handleInfoChange = (title: string, info: string) => {
    setProjectTitle(title)
    setAdditionalInfo(info)
  }

  const handleContactChange = (details: ContactDetails) => {
    setContactDetails(details)
  }

  return (
    <GoogleMapsProvider>
      <div className="min-h-screen bg-background">
        {/* Sticky top bar */}
        <div className="sticky top-0 z-50 bg-card/80 backdrop-blur-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <WizardBranding />
          </div>
        </div>

        {/* Main content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-10 gap-8 items-start">
            {/* Main wizard content */}
            <div className={cn(
              "bg-card rounded-lg p-6",
              selectedCategory || selectedAddressData?.formatted_address || additionalInfo || contactDetails.fullName
                ? "lg:col-span-6"
                : "lg:col-span-10"
            )}>
              {currentStep === 1 && (
                <CategoryStep
                  selectedCategory={selectedCategory}
                  onCategorySelect={handleCategorySelect}
                  onContinue={handleContinue}
                  onBack={handleBack}
                  categories={categories}
                />
              )}
              {currentStep === 2 && (
                <LocationStep
                  selectedAddressData={selectedAddressData}
                  onAddressChange={handleAddressChange}
                  onContinue={handleContinue}
                  onBack={handleBack}
                  address={selectedAddressData?.formatted_address || ''}
                />
              )}
              {currentStep === 3 && (
                <ProjectInfoStep
                  projectTitle={projectTitle}
                  additionalInfo={additionalInfo}
                  onInfoChange={handleInfoChange}
                  onContinue={handleContinue}
                  onBack={handleBack}
                />
              )}
              {currentStep === 4 && (
                <ContactStep
                  contactDetails={contactDetails}
                  onContactDetailsChange={handleContactChange}
                  onContinue={handleContinue}
                  onBack={handleBack}
                />
              )}
              {currentStep === 5 && (
                <ConfirmationStep
                  contactDetails={contactDetails}
                  onConfirm={handleContinue}
                  onBack={handleBack}
                  onReset={handleReset}
                  isSubmitting={isSubmitting}
                />
              )}
              {currentStep === 6 && (
                <SuccessStep onReset={handleReset} />
              )}
            </div>

            {/* Progress summary on the right */}
            {(selectedCategory || selectedAddressData?.formatted_address || additionalInfo || contactDetails.fullName) && (
              <div className="lg:col-span-4 lg:sticky lg:top-28 bg-card rounded-lg p-6">
                <WizardSummary
                  currentStep={currentStep}
                  selectedCategory={selectedCategory}
                  address={selectedAddressData?.formatted_address || ''}
                  projectTitle={projectTitle}
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