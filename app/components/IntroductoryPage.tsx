import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Shield } from 'lucide-react'

interface IntroductoryPageProps {
  onStart: () => void;
}

const IntroductoryPage: React.FC<IntroductoryPageProps> = ({ onStart }) => {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold">Welcome to CivilEngineer Pro</CardTitle>
        <CardDescription className="text-xl mt-2">
          Your Bridge to Expert Solutions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-center text-muted-foreground">
          Connect with certified Civil Engineering professionals who can bring your construction and renovation projects to life. Our platform matches you with experienced engineers based on your specific needs.
        </p>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Why Choose Us:</h3>
          <ul className="space-y-2">
            {[
              "Free initial consultation to understand your needs",
              "Engineers are background-checked and licensed",
              "Local professionals familiar with your area's regulations",
              "Clear pricing with no hidden fees",
              "Regular project updates and direct communication"
            ].map((item, index) => (
              <li key={index} className="flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Simple 5-Step Process:</h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>Project Type: Choose from home renovation, new construction, structural inspection, or property assessment</li>
            <li>Location: Share your address to find engineers familiar with local building codes</li>
            <li>Project Details: Describe what you need - even rough ideas are helpful</li>
            <li>Timeline & Budget: Tell us your desired completion date and spending range</li>
            <li>Contact Info: Provide your email and phone for project updates</li>
          </ol>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">What to Prepare:</h3>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Property details (address, size, current condition)</li>
            <li>Photos of the project area (if available)</li>
            <li>Your preferred timeline</li>
            <li>Budget range</li>
            <li>Any specific concerns or requirements</li>
          </ul>
        </div>

        <div className="bg-muted p-4 rounded-lg flex items-start space-x-4">
          <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold">Safety & Privacy:</h4>
            <p className="text-sm text-muted-foreground">
              We verify your contact information to protect both you and our engineers. Your data is encrypted and never shared without permission. Our engineers carry professional liability insurance for your peace of mind.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <Button onClick={onStart} size="lg">
            Submit Project
          </Button>
          <p className="text-sm text-muted-foreground">
            Most clients receive their first engineer match within 24 hours.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default IntroductoryPage

