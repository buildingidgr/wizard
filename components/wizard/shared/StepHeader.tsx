"use client"

interface StepHeaderProps {
  step: number
  title: string
  subtitle: string
}

export function StepHeader({ step, title, subtitle }: StepHeaderProps) {
  return (
    <div className="space-y-2 text-center">
      <span className="text-sm text-muted-foreground">
        Βήμα {step}: {subtitle}
      </span>
      <h1 className="text-3xl font-bold">
        {title}
      </h1>
    </div>
  )
} 