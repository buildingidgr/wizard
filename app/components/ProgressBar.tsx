import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ProgressBarProps {
  currentStep: 'intro' | 'type' | 'address' | 'details' | 'contact' | 'verify' | 'complete';
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  const steps = ['type', 'address', 'details', 'contact', 'verify', 'complete']
  const currentStepIndex = steps.indexOf(currentStep)

  return (
    <Card className="w-full mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-1">
          {steps.map((step, index) => (
            <div 
              key={step}
              className={`h-2 flex-1 rounded-full ${index <= currentStepIndex ? 'bg-primary' : 'bg-primary/30'}`}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>Start</span>
          <span>Complete</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProgressBar

