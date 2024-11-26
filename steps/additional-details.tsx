import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function AdditionalDetails({ updateProjectData }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold mb-4">Additional Details and Concerns</h2>
      <div>
        <Label htmlFor="additionalInfo">Any Additional Information or Specific Requests?</Label>
        <Textarea
          id="additionalInfo"
          placeholder="Please provide any other details that might be relevant to your project"
          onChange={(e) => updateProjectData({ additionalInfo: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="concerns">Do you have any specific concerns or questions for the engineers?</Label>
        <Textarea
          id="concerns"
          placeholder="List any concerns or questions you have about the project"
          onChange={(e) => updateProjectData({ concerns: e.target.value })}
        />
      </div>
    </div>
  )
}

