// components/wizard/steps/CategoryStep/index.tsx
"use client"

import { StepContainer } from "../shared/StepContainer"
import { ProgressBar } from "../shared/ProgressBar"
import { StepHeader } from "../shared/StepHeader"
import { StepNavigation } from "../shared/StepNavigation"
import { CategoryGrid } from "./components/CategoryGrid"

interface CategoryStepProps {
  selectedCategory: string
  onCategorySelect: (value: string) => void
  onContinue: () => void
  onBack: () => void
  categories: {
    title: string
    description: string
    imageSrc: string
  }[]
}

export const CategoryStep = ({
  selectedCategory,
  onCategorySelect,
  onContinue,
  onBack,
  categories
}: CategoryStepProps) => (
  <StepContainer>
    <ProgressBar currentStep={0} />
    <div className="space-y-6">
      <StepHeader 
        step={1} 
        title="Επιλέξτε κατηγορία έργου"
        subtitle="Κατηγορία έργου"
      />
      <CategoryGrid
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={onCategorySelect}
      />
      <StepNavigation
        onContinue={onContinue}
        onBack={onBack}
        disabled={!selectedCategory}
      />
    </div>
  </StepContainer>
)