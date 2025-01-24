"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { StepContainer } from "../shared/StepContainer"
import { StepNavigation } from "../shared/StepNavigation"
import { VerificationModal } from '@/components/ui/verification-modal'

// Get the skip verification flag from environment variables
const SKIP_VERIFICATION = process.env.NEXT_PUBLIC_SKIP_PHONE_VERIFICATION === 'true'

interface ConfirmationStepProps {
  contactDetails: {
    fullName: string;
    email: string;
    phone: string;
    countryCode: string;
  };
  onConfirm: () => void;
  onBack: () => void;
  onReset: () => void;
  isSubmitting?: boolean;
}

export const ConfirmationStep = ({
  contactDetails,
  onConfirm,
  onBack,
  onReset,
  isSubmitting = false
}: ConfirmationStepProps) => {
  const [isVerifying, setIsVerifying] = useState(false)
  const [showVerificationModal, setShowVerificationModal] = useState(false)

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
              Ελέγξτε τα στοιχεία σας στα δεξιά πριν την τελική υποβολή
            </motion.p>
          </div>

          {!SKIP_VERIFICATION && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-start gap-4 p-6 rounded-lg bg-primary/5"
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
            continueText={isSubmitting ? "Υποβολή..." : isVerifying ? "Αποστολή κωδικού..." : "Υποβολή"}
            disabled={isVerifying || isSubmitting}
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