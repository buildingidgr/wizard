"use client"

import { useState } from "react"
import { AddressAutocomplete } from "@/app/components/address-autocomplete"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface ProjectLocationSizeProps {
  updateProjectData: (data: any) => void
}

export function ProjectLocationSize({ updateProjectData }: ProjectLocationSizeProps) {
  const [location, setLocation] = useState("")
  const [size, setSize] = useState("")
  const [siteDescription, setSiteDescription] = useState("")

  const handleLocationSelect = (address: string) => {
    setLocation(address)
    updateProjectData({ location: address })
  }

  const handleSizeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSize(e.target.value)
    updateProjectData({ size: e.target.value })
  }

  const handleSiteDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSiteDescription(e.target.value)
    updateProjectData({ siteDescription: e.target.value })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="location">Project Location</Label>
        <AddressAutocomplete onAddressSelect={handleLocationSelect} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="size">Project Size</Label>
        <Textarea
          id="size"
          placeholder="Enter the size of your project (e.g., square footage, acreage)"
          value={size}
          onChange={handleSizeChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="siteDescription">Site Description</Label>
        <Textarea
          id="siteDescription"
          placeholder="Describe the site (e.g., terrain, existing structures, access)"
          value={siteDescription}
          onChange={handleSiteDescriptionChange}
        />
      </div>
    </div>
  )
}

