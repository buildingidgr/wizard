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

const categories = [
  {
    title: "Αρχιτεκτονικός Σχεδιασμός",
    description: "Αρχιτεκτονικές μελέτες, σχεδιασμός εσωτερικών χώρων, φωτορεαλιστικές απεικονίσεις, διαμόρφωση κήπων και εξωτερικών χώρων",
    imageSrc: "/architecture.png"
  },
  {
    title: "Στατικές & Κατασκευαστικές Μελέτες",
    description: "Στατικές μελέτες, άδειες δόμησης, επιβλέψεις κατασκευών, ανακαινίσεις και κτιριακές παρεμβάσεις",
    imageSrc: "/construction.png"
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

interface GooglePlaceGeometry {
  location: {
    lat: () => number;
    lng: () => number;
  };
}

interface GooglePlaceData {
  geometry?: GooglePlaceGeometry;
  formatted_address?: string;
  address_components?: Array<{
    long_name: string;
    short_name: string;
    types: string[];
  }>;
}

export default function ProjectWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [address, setAddress] = useState('')
  const [selectedAddressData, setSelectedAddressData] = useState<GooglePlaceData | null>(null)
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

  const handleAddressChange = (value: string, placeData?: GooglePlaceData) => {
    console.log('Address change in ProjectWizard:', { value, placeData });
    if (placeData?.geometry?.location) {
      console.log('Location data:', {
        lat: placeData.geometry.location.lat(),
        lng: placeData.geometry.location.lng()
      });
    }
    setAddress(value);
    setSelectedAddressData(placeData || null);
  }

  const handleInfoChange = (info: string) => {
    setAdditionalInfo(info)
  }

  const handleContactDetailsChange = (details: typeof contactDetails) => {
    setContactDetails(details)
  }

  const handleReset = () => {
    // Reset all form data
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
            info={additionalInfo}
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
        console.log('Rendering ConfirmationStep with selectedAddressData:', selectedAddressData);
        return (
          <ConfirmationStep
            selectedCategory={selectedCategory}
            address={address}
            selectedAddressData={selectedAddressData}
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
      <div className="grid min-h-screen md:grid-cols-2">
        <div className="relative hidden bg-[#0B0B0A] p-10 text-white md:flex">
          <WizardSummary
            currentStep={currentStep}
            selectedCategory={selectedCategory}
            address={address}
            additionalInfo={additionalInfo}
            contactDetails={contactDetails}
          />
        </div>
        <div className="relative flex items-center justify-center">
          <div className="w-full px-4 sm:px-6 md:px-8">
            {renderStep()}
          </div>
        </div>
      </div>
    </GoogleMapsProvider>
  )
}