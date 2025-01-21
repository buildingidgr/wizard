// components/wizard/steps/shared/ProgressBar.tsx
"use client"

interface ProgressBarProps {
  currentStep: number
  totalSteps?: number
}

export const ProgressBar = ({ currentStep, totalSteps = 5 }: ProgressBarProps) => (
  <div className="flex justify-center space-x-2 mb-8">
    {Array.from({ length: totalSteps }, (_, i) => (
      <div
        key={i}
        className={`h-1 w-16 rounded ${
          i === currentStep ? "bg-primary" : "bg-gray-200"
        }`}
      />
    ))}
  </div>
)