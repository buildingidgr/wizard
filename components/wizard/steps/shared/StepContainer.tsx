// components/wizard/steps/shared/StepContainer.tsx
"use client"

interface StepContainerProps {
  children: React.ReactNode
}

export const StepContainer = ({ children }: StepContainerProps) => (
  <div className="flex flex-col items-center justify-center p-4 sm:p-6">
    <div className="w-full sm:w-[95%] md:w-[90%] lg:w-[85%] max-w-2xl space-y-6">
      {children}
    </div>
  </div>
)