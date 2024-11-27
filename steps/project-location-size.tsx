import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function ProjectLocationSize({ updateProjectData }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold mb-4">Project Location and Size</h2>
      <div>
        <Label htmlFor="location">Project Location</Label>
        <Input
          id="location"
          placeholder="Enter the project location"
          onChange={(e) => updateProjectData({ location: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="size">Approximate Size (in square feet or acres)</Label>
        <Input
          id="size"
          placeholder="e.g., 2000 sq ft or 5 acres"
          onChange={(e) => updateProjectData({ size: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="description">Brief Description of the Site</Label>
        <Textarea
          id="description"
          placeholder="Describe the current condition of the site, any existing structures, terrain, etc."
          onChange={(e) => updateProjectData({ siteDescription: e.target.value })}
        />
      </div>
    </div>
  )
}

