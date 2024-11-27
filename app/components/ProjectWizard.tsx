'use client'

import { useState } from 'react'
import { ProjectType, ProjectLocation, ProjectGoals, ProjectBudget, ProjectDetails, ContactInfo, ReviewSubmit } from './WizardSteps'
import ProgressIndicator from './ProgressIndicator'
import TopBar from './TopBar'

const steps = [
  'Project Type',
  'Location & Size',
  'Goals & Requirements',
  'Budget & Timeline',
  'Additional Details',
  'Contact Information',
  'Review & Submit'
]

export default function ProjectWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [projectData, setProjectData] = useState({})

  const handleNext = (stepData: object) => {
    setProjectData({ ...projectData, ...stepData })
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const handleSubmit = async () => {
    // TODO: Implement submission logic
    console.log('Submitting project data:', projectData)
    // Here you would typically send the data to your backend or webhook
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Create Your Civil Engineering Project</h1>
        <ProgressIndicator steps={steps} currentStep={currentStep} />
        <div className="mt-8">
          {currentStep === 0 && <ProjectType onNext={handleNext} data={projectData} />}
          {currentStep === 1 && <ProjectLocation onNext={handleNext} onPrevious={handlePrevious} data={projectData} />}
          {currentStep === 2 && <ProjectGoals onNext={handleNext} onPrevious={handlePrevious} data={projectData} />}
          {currentStep === 3 && <ProjectBudget onNext={handleNext} onPrevious={handlePrevious} data={projectData} />}
          {currentStep === 4 && <ProjectDetails onNext={handleNext} onPrevious={handlePrevious} data={projectData} />}
          {currentStep === 5 && <ContactInfo onNext={handleNext} onPrevious={handlePrevious} data={projectData} />}
          {currentStep === 6 && <ReviewSubmit onSubmit={handleSubmit} onPrevious={handlePrevious} data={projectData} />}
        </div>
      </div>
    </div>
  )
}

