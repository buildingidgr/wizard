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
import { Loader2 } from "lucide-react"
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

export function VerificationModal({
  isOpen,
  onClose,
  phoneNumber,
  onVerificationComplete,
  onTooManyAttempts
}: VerificationModalProps) {
  const [verificationCode, setVerificationCode] = useState('')
  const [isResending, setIsResending] = useState(false)
  const [resendCount, setResendCount] = useState(0)
  const [countdown, setCountdown] = useState(0)
  const [wrongAttempts, setWrongAttempts] = useState(0)
  const [error, setError] = useState('')
  const MAX_WRONG_ATTEMPTS = 5

  // Start countdown when modal opens
  useEffect(() => {
    if (isOpen) {
      setCountdown(60) // Start 1-minute countdown when modal opens
    } else {
      // Reset states when modal closes
      setVerificationCode('')
      setError('')
      setWrongAttempts(0)
      setResendCount(0)
      setCountdown(0)
    }
  }, [isOpen])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1)
      }, 1000)
    }
    return () => {
      if (timer) clearInterval(timer)
    }
  }, [countdown])

  const handleVerifyCode = useCallback(async () => {
    if (verificationCode.length !== 6) return
    
    setError('')

    try {
      const response = await fetch('/api/verify/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, code: verificationCode })
      })

      const data = await response.json()

      if (data.valid) {
        onVerificationComplete()
      } else {
        const newWrongAttempts = wrongAttempts + 1
        setWrongAttempts(newWrongAttempts)
        
        if (newWrongAttempts >= MAX_WRONG_ATTEMPTS) {
          toast.error('Υπέρβαση ορίου λανθασμένων προσπαθειών. Η φόρμα θα επανεκκινηθεί.')
          onClose()
          onTooManyAttempts()
        } else {
          setError(`Μη έγκυρος κωδικός επαλήθευσης. Απομένουν ${MAX_WRONG_ATTEMPTS - newWrongAttempts} προσπάθειες`)
          setVerificationCode('')
        }
      }
    } catch {
      setError('Σφάλμα κατά την επαλήθευση του κωδικού')
    }
  }, [verificationCode, phoneNumber, wrongAttempts, onVerificationComplete, onClose, onTooManyAttempts, MAX_WRONG_ATTEMPTS])

  const handleResendCode = async () => {
    if (resendCount >= 3) {
      setError('Έχετε υπερβεί το μέγιστο αριθμό προσπαθειών. Παρακαλώ δοκιμάστε αργότερα.')
      return
    }

    setIsResending(true)
    setError('')

    try {
      const response = await fetch('/api/verify/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber })
      })

      if (!response.ok) {
        throw new Error('Failed to send verification code')
      }

      setResendCount(prev => prev + 1)
      setCountdown(60) // Reset countdown after resending
      // Reset wrong attempts when sending new code
      setWrongAttempts(0)
      setVerificationCode('')
      toast.success('Νέος κωδικός εστάλη επιτυχώς')
    } catch {
      setError('Σφάλμα κατά την αποστολή νέου κωδικού')
    } finally {
      setIsResending(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Auto-verify when code is complete
  useEffect(() => {
    if (verificationCode.length === 6) {
      handleVerifyCode()
    }
  }, [verificationCode, handleVerifyCode])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Επαλήθευση αριθμού τηλεφώνου</DialogTitle>
          <DialogDescription>
            Έχουμε στείλει έναν κωδικό επαλήθευσης στο {phoneNumber}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex flex-col items-center space-y-4">
            <InputOTP
              maxLength={6}
              value={verificationCode}
              onChange={setVerificationCode}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} className={wrongAttempts > 0 ? "border-red-500" : ""} />
                <InputOTPSlot index={1} className={wrongAttempts > 0 ? "border-red-500" : ""} />
                <InputOTPSlot index={2} className={wrongAttempts > 0 ? "border-red-500" : ""} />
                <InputOTPSlot index={3} className={wrongAttempts > 0 ? "border-red-500" : ""} />
                <InputOTPSlot index={4} className={wrongAttempts > 0 ? "border-red-500" : ""} />
                <InputOTPSlot index={5} className={wrongAttempts > 0 ? "border-red-500" : ""} />
              </InputOTPGroup>
            </InputOTP>
            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <Button
                variant="outline"
                onClick={handleResendCode}
                disabled={isResending || countdown > 0 || resendCount >= 3}
              >
                {isResending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {countdown > 0 
                  ? `Περιμένετε ${formatTime(countdown)} για νέο κωδικό`
                  : resendCount >= 3
                    ? 'Υπέρβαση ορίου αποστολής κωδικών'
                    : 'Αποστολή νέου κωδικού'
                }
              </Button>
              {resendCount > 0 && resendCount < 3 && (
                <p className="text-xs text-muted-foreground text-center">
                  Απομένουν {3 - resendCount} προσπάθειες αποστολής νέου κωδικού
                </p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 