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
  disabled = false,
  continueText = "Συνέχεια",
  loading = false
}: StepNavigationProps) {
  return (
    <div className="flex gap-4">
      <Button
        onClick={onContinue}
        disabled={disabled || loading}
        className="w-full"
        size="lg"
      >
        {loading ? "Παρακαλώ περιμένετε..." : continueText}
      </Button>
      <Button
        variant="outline"
        onClick={onBack}
        disabled={loading}
        className="flex items-center justify-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Επιστροφή
      </Button>
    </div>
  )
} 