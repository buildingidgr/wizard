import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Shield, Cog } from 'lucide-react'
import { AnimatedProcess } from "@/components/ui/animated-testimonials"
import Image from 'next/image'

interface IntroductoryPageProps {
  onStart: () => void;
}

const IntroductoryPage: React.FC<IntroductoryPageProps> = ({ onStart }) => {
  return (
    <Card className="w-full max-w-4xl mx-auto bg-background shadow-none border-none">
      <CardContent className="p-0 space-y-12">
        {/* Hero Section */}
        <div className="relative overflow-hidden py-24 lg:py-32">
          {/* Gradients */}
          <div
            aria-hidden="true"
            className="flex absolute -top-96 start-1/2 transform -translate-x-1/2"
          >
            <div className="bg-gradient-to-r from-background/50 to-background blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem]" />
            <div className="bg-gradient-to-tl blur-3xl w-[90rem] h-[50rem] rounded-full origin-top-left -rotate-12 -translate-x-[15rem] from-primary-foreground via-primary-foreground to-background" />
          </div>
          {/* End Gradients */}
          <div className="relative z-10">
            <div className="container py-10 lg:py-16">
              <div className="max-w-2xl text-center mx-auto">
                <p className="">Elevate your projects</p>
                {/* Title */}
                <div className="mt-5 max-w-2xl">
                  <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl flex items-center justify-center">
                    <Cog className="mr-4 h-12 w-12" />
                    Mechlabs
                  </h1>
                </div>
                {/* End Title */}
                <div className="mt-5 max-w-3xl">
                  <p className="text-xl text-muted-foreground">
                    Senior engineering solutions based in your area. Connect with certified professionals for your mechanical and engineering projects.
                  </p>
                </div>
                {/* Buttons */}
                <div className="mt-8 gap-3 flex justify-center">
                  <Button size="lg" onClick={onStart}>Get started</Button>
                  <Button size="lg" variant="outline">Learn more</Button>
                </div>
                {/* End Buttons */}
              </div>
            </div>
          </div>
        </div>
        {/* End Hero Section */}

        {/* Process Section */}
        <div className="space-y-6 px-8 md:px-12">
          <h2 className="text-xl font-semibold tracking-tight">Our Process</h2>
          <AnimatedProcess
            processes={[
              {
                title: "Project Type",
                description: "Choose from mechanical design, prototyping, or engineering consultation. We offer a wide range of services to meet your specific needs.",
                icon: "/icons/project-type.svg"
              },
              {
                title: "Location",
                description: "Share your address to find local engineering experts. We connect you with professionals who understand your local regulations and requirements.",
                icon: "/icons/location.svg"
              },
              {
                title: "Project Details",
                description: "Describe your needs - even rough ideas help. Our experts can work with you to refine your concept and turn it into a viable project.",
                icon: "/icons/project-details.svg"
              },
              {
                title: "Timeline & Budget",
                description: "Set your preferred schedule and budget range. We'll match you with engineers who can work within your constraints and deliver quality results.",
                icon: "/icons/timeline-budget.svg"
              }
            ]}
            autoplay={true}
          />
        </div>

        {/* About Section */}
        <div className="space-y-4 px-8 md:px-12">
          <h2 className="text-xl font-semibold tracking-tight">About</h2>
          <p className="text-sm leading-6 text-muted-foreground">
            Connect with certified Mechanical Engineering professionals who can bring your 
            projects to life. Our platform matches you with experienced engineers 
            based on your specific needs and local regulations.
          </p>
        </div>

        {/* Services Section */}
        <div className="space-y-4 px-8 md:px-12">
          <h2 className="text-xl font-semibold tracking-tight">Our Services</h2>
          <ul className="space-y-2">
            {[
              "Free initial consultation to understand your needs",
              "Background-checked and licensed engineers",
              "Local professionals familiar with industry standards",
              "Clear pricing with no hidden fees",
              "Regular project updates and direct communication"
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Security Notice */}
        <div className="rounded-lg border border-muted p-6 space-y-4 mx-8 md:mx-12">
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
        <div className="space-y-6 px-8 md:px-12 pb-8 md:pb-12">
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

