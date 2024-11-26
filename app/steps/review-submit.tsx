"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ReviewSubmitProps {
  projectData: any
}

export function ReviewSubmit({ projectData }: ReviewSubmitProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Review & Submit</h2>
        <p className="text-muted-foreground">Review your project details before submission</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Type</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{projectData.projectType}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Location & Size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Location:</strong> {projectData.location}</p>
              <p><strong>Size:</strong> {projectData.size}</p>
              <p><strong>Site Description:</strong> {projectData.siteDescription}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Goals & Requirements</CardTitle>
          </CardHeader>
          
<CardContent>
            <div className="space-y-2">
              <p><strong>Goals:</strong> {projectData.goals}</p>
              <p><strong>Requirements:</strong> {projectData.requirements}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Budget & Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Budget:</strong> ${projectData.budget}</p>
              <p><strong>Timeline:</strong> {projectData.timeline}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Additional Details:</strong> {projectData.additionalDetails}</p>
              <p><strong>Concerns:</strong> {projectData.concerns}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Name:</strong> {projectData.name}</p>
              <p><strong>Email:</strong> {projectData.email}</p>
              <p><strong>Phone:</strong> {projectData.phone}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

