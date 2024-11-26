"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ProjectTypeSelection } from "./steps/project-type-selection"
import { ProjectLocationSize } from "./steps/project-location-size"
import { ProjectGoalsRequirements } from "./steps/project-goals-requirements"
import { BudgetTimeline } from "./steps/budget-timeline"
import { AdditionalDetails } from "./steps/additional-details"
import { ReviewSubmit } from "./steps/review-submit"

const steps = [
  "Project Type",
  "Location & Size",
  "Goals & Requirements",
  "Budget & Timeline",
  "Additional Details",
  "Review & Submit"
]

export function ProjectCreationFlow() {
  const [currentStep, setCurrentStep] = useState(0)
  const [projectData, setProjectData] = useState({})

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
        return <ReviewSubmit projectData={projectData} />
      default:
        return null
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Create Your Civil Engineering Project</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`text-sm font-medium ${
                  index <= currentStep ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {step}
              </div>
            ))}
          </div>
          <div className="relative h-2 bg-muted rounded-full">
            <div
              className="absolute h-2 bg-primary rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>
        {renderStep()}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handlePrevious} disabled={currentStep === 0} variant="outline">
          Previous
        </Button>
        <Button onClick={handleNext} disabled={currentStep === steps.length - 1}>
          {currentStep === steps.length - 1 ? "Submit" : "Next"}
        </Button>
      </CardFooter>
    </Card>
  )
}

