'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const projectTypes = [
  { id: 'residential', label: 'Residential' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'industrial', label: 'Industrial' },
  { id: 'infrastructure', label: 'Infrastructure' },
]

export default function ProjectTypeSelection() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const router = useRouter()

  const handleNext = () => {
    if (selectedType) {
      // TODO: Save the selected type to a global state or context
      router.push('/wizard/location')
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Select Project Type</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedType || ''} onValueChange={setSelectedType}>
          {projectTypes.map((type) => (
            <div key={type.id} className="flex items-center space-x-2">
              <RadioGroupItem value={type.id} id={type.id} />
              <Label htmlFor={type.id}>{type.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button onClick={handleNext} disabled={!selectedType}>
          Next
        </Button>
      </CardFooter>
    </Card>
  )
}

