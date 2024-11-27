import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PinnedProjectDetailsProps {
  details: {
    goals: string;
    requirements: string;
    budget: string;
    timeline: string;
    additionalDetails: string;
    concerns: string;
  };
}

const PinnedProjectDetails: React.FC<PinnedProjectDetailsProps> = ({ details }) => {
  return (
    <Card className="w-full mt-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Project Details</CardTitle>
      </CardHeader>
      <CardContent className="text-sm">
        <div className="space-y-2">
          <div>
            <span className="font-semibold">Goals:</span> {details.goals}
          </div>
          <div>
            <span className="font-semibold">Requirements:</span> {details.requirements}
          </div>
          <div>
            <span className="font-semibold">Budget:</span> ${details.budget}
          </div>
          <div>
            <span className="font-semibold">Timeline:</span> {details.timeline} days
          </div>
          {details.additionalDetails && (
            <div>
              <span className="font-semibold">Additional Details:</span> {details.additionalDetails}
            </div>
          )}
          {details.concerns && (
            <div>
              <span className="font-semibold">Concerns:</span> {details.concerns}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default PinnedProjectDetails

