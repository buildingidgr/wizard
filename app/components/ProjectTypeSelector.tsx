'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Home, Building2, Factory, Map, Pencil } from 'lucide-react'

const ProjectTypeSelector = () => {
  const [selectedType, setSelectedType] = React.useState("")

  const projectTypes = [
    {
      id: "residential",
      label: "Residential",
      description: "Housing developments, apartments, or single-family homes",
      icon: Home
    },
    {
      id: "commercial",
      label: "Commercial",
      description: "Office buildings, retail spaces, or mixed-use developments",
      icon: Building2
    },
    {
      id: "industrial",
      label: "Industrial",
      description: "Manufacturing facilities, warehouses, or processing plants",
      icon: Factory
    },
    {
      id: "infrastructure",
      label: "Infrastructure",
      description: "Roads, bridges, utilities, or public facilities",
      icon: Map
    },
    {
      id: "design-planning",
      label: "Design/Planning",
      description: "Architectural designs, urban planning, or project blueprints",
      icon: Pencil
    }
  ]

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">New Civil Engineering Project</CardTitle>
        <CardDescription>
          Start by selecting the type of project you'd like to submit
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <RadioGroup
          value={selectedType}
          onValueChange={setSelectedType}
          className="grid gap-4"
        >
          {projectTypes.map((type) => (
            <div key={type.id} className="relative">
              <RadioGroupItem
                value={type.id}
                id={type.id}
                className="peer sr-only"
              />
              <Label
                htmlFor={type.id}
                className="flex items-start space-x-4 rounded-lg border p-4 hover:bg-accent peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border bg-primary/5 text-primary">
                  {React.createElement(type.icon, {
                    className: "h-6 w-6",
                  })}
                </div>
                <div className="space-y-1">
                  <p className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {type.label}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {type.description}
                  </p>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
        <div className="flex justify-end">
          <Button disabled={!selectedType} className="w-32">
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProjectTypeSelector

