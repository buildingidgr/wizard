import { CheckCircle2 } from 'lucide-react'

interface WizardSummaryProps {
  currentStep: number
  selectedCategory: string
  address: string
  projectTitle: string
  additionalInfo: string
  contactDetails: {
    fullName: string
    email: string
    phone: string
    countryCode: string
  }
}

export function WizardSummary({
  currentStep,
  selectedCategory,
  address,
  projectTitle,
  additionalInfo,
  contactDetails,
}: WizardSummaryProps) {
  return (
    <div className="flex flex-col h-full">      
      <div className="flex-1 space-y-8">
        <h2 className="text-xl font-semibold mb-6 text-foreground">Η πρόοδός σας</h2>
        
        {currentStep > 1 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Κατηγορία Έργου</h3>
            <p className="flex items-center gap-2 text-foreground">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>{selectedCategory}</span>
            </p>
          </div>
        )}

        {currentStep > 2 && address && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Τοποθεσία</h3>
            <p className="flex items-center gap-2 text-foreground">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>{address}</span>
            </p>
          </div>
        )}

        {currentStep > 3 && (projectTitle || additionalInfo) && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Περιγραφή Έργου</h3>
            <div className="flex flex-col gap-2">
              {projectTitle && (
                <p className="flex items-start gap-2 text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-1" />
                  <span className="font-medium">{projectTitle}</span>
                </p>
              )}
              {additionalInfo && (
                <p className="flex items-start gap-2 text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-1" />
                  <span className="text-sm">{additionalInfo}</span>
                </p>
              )}
            </div>
          </div>
        )}

        {currentStep > 5 && contactDetails.fullName && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Στοιχεία Επικοινωνίας</h3>
            <div className="space-y-1">
              <p className="flex items-center gap-2 text-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>{contactDetails.fullName}</span>
              </p>
              <p className="flex items-center gap-2 text-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>{contactDetails.email}</span>
              </p>
              <p className="flex items-center gap-2 text-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>{contactDetails.phone}</span>
              </p>
            </div>
          </div>
        )}
      </div>

      {currentStep > 5 && contactDetails.email && (
        <p className="mt-4 text-muted-foreground">
          Θα λάβετε ένα email επιβεβαίωσης στο &quot;{contactDetails.email}&quot; με όλες τις λεπτομέρειες της καταχώρησής σας.
        </p>
      )}
    </div>
  )
} 