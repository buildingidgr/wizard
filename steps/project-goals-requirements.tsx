import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function ProjectGoalsRequirements({ updateProjectData }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold mb-4">Project Goals and Requirements</h2>
      <div>
        <Label htmlFor="goals">What are your main goals for this project?</Label>
        <Textarea
          id="goals"
          placeholder="e.g., Create a family home, Expand office space, Improve road safety"
          onChange={(e) => updateProjectData({ goals: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="requirements">Specific Requirements or Features</Label>
        <Textarea
          id="requirements"
          placeholder="e.g., 3 bedrooms and 2 bathrooms, LEED certification, Wheelchair accessibility"
          onChange={(e) => updateProjectData({ requirements: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="constraints">Any Known Constraints or Challenges?</Label>
        <Textarea
          id="constraints"
          placeholder="e.g., Limited space, Environmental concerns, Zoning restrictions"
          onChange={(e) => updateProjectData({ constraints: e.target.value })}
        />
      </div>
    </div>
  )
}

