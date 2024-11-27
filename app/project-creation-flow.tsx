"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AddressAutocomplete } from './address-autocomplete'

// Define the shape of our project data
interface ProjectData {
  projectName: string;
  projectType: string;
  description: string;
  budget: string;
  timeline: string;
  location: string;
  size: string;
  additionalDetails: string;
}

export function ProjectCreationFlow() {
  const [step, setStep] = useState(1);
  const [projectData, setProjectData] = useState<ProjectData>({
    projectName: '',
    projectType: '',
    description: '',
    budget: '',
    timeline: '',
    location: '',
    size: '',
    additionalDetails: '',
  });

  const updateProjectData = (field: keyof ProjectData, value: string) => {
    setProjectData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  const handleNext = () => {
    setStep(prevStep => prevStep + 1);
  };

  const handleBack = () => {
    setStep(prevStep => prevStep - 1);
  };

  const handleSubmit = () => {
    console.log('Project Data:', projectData);
    // Here you would typically send the data to your backend
  };

  return (
    <Card className="w-[550px]">
      <CardHeader>
        <CardTitle>Create a New Project</CardTitle>
        <CardDescription>Step {step} of 4</CardDescription>
      </CardHeader>
      <CardContent>
        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="project-name">Project Name</Label>
              <Input
                id="project-name"
                placeholder="Enter project name"
                value={projectData.projectName}
                onChange={(e) => updateProjectData('projectName', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-type">Project Type</Label>
              <Select onValueChange={(value) => updateProjectData('projectType', value)}>
                <SelectTrigger id="project-type">
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
            <div className="space-y-2">
              <Label htmlFor="description">Project Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your project"
                value={projectData.description}
                onChange={(e) => updateProjectData('description', e.target.value)}
              />
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Budget</Label>
              <Input
                id="budget"
                placeholder="Enter project budget"
                value={projectData.budget}
                onChange={(e) => updateProjectData('budget', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeline">Timeline</Label>
              <Input
                id="timeline"
                placeholder="Enter project timeline"
                value={projectData.timeline}
                onChange={(e) => updateProjectData('timeline', e.target.value)}
              />
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <AddressAutocomplete
                onAddressSelect={(address) => updateProjectData('location', address)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="size">Project Size</Label>
              <Input
                id="size"
                placeholder="Enter project size"
                value={projectData.size}
                onChange={(e) => updateProjectData('size', e.target.value)}
              />
            </div>
          </div>
        )}
        {step === 4 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="additional-details">Additional Details</Label>
              <Textarea
                id="additional-details"
                placeholder="Any additional information"
                value={projectData.additionalDetails}
                onChange={(e) => updateProjectData('additionalDetails', e.target.value)}
              />
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {step > 1 && (
          <Button variant="outline" onClick={handleBack}>
            Back
          </Button>
        )}
        {step < 4 ? (
          <Button onClick={handleNext}>Next</Button>
        ) : (
          <Button onClick={handleSubmit}>Submit</Button>
        )}
      </CardFooter>
    </Card>
  )
}

