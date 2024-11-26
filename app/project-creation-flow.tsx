"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ProjectTypeSelection } from "@/app/steps/project-type-selection"
import { ProjectLocationSize } from "@/app/steps/project-location-size"
import { ProjectGoalsRequirements } from "@/app/steps/project-goals-requirements"
import { BudgetTimeline } from "@/app/steps/budget-timeline"
import { AdditionalDetails } from "@/app/steps/additional-details"
import { ReviewSubmit } from "@/app/steps/review-submit"
import { ContactDetails } from "@/app/steps/contact-details"
import { TopBar } from "@/app/components/top-bar"

const steps = [
  "Project Type",
  "Location & Size",
  "Goals & Requirements",
  "Budget & Timeline",
  "Additional Details",
  "Contact Details",
  "Review & Submit"
]

const WEBHOOK_URL = process.env.NEXT_PUBLIC_WEBHOOK_URL || 'https://webhook-service-production-dfad.up.railway.app/'

export function ProjectCreationFlow() {
  const [currentStep, setCurrentStep] = useState(0)
  const [projectData, setProjectData] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const updateProjectData = (newData) => {
    setProjectData((prevData) => ({ ...prevData, ...newData }))
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    const projectId = `PROJ-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    
    const formattedData = {
      projectId,
      projectType: projectData.projectType,
      location: {
        address: projectData.location,
        coordinates: {
          lat: null,
          lng: null
        }
      },
      size: {
        description: projectData.size,
        details: projectData.siteDescription
      },
      goals: projectData.goals,
      requirements: projectData.requirements,
      budget: {
        amount: parseFloat(projectData.budget) || null,
        currency: "USD"
      },
      timeline: {
        duration: projectData.timeline,
        preferredStartDate: null
      },
      additionalDetails: projectData.additionalDetails,
      concerns: projectData.concerns,
      contact: {
        name: projectData.name,
        email: projectData.email,
        phone: projectData.phone
      },
      submissionDate: new Date().toISOString(),
      status: "pending"
    }

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const result = await response.json()
      console.log('Success:', result)
      
      router.push(`/thank-you?id=${projectId}&status=pending&interested=3`)
    } catch (error) {
      console.error('Error:', error)
      alert('There was an error submitting your project. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <ProjectTypeSelection updateProjectData={updateProjectData} />
      case 1:
return <ProjectLocationSize updateProjectData={updateProjectData} />
      case 2:
        return <ProjectGoalsRequirements updateProjectData={updateProjectData} />
      case 3:
        return <BudgetTimeline updateProjectData={updateProjectData} />
      case 4:
        return <AdditionalDetails updateProjectData={updateProjectData} />
      case 5:
        return <ContactDetails updateProjectData={updateProjectData} />
      case 6:
        return <ReviewSubmit projectData={projectData} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <div className="w-full bg-background border-b">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <p className="text-lg text-muted-foreground">
            This wizard will guide you through the process of defining your civil engineering project. We'll collect details about your project type, location, goals, budget, and timeline. Once submitted, our platform will match your project with qualified professionals who can bid on your job. You'll then be able to review proposals and choose the best engineer for your needs.
          </p>
        </div>
      </div>
      <div className="w-full max-w-5xl mx-auto px-4 py-6">
        <Card className="border-none shadow-none bg-card">
          <CardHeader>
            <CardTitle>Create New Project</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="flex items-center gap-x-6 px-4">
                  {steps.map((step, index) => (
                    <div key={index} className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          currentStep >= index 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {index + 1}
                      </div>
                      {index < steps.length - 1 && (
                        <div className="w-12 h-1 bg-muted mx-2"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-2 bg-muted rounded-full">
                <div
                  className="absolute h-2 bg-primary rounded-full transition-all duration-300 ease-in-out"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="mt-8">
              {renderStep()}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 pt-8">
            <Button 
              onClick={handlePrevious} 
              disabled={currentStep === 0 || isSubmitting} 
              variant="outline" 
              className="w-full sm:w-auto"
            >
              Previous
            </Button>
            {currentStep === steps.length - 1 ? (
              <Button 
                onClick={handleSubmit} 
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="w-full sm:w-auto"
              >
                Next
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

