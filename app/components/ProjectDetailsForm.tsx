'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
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
}

const ProjectDetailsForm: React.FC<ProjectDetailsFormProps> = ({ projectType, address, onBack }) => {
  const router = useRouter()
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
    // Here you would typically send this data to your backend
    // For now, we'll just log it and pretend to navigate to a confirmation page
    router.push('/project-summary')
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
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
              <Label htmlFor="budget">Budget</Label>
              <Input
                id="budget"
                placeholder="Estimated budget"
                value={details.budget}
                onChange={(e) => setDetails({ ...details, budget: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeline">Timeline</Label>
              <Input
                id="timeline"
                placeholder="Expected timeline"
                value={details.timeline}
                onChange={(e) => setDetails({ ...details, timeline: e.target.value })}
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

