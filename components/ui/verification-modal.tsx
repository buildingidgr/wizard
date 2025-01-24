"use client"

import { useState, useEffect, useCallback } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Loader2, RotateCw } from "lucide-react"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { toast } from "sonner"

interface VerificationModalProps {
  isOpen: boolean
  onClose: () => void
  phoneNumber: string
  onVerificationComplete: () => void
  onTooManyAttempts: () => void
}

export const VerificationModal = ({
  isOpen,
  onClose,
  phoneNumber,
  onVerificationComplete,
  onTooManyAttempts
}: VerificationModalProps) => {
  const [code, setCode] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [resendCount, setResendCount] = useState(0)
  const [wrongAttempts, setWrongAttempts] = useState(0)
  const [error, setError] = useState('')
  const MAX_WRONG_ATTEMPTS = 5

  const handleSendCode = useCallback(async () => {
    try {
      setIsResending(true)
      setError('')
      
      const response = await fetch('/api/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phoneNumber })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send verification code')
      }

      if (data.success) {
        toast.success('Ο κωδικός στάλθηκε επιτυχώς')
        setResendCount((prev) => prev + 1)
      } else {
        throw new Error(data.error || 'Failed to send verification code')
      }
    } catch (error) {
      console.error('Error sending verification code:', error)
      setError('Υπήρξε πρόβλημα κατά την αποστολή του κωδικού')
      toast.error('Υπήρξε πρόβλημα κατά την αποστολή του κωδικού')
    } finally {
      setIsResending(false)
    }
  }, [phoneNumber])

  useEffect(() => {
    if (isOpen) {
      handleSendCode()
    } else {
      // Reset state when modal closes
      setCode('')
      setError('')
      setWrongAttempts(0)
      setResendCount(0)
    }
  }, [isOpen, handleSendCode])

  const handleVerifyCode = useCallback(async () => {
    if (code.length !== 6) return
    
    setError('')
    setIsVerifying(true)

    try {
      const response = await fetch('/api/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, code })
      })

      if (response.ok) {
        const data = await response.json()
        if (data.valid) {
          onVerificationComplete()
        } else {
          const newWrongAttempts = wrongAttempts + 1
          setWrongAttempts(newWrongAttempts)

          if (newWrongAttempts >= MAX_WRONG_ATTEMPTS) {
            onTooManyAttempts()
            onClose()
          } else {
            setError(`Μη έγκυρος κωδικός επαλήθευσης. Απομένουν ${MAX_WRONG_ATTEMPTS - newWrongAttempts} προσπάθειες`)
            setCode('')
          }
        }
      }
    } catch {
      setError('Σφάλμα κατά την επαλήθευση του κωδικού')
    } finally {
      setIsVerifying(false)
    }
  }, [code, phoneNumber, wrongAttempts, onVerificationComplete, onClose, onTooManyAttempts])

  // Auto-verify when code is complete
  useEffect(() => {
    if (code.length === 6) {
      handleVerifyCode()
    }
  }, [code, handleVerifyCode])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Επαλήθευση αριθμού</DialogTitle>
          <DialogDescription>
            Εισάγετε τον 6ψήφιο κωδικό που στάλθηκε στο {phoneNumber}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={code}
              onChange={setCode}
              disabled={isVerifying}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}

          <div className="flex justify-center">
            <Button
              variant="link"
              className="text-sm text-muted-foreground"
              disabled={isResending || resendCount >= 3}
              onClick={handleSendCode}
            >
              {isResending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <RotateCw className="mr-2 h-4 w-4" />
              )}
              Αποστολή νέου κωδικού
              {resendCount > 0 && ` (${3 - resendCount})`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 