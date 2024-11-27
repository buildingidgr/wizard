import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from 'lucide-react'

interface IntroductoryPageProps {
  onStart: () => void;
}

const IntroductoryPage: React.FC<IntroductoryPageProps> = ({ onStart }) => {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold">Welcome to CivilEngineer Pro</CardTitle>
        <CardDescription className="text-xl mt-2">
          Connect with Top Civil Engineering Professionals
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-center text-muted-foreground">
          Submit your project details to access our vast network of reliable and professional engineers.
        </p>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Our Process:</h3>
          <ul className="space-y-2">
            {[
              "Select your project type",
              "Provide project location",
              "Enter project details",
              "Submit your contact information",
              "Verify your phone number"
            ].map((step, index) => (
              <li key={index} className="flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">What you'll need:</h3>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Basic project information</li>
            <li>Project location details</li>
            <li>Estimated budget and timeline</li>
            <li>Your contact information (email and phone number)</li>
          </ul>
        </div>

        <div className="bg-muted p-4 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> At the end of the process, we'll ask for your personal data, including your email and mobile phone number. We'll verify this information to ensure the quality and authenticity of submissions.
          </p>
        </div>

        <div className="flex justify-center">
          <Button onClick={onStart} size="lg">
            Start Your Project Submission
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default IntroductoryPage

