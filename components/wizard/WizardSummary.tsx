import { CheckCircle2 } from 'lucide-react'
import Image from 'next/image'

interface WizardSummaryProps {
  currentStep: number
  selectedCategory: string
  address: string
  additionalInfo: string
  contactDetails: {
    fullName: string
    email: string
    phone: string
  }
}

export function WizardSummary({
  currentStep,
  selectedCategory,
  address,
  additionalInfo,
  contactDetails,
}: WizardSummaryProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="space-y-6 mb-12">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="MechLabs Logo"
            width={32}
            height={32}
            className="h-8 w-auto"
          />
        </div>
        <div className="space-y-2">
          <blockquote className="text-sm font-medium">
            "Προηγμένη σκέψη για σύγχρονες ανάγκες"
          </blockquote>
          <cite className="block text-sm text-white/70">
            <a href="/engineers" className="hover:underline cursor-pointer">
              Είσαι μηχανικός; Συνεργάσου με την MechLabs
            </a>
          </cite>
        </div>
      </div>
      
      <div className="flex-1 space-y-8">
        <h2 className="text-xl font-semibold mb-6">Η πρόοδός σας</h2>
        
        {currentStep > 1 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-white/70">Κατηγορία Έργου</h3>
            <p className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>{selectedCategory}</span>
            </p>
          </div>
        )}

        {currentStep > 2 && address && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-white/70">Τοποθεσία</h3>
            <p className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>{address}</span>
            </p>
          </div>
        )}

        {currentStep > 3 && additionalInfo && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-white/70">Περιγραφή Έργου</h3>
            <p className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-1" />
              <span className="text-sm">{additionalInfo}</span>
            </p>
          </div>
        )}

        {currentStep > 4 && contactDetails.fullName && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-white/70">Στοιχεία Επικοινωνίας</h3>
            <div className="space-y-1">
              <p className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>{contactDetails.fullName}</span>
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>{contactDetails.email}</span>
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>{contactDetails.phone}</span>
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="relative w-full h-48 rounded-lg overflow-hidden">
        <Image
          src="/images/success.jpg"
          alt="Success"
          fill
          className="object-cover"
          priority
        />
      </div>

      <p>
        Θα λάβετε ένα email επιβεβαίωσης στο &quot;{contactDetails.email}&quot; με όλες τις λεπτομέρειες της καταχώρησής σας.
      </p>
    </div>
  )
} 