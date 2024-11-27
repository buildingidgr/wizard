import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Shield } from 'lucide-react'
import Image from 'next/image'

interface IntroductoryPageProps {
  onStart: () => void;
}

const IntroductoryPage: React.FC<IntroductoryPageProps> = ({ onStart }) => {
  return (
    <Card className="w-full max-w-4xl mx-auto bg-background">
      <CardContent className="p-8 md:p-12 space-y-16">
        {/* Hero Section */}
        <div className="space-y-6">
          <div className="w-full max-w-[300px]">
            <Image
              src="/logo.svg"
              alt="CivilEngineer Pro"
              width={300}
              height={50}
              priority
            />
          </div>
          <p className="text-xl text-muted-foreground font-light">
            Senior civil engineering solutions based in your area.
          </p>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
            <span className="text-sm text-muted-foreground">Available for new projects</span>
          </div>
        </div>

        {/* About Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold tracking-tight">About</h2>
          <p className="leading-7 text-muted-foreground">
            Connect with certified Civil Engineering professionals who can bring your construction 
            and renovation projects to life. Our platform matches you with experienced engineers 
            based on your specific needs and local regulations.
          </p>
        </div>

        {/* Services Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold tracking-tight">Our Services</h2>
          <ul className="space-y-4">
            {[
              "Free initial consultation to understand your needs",
              "Background-checked and licensed engineers",
              "Local professionals familiar with your area's regulations",
              "Clear pricing with no hidden fees",
              "Regular project updates and direct communication"
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-muted-foreground leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Process Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold tracking-tight">Our Process</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                step: "01",
                title: "Project Type",
                description: "Choose from home renovation, new construction, or inspection"
              },
              {
                step: "02",
                title: "Location",
                description: "Share your address to find local engineering experts"
              },
              {
                step: "03",
                title: "Project Details",
                description: "Describe your needs - even rough ideas help"
              },
              {
                step: "04",
                title: "Timeline & Budget",
                description: "Set your preferred schedule and budget range"
              }
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="text-sm font-mono text-muted-foreground">{item.step}</div>
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Security Notice */}
        <div className="rounded-lg border border-muted p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-xl font-semibold tracking-tight">Security & Privacy</h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We verify all contact information to protect both clients and engineers. 
            Your data is encrypted and never shared without permission. All our engineers 
            carry professional liability insurance for your peace of mind.
          </p>
        </div>

        {/* CTA Section */}
        <div className="space-y-6">
          <Button 
            onClick={onStart} 
            size="lg" 
            className="w-full md:w-auto h-12 px-8 text-base font-medium"
          >
            Start Your Project
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            Most clients receive their first engineer match within 24 hours
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default IntroductoryPage

