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
import { toast } from "sonner"
import { StepContainer } from "../shared/StepContainer"
import { StepNavigation } from "../shared/StepNavigation"
import { VerificationModal } from '@/components/ui/verification-modal'

// Get the skip verification flag from environment variables
const SKIP_VERIFICATION = process.env.NEXT_PUBLIC_SKIP_PHONE_VERIFICATION === 'true'

interface ConfirmationStepProps {
  selectedCategory: string;
  address: string;
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
  additionalInfo,
  contactDetails,
  onConfirm,
  onBack,
  onReset,
  categories
}: ConfirmationStepProps) => {
  const [isVerifying, setIsVerifying] = useState(false)
  const [showVerificationModal, setShowVerificationModal] = useState(false)
  const selectedCategoryData = categories.find(cat => cat.title === selectedCategory)

  const handleStartVerification = async () => {
    if (SKIP_VERIFICATION) {
      onConfirm()
      return
    }
    setIsVerifying(true)
    setShowVerificationModal(true)
  }

  const handleVerificationSuccess = () => {
    setShowVerificationModal(false)
    onConfirm()
  }

  const handleVerificationFailed = () => {
    setShowVerificationModal(false)
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
          isOpen={showVerificationModal}
          onClose={handleVerificationFailed}
          phoneNumber={contactDetails.phone}
          onVerificationComplete={handleVerificationSuccess}
          onTooManyAttempts={onReset}
        />
      )}
    </>
  )
} 