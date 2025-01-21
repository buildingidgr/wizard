// components/wizard/steps/shared/StepNavigation.tsx
"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface StepNavigationProps {
  onContinue: () => void
  onBack?: () => void
  continueText?: string
  backText?: string
  disabled?: boolean
}

export const StepNavigation = ({ 
  onContinue, 
  onBack, 
  continueText = "Επιβεβαίωση",
  backText = "Επιστροφή",
  disabled = false
}: StepNavigationProps) => (
  <div className="flex gap-4">
    <Button 
      onClick={onContinue}
      disabled={disabled}
      className="w-full"
      size="lg"
    >
      {continueText}
    </Button>
    {onBack && (
      <Button 
        variant="outline"
        onClick={onBack}
        className="flex items-center justify-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        {backText}
      </Button>
    )}
  </div>
)