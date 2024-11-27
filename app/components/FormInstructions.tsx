import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FormInstructionsProps {
  step: 'intro' | 'type' | 'address' | 'details' | 'contact' | 'verify' | 'complete';
}

const FormInstructions: React.FC<FormInstructionsProps> = ({ step }) => {
  const instructions = {
    intro: "Welcome to CivilEngineer Pro. Learn about our process and get ready to submit your project.",
    type: "Select the type of civil engineering project you're submitting. This helps us understand the nature of your project.",
    address: (
      <>
        Enter and confirm the address for your project. Here's how:
        <ol className="list-decimal list-inside mt-2 space-y-1">
          <li>Enter the project address in the input field below.</li>
          <li>Select an address from the autocomplete suggestions.</li>
          <li>The map will update to show the selected location.</li>
          <li>Verify that the pin on the map accurately represents your project location.</li>
          <li>If the location is correct, click "Confirm Location" to proceed.</li>
          <li>If you need to make changes, simply enter a new address and select from the suggestions.</li>
        </ol>
      </>
    ),
    details: "Provide detailed information about your project, including goals, requirements, budget, and timeline.",
    contact: "Please provide your contact information so we can get in touch with you about your project.",
    verify: "Enter the verification code sent to your phone to confirm your contact details.",
    complete: "Thank you for submitting your project details. We'll review your information and get back to you soon.",
  }

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Instructions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground">{instructions[step]}</div>
      </CardContent>
    </Card>
  )
}

export default FormInstructions

