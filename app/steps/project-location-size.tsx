"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AddressAutocomplete } from "@/components/address-autocomplete"

interface ProjectLocationSizeProps {
  updateProjectData: (data: any) => void
}

export function ProjectLocationSize({ updateProjectData }: ProjectLocationSizeProps) {
  const [location, setLocation] = useState("")
  const [size, setSize] = useState("")
  const [siteDescription, setSiteDescription] = useState("")

  const handleLocationChange = (address: string) => {
    setLocation(address)
    updateProjectData({ location: address })
  }

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(event.target.value)
    updateProjectData({ size: event.target.value })
  }

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSiteDescription(event.target.value)
    updateProjectData({ siteDescription: event.target.value })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Project Location & Size</h2>
        <p className="text-muted-foreground">Provide details about where your project will be located and its size</p>
      </div>

      <div className="space-y-4">
        <AddressAutocomplete
          value={location}
          onChange={handleLocationChange}
          placeholder="Enter project address"
        />

        <div className="space-y-2">
          <Label htmlFor="size">Project Size</Label>
          <Input
            id="size"
            placeholder="e.g., 2000 sq ft, 1 acre"
            value={size}
            onChange={handleSizeChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Site Description</Label>
          <Textarea
            id="description"
            placeholder="Describe the site conditions, terrain, or any notable features"
            value={siteDescription}
            onChange={handleDescriptionChange}
            rows={4}
          />
        </div>
      </div>
    </div>
  )
}

