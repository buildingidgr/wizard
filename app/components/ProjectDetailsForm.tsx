'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'

interface ProjectDetailsFormProps {
  projectType: string;
  address: string;
  onBack: () => void;
  onSubmit: (details: any) => void;
}

const ProjectDetailsForm: React.FC<ProjectDetailsFormProps> = ({ projectType, address, onBack, onSubmit }) => {
  const [details, setDetails] = React.useState({
    goals: '',
    requirements: '',
    budget: '',
    timeline: '',
    additionalDetails: '',
    concerns: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitting project details:', details)
    onSubmit(details)
  }

  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const numericValue = value.replace(/[^0-9]/g, '')
    setDetails(prev => ({ ...prev, [name]: numericValue }))
  }

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <div className="flex items-center">
          <Button variant="ghost" onClick={onBack} className="mr-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <CardTitle className="text-2xl">Project Details</CardTitle>
            <CardDescription>
              Provide information about your {projectType} project at {address}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="goals">Project Goals</Label>
            <Textarea
              id="goals"
              placeholder="What are the main objectives of this project?"
              value={details.goals}
              onChange={(e) => setDetails({ ...details, goals: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="requirements">Project Requirements</Label>
            <Textarea
              id="requirements"
              placeholder="What are the specific requirements or constraints for this project?"
              value={details.requirements}
              onChange={(e) => setDetails({ ...details, requirements: e.target.value })}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Budget (in $)</Label>
              <Input
                id="budget"
                name="budget"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Estimated budget"
                value={details.budget}
                onChange={handleNumberInput}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeline">Timeline (in days)</Label>
              <Input
                id="timeline"
                name="timeline"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Expected timeline"
                value={details.timeline}
                onChange={handleNumberInput}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="additionalDetails">Additional Details</Label>
            <Textarea
              id="additionalDetails"
              placeholder="Any other important information about the project"
              value={details.additionalDetails}
              onChange={(e) => setDetails({ ...details, additionalDetails: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="concerns">Concerns or Challenges</Label>
            <Textarea
              id="concerns"
              placeholder="Are there any specific concerns or challenges you foresee?"
              value={details.concerns}
              onChange={(e) => setDetails({ ...details, concerns: e.target.value })}
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit">Submit Project Details</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default ProjectDetailsForm

