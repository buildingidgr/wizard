import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FormInstructionsProps {
  step: 'type' | 'address' | 'details';
}

const FormInstructions: React.FC<FormInstructionsProps> = ({ step }) => {
  const instructions = {
    type: "Select the type of civil engineering project you're submitting. This helps us understand the nature of your project.",
    address: "Enter the project location. Use the map to pinpoint the exact address where the project will take place.",
    details: "Provide detailed information about your project, including goals, requirements, budget, and timeline.",
  }

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Instructions</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{instructions[step]}</p>
      </CardContent>
    </Card>
  )
}

export default FormInstructions

