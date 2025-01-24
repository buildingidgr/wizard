// components/wizard/steps/shared/StepContainer.tsx
"use client"

import { cn } from "@/lib/utils"

interface StepContainerProps {
  children: React.ReactNode
  className?: string
}

export const StepContainer = ({ children, className }: StepContainerProps) => (
  <div className="flex flex-col items-center justify-center p-4 sm:p-6">
    <div className={cn(
      "w-full sm:w-[95%] md:w-[90%] lg:w-[85%] max-w-2xl space-y-6",
      className
    )}>
      {children}
    </div>
  </div>
)