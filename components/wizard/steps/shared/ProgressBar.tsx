// components/wizard/steps/shared/ProgressBar.tsx
"use client"

interface ProgressBarProps {
  currentStep: number
}

export function ProgressBar({ currentStep }: ProgressBarProps) {
  return (
    <div className="flex justify-center space-x-2 mb-8">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={`h-1 w-16 rounded ${
            i === currentStep ? "bg-primary" : "bg-muted"
          }`}
        />
      ))}
    </div>
  )
}