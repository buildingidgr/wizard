'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Label } from "../../components/ui/label"
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group"
import { Button } from "../../components/ui/button"
import { Home, Building2, Factory, Map, Pencil } from 'lucide-react'

const ProjectTypeSelector = () => {
  console.log('ProjectTypeSelector rendering');
  const [selectedType, setSelectedType] = React.useState("")

  const projectTypes = [
    {
      id: "residential",
      label: "Residential",
      description: "Housing developments, apartments, or single-family homes",
      icon: <Home className="w-6 h-6" />
    },
    {
      id: "commercial",
      label: "Commercial",
      description: "Office buildings, retail spaces, or mixed-use developments",
      icon: <Building2 className="w-6 h-6" />
    },
    {
      id: "industrial",
      label: "Industrial",
      description: "Manufacturing facilities, warehouses, or processing plants",
      icon: <Factory className="w-6 h-6" />
    },
    {
      id: "infrastructure",
      label: "Infrastructure",
      description: "Roads, bridges, utilities, or public facilities",
      icon: <Map className="w-6 h-6" />
    },
    {
      id: "design-planning",
      label: "Design/Planning",
      description: "Architectural designs, urban planning, or project blueprints",
      icon: <Pencil className="w-6 h-6" />
    }
  ]

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          New Civil Engineering Project
        </CardTitle>
        <CardDescription>
          Start by selecting the type of project you'd like to submit
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <RadioGroup
            value={selectedType}
            onValueChange={setSelectedType}
            className="grid gap-4"
          >
            {projectTypes.map((type) => (
              <Label
                key={type.id}
                className={`flex items-center space-x-4 p-4 border rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                  selectedType === type.id
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-slate-200 dark:border-slate-700"
                }`}
              >
                <RadioGroupItem value={type.id} className="sr-only" />
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                  {type.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{type.label}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {type.description}
                  </p>
                </div>
              </Label>
            ))}
          </RadioGroup>
          
          <div className="flex justify-end mt-6">
            <Button
              disabled={!selectedType}
              className="w-32"
            >
              Continue
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProjectTypeSelector

