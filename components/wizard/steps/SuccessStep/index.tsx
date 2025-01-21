"use client"

import { useEffect } from 'react'
import { StepContainer } from "../shared/StepContainer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"
import { useRouter } from 'next/navigation'

interface SuccessStepProps {
  onReset: () => void
}

export const SuccessStep = ({ onReset }: SuccessStepProps) => {
  const router = useRouter()

  // Automatically redirect to home after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/')
      onReset()
    }, 5000)

    return () => clearTimeout(timer)
  }, [router, onReset])

  const handleNewSubmission = () => {
    router.push('/')
    onReset()
  }

  return (
    <StepContainer>
      <Card className="w-full max-w-md space-y-6 p-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-green-600">Επιτυχής Υποβολή!</h1>
          <p className="text-muted-foreground">
            Η καταχώρησή σας έχει υποβληθεί με επιτυχία. Θα επικοινωνήσουμε μαζί σας σύντομα.
          </p>
          <p className="text-sm text-muted-foreground">
            Θα μεταφερθείτε αυτόματα στην αρχική σελίδα σε 5 δευτερόλεπτα.
          </p>
        </div>
        <Button 
          onClick={handleNewSubmission}
          className="w-full"
          variant="outline"
        >
          Νέα Καταχώρηση
        </Button>
      </Card>
    </StepContainer>
  )
} 