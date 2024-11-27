"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AddressAutocomplete } from '@/components/address-autocomplete'

export default function ProjectCreationFlow() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [projectData, setProjectData] = useState({
    projectName: '',
    projectType: '',
    description: '',
    location: '',
    size: '',
    budget: '',
    timeline: '',
    additionalDetails: ''
  })

  const updateProjectData = (field: string, value: string) => {
    setProjectData(prevData => ({
      ...prevData,
      [field]: value
    }))
  }

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async () => {
    // Here you would typically send the project data to your backend
    console.log('Submitting project:', projectData)
    
    // For now, we'll just log the data and redirect to the projects page
    router.push('/projects')
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Project</h1>
      
      {step === 1 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Project Basics</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="projectName">Project Name</Label>
              <Input
                id="projectName"
                value={projectData.projectName}
                onChange={(e) => updateProjectData('projectName', e.target.value)}
                placeholder="Enter project name"
              />
            </div>
            <div>
              <Label htmlFor="projectType">Project Type</Label>
              <Select onValueChange={(value) => updateProjectData('projectType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                  <SelectItem value="infrastructure">Infrastructure</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="description">Project Description</Label>
              <Textarea
                id="description"
                value={projectData.description}
                onChange={(e) => updateProjectData('description', e.target.value)}
                placeholder="Describe your project"
              />
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Location & Size</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="location">Project Location</Label>
              <AddressAutocomplete
                onAddressSelect={(address) => updateProjectData('location', address)}
              />
            </div>
            <div>
              <Label htmlFor="size">Project Size (sq ft)</Label>
              <Input
                id="size"
                type="number"
                value={projectData.size}
                onChange={(e) => updateProjectData('size', e.target.value)}
                placeholder="Enter project size"
              />
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Budget & Timeline</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="budget">Estimated Budget ($)</Label>
              <Input
                id="budget"
                type="number"
                value={projectData.budget}
                onChange={(e) => updateProjectData('budget', e.target.value)}
                placeholder="Enter estimated budget"
              />
            </div>
            <div>
              <Label htmlFor="timeline">Project Timeline</Label>
              <Select onValueChange={(value) => updateProjectData('timeline', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select project timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-3 months">0-3 months</SelectItem>
                  <SelectItem value="3-6 months">3-6 months</SelectItem>
                  <SelectItem value="6-12 months">6-12 months</SelectItem>
                  <SelectItem value="1-2 years">1-2 years</SelectItem>
                  <SelectItem value="2+ years">2+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Review & Submit</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Project Name:</h3>
              <p>{projectData.projectName}</p>
            </div>
            <div>
              <h3 className="font-semibold">Project Type:</h3>
              <p>{projectData.projectType}</p>
            </div>
            <div>
              <h3 className="font-semibold">Description:</h3>
              <p>{projectData.description}</p>
            </div>
            <div>
              <h3 className="font-semibold">Location:</h3>
              <p>{projectData.location}</p>
            </div>
            <div>
              <h3 className="font-semibold">Size:</h3>
              <p>{projectData.size} sq ft</p>
            </div>
            <div>
              <h3 className="font-semibold">Budget:</h3>
              <p>${projectData.budget}</p>
            </div>
            <div>
              <h3 className="font-semibold">Timeline:</h3>
              <p>{projectData.timeline}</p>
            </div>
            <div>
              <Label htmlFor="additionalDetails">Additional Details</Label>
              <Textarea
                id="additionalDetails"
                value={projectData.additionalDetails}
                onChange={(e) => updateProjectData('additionalDetails', e.target.value)}
                placeholder="Any additional information about your project"
              />
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-between">
        {step > 1 && (
          <Button onClick={handleBack}>Back</Button>
        )}
        <Button onClick={handleNext}>
          {step < 4 ? 'Next' : 'Submit Project'}
        </Button>
      </div>
    </div>
  )
}

