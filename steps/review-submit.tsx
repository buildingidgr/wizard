import React from 'react'
import { Card, CardContent, CardTitle } from "@/components/ui/card"

interface ReviewSubmitProps {
  projectData: any
}

export function ReviewSubmit({ projectData }: ReviewSubmitProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Review & Submit</h2>
      <Card>
        <CardContent>
          <CardTitle className="mb-4">Project Summary</CardTitle>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Project Type:</h3>
              <p>{projectData.projectType}</p>
            </div>
            <div>
              <h3 className="font-semibold">Location:</h3>
              <p>{projectData.location}</p>
            </div>
            <div>
              <h3 className="font-semibold">Size:</h3>
              <p>{projectData.size}</p>
            </div>
            <div>
              <h3 className="font-semibold">Goals:</h3>
              <p>{projectData.goals}</p>
            </div>
            <div>
              <h3 className="font-semibold">Requirements:</h3>
              <p>{projectData.requirements}</p>
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
              <h3 className="font-semibold">Additional Details:</h3>
              <p>{projectData.additionalDetails}</p>
            </div>
            <div>
              <h3 className="font-semibold">Contact Information:</h3>
              <p>Name: {projectData.name}</p>
              <p>Email: {projectData.email}</p>
              <p>Phone: {projectData.phone}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

