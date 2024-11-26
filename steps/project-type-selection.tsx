import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const projectTypes = [
  { id: "residential", label: "Residential Building" },
  { id: "commercial", label: "Commercial Building" },
  { id: "infrastructure", label: "Infrastructure (Roads, Bridges, etc.)" },
  { id: "landscaping", label: "Landscaping and Site Development" },
  { id: "renovation", label: "Renovation or Remodeling" },
  { id: "other", label: "Other (Please specify in Additional Details)" },
]

export function ProjectTypeSelection({ updateProjectData }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Select Your Project Type</h2>
      <RadioGroup onValueChange={(value) => updateProjectData({ projectType: value })}>
        {projectTypes.map((type) => (
          <div key={type.id} className="flex items-center space-x-2 mb-2">
            <RadioGroupItem value={type.id} id={type.id} />
            <Label htmlFor={type.id}>{type.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

