import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Building2, Factory, Map, Pencil } from 'lucide-react'

interface PinnedProjectTypeProps {
  projectType: string;
  currentStep: 'type' | 'address' | 'details' | 'contact';
}

const projectTypeIcons = {
  residential: Home,
  commercial: Building2,
  industrial: Factory,
  infrastructure: Map,
  "design-planning": Pencil,
}

const projectTypeLabels = {
  residential: "Residential",
  commercial: "Commercial",
  industrial: "Industrial",
  infrastructure: "Infrastructure",
  "design-planning": "Design/Planning",
}

const PinnedProjectType: React.FC<PinnedProjectTypeProps> = ({ projectType, currentStep }) => {
  const Icon = projectTypeIcons[projectType as keyof typeof projectTypeIcons] || Home
  const label = projectTypeLabels[projectType as keyof typeof projectTypeLabels] || "Unknown"

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Selected Project Type</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <Icon className="h-5 w-5 text-primary" />
          <span className="text-sm font-semibold">{label}</span>
        </div>
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">Progress</div>
          <div className="flex space-x-1">
            <div className={`h-1 w-1/4 rounded-full ${currentStep === 'type' ? 'bg-primary' : 'bg-primary/30'}`} />
            <div className={`h-1 w-1/4 rounded-full ${currentStep === 'address' ? 'bg-primary' : 'bg-primary/30'}`} />
            <div className={`h-1 w-1/4 rounded-full ${currentStep === 'details' ? 'bg-primary' : 'bg-primary/30'}`} />
            <div className={`h-1 w-1/4 rounded-full ${currentStep === 'contact' ? 'bg-primary' : 'bg-primary/30'}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PinnedProjectType

