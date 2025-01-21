"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface StepContainerProps {
  children: ReactNode
  className?: string
}

export function StepContainer({ children, className }: StepContainerProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-6", className)}>
      <div className="w-full max-w-md space-y-6">
        {children}
      </div>
    </div>
  )
} 