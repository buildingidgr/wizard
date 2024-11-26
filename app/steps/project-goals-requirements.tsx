import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export function ProjectGoalsRequirements({ updateProjectData }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold mb-4">Project Goals and Requirements</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 space-y-4">
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
        <div className="flex-1 flex items-center justify-center">
          <Image src="/placeholder.svg?height=300&width=300" alt="Project Goals Illustration" width={300} height={300} className="rounded-lg" />
        </div>
      </div>
    </div>
  )
}

