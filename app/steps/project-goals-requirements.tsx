"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface ProjectGoalsRequirementsProps {
  updateProjectData: (data: any) => void
}

export function ProjectGoalsRequirements({ updateProjectData }: ProjectGoalsRequirementsProps) {
  const [goals, setGoals] = useState("")
  const [requirements, setRequirements] = useState("")

  const handleGoalsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setGoals(event.target.value)
    updateProjectData({ goals: event.target.value })
  }

  const handleRequirementsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRequirements(event.target.value)
    updateProjectData({ requirements: event.target.value })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Project Goals & Requirements</h2>
        <p className="text-muted-foreground">Define what you want to achieve and any specific requirements</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="goals">Project Goals</Label>
          <Textarea
            id="goals"
            placeholder="What are the main objectives of your project?"
            value={goals}
            onChange={handleGoalsChange}
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="requirements">Specific Requirements</Label>
          <Textarea
            id="requirements"
            placeholder="List any specific requirements, regulations, or constraints"
            value={requirements}
            onChange={handleRequirementsChange}
            rows={4}
          />
        </div>
      </div>
    </div>
  )
}

