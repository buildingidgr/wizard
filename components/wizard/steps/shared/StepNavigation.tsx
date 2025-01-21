// components/wizard/steps/shared/StepNavigation.tsx
"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface StepNavigationProps {
  onContinue: () => void
  onBack: () => void
  disabled?: boolean
  continueText?: string
  loading?: boolean
}

export function StepNavigation({
  onContinue,
  onBack,
  disabled,
  continueText = "Συνέχεια",
  loading
}: StepNavigationProps) {
  return (
    <div className="flex items-center justify-between pt-6">
      <Button
        variant="ghost"
        onClick={onBack}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Πίσω
      </Button>
      <Button
        onClick={onContinue}
        disabled={disabled}
      >
        {loading ? "Παρακαλώ περιμένετε..." : continueText}
      </Button>
    </div>
  )
}