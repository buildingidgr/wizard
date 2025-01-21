"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from "@/components/ui/card"
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  FileText,
  CheckCircle2,
  Loader2
} from "lucide-react"
import { submitProject } from "@/lib/services/projectService"
import { toast } from "sonner"
import { StepContainer } from "../shared/StepContainer"
import { StepNavigation } from "../shared/StepNavigation"
import { VerificationModal } from '@/components/ui/verification-modal'

// Get the skip verification flag from environment variables
const SKIP_VERIFICATION = process.env.NEXT_PUBLIC_SKIP_PHONE_VERIFICATION === 'true'

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

interface AddressData {
  geometry?: {
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  parsedAddress?: AddressComponents;
}

interface ConfirmationStepProps {
  selectedCategory: string;
  address: string;
  selectedAddressData: AddressData | null;
  additionalInfo: string;
  contactDetails: {
    fullName: string;
    email: string;
    phone: string;
    countryCode: string;
  };
  onConfirm: () => void;
  onBack: () => void;
  onReset: () => void;
  categories: Array<{
    title: string;
    description: string;
  }>;
}

export const ConfirmationStep = ({
  selectedCategory,
  address,
  selectedAddressData,
  additionalInfo,
  contactDetails,
  onConfirm,
  onBack,
  onReset,
  categories
}: ConfirmationStepProps) => {
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false)
  const selectedCategoryData = categories.find(cat => cat.title === selectedCategory)

  const handleStartVerification = async () => {
    if (SKIP_VERIFICATION) {
      // Skip verification and submit directly
      await handleVerificationComplete()
      return
    }

    setIsVerifying(true)
    try {
      const response = await fetch('/api/verify/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: contactDetails.phone })
      })

      if (!response.ok) {
        throw new Error('Failed to send verification code')
      }

      setIsVerificationModalOpen(true)
    } catch (error) {
      toast.error('Σφάλμα κατά την αποστολή του κωδικού επαλήθευσης')
    } finally {
      setIsVerifying(false)
    }
  }

  const handleVerificationComplete = async () => {
    setIsVerificationModalOpen(false)
    try {
      const coordinates = selectedAddressData?.geometry?.coordinates || { lat: 0, lng: 0 }
      const parsedAddress = selectedAddressData?.parsedAddress || {
        streetNumber: '',
        route: '',
        streetAddress: '',
        subpremise: '',
        locality: '',
        sublocality: '',
        administrativeAreaLevel1: '',
        administrativeAreaLevel2: '',
        administrativeAreaLevel3: '',
        country: '',
        countryCode: '',
        postalCode: '',
        formattedAddress: ''
      }

      // Format address as a string for the webhook route
      const formattedAddress = [
        parsedAddress.streetAddress,
        parsedAddress.locality || parsedAddress.sublocality || ''
      ].filter(Boolean).join(', ')

      const projectData = {
        project: {
          category: {
            title: selectedCategory,
            description: selectedCategoryData?.description || ''
          },
          location: {
            address: formattedAddress,
            coordinates: coordinates
          },
          details: {
            description: additionalInfo
          }
        },
        contact: {
          fullName: contactDetails.fullName,
          email: contactDetails.email,
          phone: {
            countryCode: contactDetails.countryCode,
            number: contactDetails.phone
          }
        },
        metadata: {
          submittedAt: new Date().toISOString(),
          locale: 'el-GR',
          source: 'web_form',
          version: '1.0.0'
        }
      }

      const result = await submitProject(projectData)
      
      if (result.success) {
        toast.success('Το έργο σας καταχωρήθηκε με επιτυχία!')
        onConfirm()
      } else {
        toast.error('Υπήρξε ένα πρόβλημα με την καταχώρηση. Παρακαλώ δοκιμάστε ξανά.')
      }
    } catch (error) {
      toast.error('Υπήρξε ένα πρόβλημα με την καταχώρηση. Παρακαλώ δοκιμάστε ξανά.')
      console.error('Error submitting project:', error)
    }
  }

  const handleVerificationFailed = () => {
    setIsVerificationModalOpen(false)
    toast.error('Η επαλήθευση απέτυχε. Παρακαλώ δοκιμάστε ξανά.')
  }

  const renderSection = (
    icon: React.ReactNode,
    title: string,
    content: React.ReactNode,
    description?: string
  ) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-4 p-4 rounded-lg hover:bg-muted/40 transition-colors"
    >
      <div className="p-2 rounded-lg bg-primary/5 text-primary h-fit">
        {icon}
      </div>
      <div className="space-y-1.5 flex-1">
        <h3 className="font-medium text-base text-foreground/90">
          {title}
        </h3>
        <div className="space-y-1">
          {content}
          {description && (
            <p className="text-sm text-muted-foreground/80 mt-1">
              {description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )

  return (
    <>
      <StepContainer>
        <div className="space-y-8">
          <div className="space-y-2 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold tracking-tight"
            >
              Επιβεβαίωση στοιχείων
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-base text-muted-foreground"
            >
              Ελέγξτε τα στοιχεία σας πριν την τελική υποβολή
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="divide-y">
              {renderSection(
                <Building2 size={20} />,
                "Κατηγορία έργου",
                <p className="text-base">{selectedCategory}</p>,
                selectedCategoryData?.description
              )}

              {renderSection(
                <MapPin size={20} />,
                "Τοποθεσία έργου",
                <p className="text-base">{address}</p>
              )}

              {renderSection(
                <FileText size={20} />,
                "Πληροφορίες έργου",
                <p className="text-base whitespace-pre-wrap">{additionalInfo}</p>
              )}

              {renderSection(
                <User size={20} />,
                "Στοιχεία επικοινωνίας",
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-base">
                    <User size={16} className="text-muted-foreground" />
                    <span>{contactDetails.fullName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-base">
                    <Mail size={16} className="text-muted-foreground" />
                    <span>{contactDetails.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-base">
                    <Phone size={16} className="text-muted-foreground" />
                    <span>{contactDetails.countryCode} {contactDetails.phone}</span>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>

          {!SKIP_VERIFICATION && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-start gap-4 p-4 rounded-lg bg-primary/5"
            >
              <div className="p-2 rounded-lg bg-background text-primary">
                <Loader2 size={20} className="animate-spin" />
              </div>
              <div className="space-y-1">
                <h3 className="font-medium text-base flex items-center gap-2">
                  Επαλήθευση αριθμού
                  <CheckCircle2 size={16} className="text-primary" />
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Για την ασφάλεια και την εγκυρότητα της καταχώρησής σας, θα σας σταλεί ένας κωδικός επαλήθευσης μέσω SMS στο {contactDetails.countryCode} {contactDetails.phone}
                </p>
              </div>
            </motion.div>
          )}

          <StepNavigation
            onContinue={handleStartVerification}
            onBack={onBack}
            continueText={isVerifying ? "Αποστολή κωδικού..." : "Υποβολή"}
            disabled={isVerifying}
          />
        </div>
      </StepContainer>

      {!SKIP_VERIFICATION && (
        <VerificationModal
          isOpen={isVerificationModalOpen}
          onClose={() => setIsVerificationModalOpen(false)}
          phoneNumber={contactDetails.phone}
          onVerificationComplete={handleVerificationComplete}
          onTooManyAttempts={onReset}
        />
      )}
    </>
  )
} 