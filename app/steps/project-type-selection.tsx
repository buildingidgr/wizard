"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

const projectTypes = [
  {
    id: "residential",
    title: "Residential",
    description: "Single-family homes, apartments, or residential complexes"
  },
  {
    id: "commercial",
    title: "Commercial",
    description: "Office buildings, retail spaces, or commercial developments"
  },
  {
    id: "industrial",
    title: "Industrial",
    description: "Manufacturing facilities, warehouses, or industrial complexes"
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    description: "Roads, bridges, utilities, or public works projects"
  }
]

interface ProjectTypeSelectionProps {
  updateProjectData: (data: { projectType: string }) => void
}

export function ProjectTypeSelection({ updateProjectData }: ProjectTypeSelectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Select Project Type</h2>
        <p className="text-muted-foreground">Choose the category that best describes your project</p>
      </div>
      
      <RadioGroup
        defaultValue="residential"
        onValueChange={(value) => updateProjectData({ projectType: value })}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {projectTypes.map((type) => (
          <Card key={type.id} className="relative">
            <CardContent className="pt-6">
              <RadioGroupItem
                value={type.id}
                id={type.id}
                className="absolute right-4 top-4"
              />
              <Label
                htmlFor={type.id}
                className="block cursor-pointer"
              >
                <div className="font-semibold mb-2">{type.title}</div>
                <p className="text-sm text-muted-foreground">{type.description}</p>
              </Label>
            </CardContent>
          </Card>
        ))}
      </RadioGroup>
    </div>
  )
}

