import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import Image from "next/image"

const projectTypes = [
  { id: "residential", label: "Residential Building", image: "/placeholder.svg?height=100&width=100" },
  { id: "commercial", label: "Commercial Building", image: "/placeholder.svg?height=100&width=100" },
  { id: "infrastructure", label: "Infrastructure (Roads, Bridges, etc.)", image: "/placeholder.svg?height=100&width=100" },
  { id: "landscaping", label: "Landscaping and Site Development", image: "/placeholder.svg?height=100&width=100" },
  { id: "renovation", label: "Renovation or Remodeling", image: "/placeholder.svg?height=100&width=100" },
  { id: "other", label: "Other (Please specify in Additional Details)", image: "/placeholder.svg?height=100&width=100" },
]

export function ProjectTypeSelection({ updateProjectData }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Select Your Project Type</h2>
      <RadioGroup onValueChange={(value) => updateProjectData({ projectType: value })}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projectTypes.map((type) => (
            <div key={type.id} className="flex items-center space-x-3 border rounded-lg p-4">
              <RadioGroupItem value={type.id} id={type.id} />
              <Label htmlFor={type.id} className="flex items-center space-x-3 cursor-pointer">
                <Image src={type.image} alt={type.label} width={100} height={100} className="rounded-md" />
                <span>{type.label}</span>
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}

