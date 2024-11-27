import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Building2, Factory, Map, Pencil, Construction } from 'lucide-react'

interface PinnedProjectTypeProps {
  projectType: string;
}

const projectTypeIcons = {
  residential: Home,
  commercial: Building2,
  industrial: Factory,
  infrastructure: Map,
  "design-planning": Pencil,
  "small-scale": Construction,
}

const projectTypeLabels = {
  residential: "Residential",
  commercial: "Commercial",
  industrial: "Industrial",
  infrastructure: "Infrastructure",
  "design-planning": "Design/Planning",
  "small-scale": "Small-Scale Construction Projects",
}

const PinnedProjectType: React.FC<PinnedProjectTypeProps> = ({ projectType }) => {
  const Icon = projectTypeIcons[projectType as keyof typeof projectTypeIcons] || Home
  const label = projectTypeLabels[projectType as keyof typeof projectTypeLabels] || "Not selected"

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Selected Project Type</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <Icon className="h-5 w-5 text-primary" />
          <span className="text-sm font-semibold">{label}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default PinnedProjectType

