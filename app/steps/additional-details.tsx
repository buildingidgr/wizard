"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface AdditionalDetailsProps {
  updateProjectData: (data: any) => void
}

export function AdditionalDetails({ updateProjectData }: AdditionalDetailsProps) {
  const [additionalDetails, setAdditionalDetails] = useState("")
  const [concerns, setConcerns] = useState("")

  const handleDetailsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAdditionalDetails(event.target.value)
    updateProjectData({ additionalDetails: event.target.value })
  }

  const handleConcernsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setConcerns(event.target.value)
    updateProjectData({ concerns: event.target.value })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Additional Details</h2>
        <p className="text-muted-foreground">Share any other relevant information about your project</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="details">Additional Details</Label>
          <Textarea
            id="details"
            placeholder="Any other important information about your project"
            value={additionalDetails}
            onChange={handleDetailsChange}
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="concerns">Special Concerns</Label>
          <Textarea
            id="concerns"
            placeholder="Any specific concerns or challenges that need to be addressed"
            value={concerns}
            onChange={handleConcernsChange}
            rows={4}
          />
        </div>
      </div>
    </div>
  )
}

