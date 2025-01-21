// components/wizard/steps/shared/StepHeader.tsx
"use client"

interface StepHeaderProps {
  step: number
  title: string
  subtitle?: string
}

export const StepHeader = ({ step, title, subtitle }: StepHeaderProps) => (
  <div className="space-y-2 text-center">
    <span className="text-sm text-muted-foreground">
      Βήμα {step}: {subtitle}
    </span>
    <h1 className="text-3xl font-bold">{title}</h1>
  </div>
)