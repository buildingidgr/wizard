"use client"

interface ProgressStepsProps {
  currentStep: number
}

export function ProgressSteps({ currentStep }: ProgressStepsProps) {
  return (
    <div className="flex justify-center space-x-2 mb-8">
      {[0, 1, 2, 3, 4].map((step) => (
        <div
          key={step}
          className={`h-1 w-16 rounded ${
            step === currentStep ? "bg-primary" : "bg-gray-200"
          }`}
        />
      ))}
    </div>
  )
} 