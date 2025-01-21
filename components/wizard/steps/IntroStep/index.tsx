// components/wizard/steps/IntroStep/index.tsx
"use client"

import { useState } from 'react'
import { StepContainer } from "../shared/StepContainer"
import { StepNavigation } from "../shared/StepNavigation"
import { IntroContent, IntroFooter } from "./components/IntroContent"
import { Card } from "@/components/ui/card"

interface IntroStepProps {
  onContinue: () => void
}

export const IntroStep = ({ onContinue }: IntroStepProps) => {
  const [hasAgreed, setHasAgreed] = useState(false)

  return (
    <StepContainer>
      <Card className="w-full space-y-6 p-4 sm:p-6">
        <IntroContent />
        <StepNavigation 
          onContinue={onContinue} 
          continueText="Έναρξη Καταχώρησης" 
          disabled={!hasAgreed}
        />
        <IntroFooter onAgreementChange={setHasAgreed} />
      </Card>
    </StepContainer>
  )
}