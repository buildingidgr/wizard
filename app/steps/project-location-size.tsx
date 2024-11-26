"use client"

import { useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

declare global {
  interface Window {
    google: any
  }
}

export function ProjectLocationSize({ updateProjectData }) {
  const [location, setLocation] = useState("")
  const [size, setSize] = useState("")
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const mapRef = useRef(null)
  const autocompleteRef = useRef(null)
  const markerRef = useRef(null)

  useEffect(() => {
    if (typeof window.google === "undefined") {
      setError("Google Maps API failed to load. Please check your internet connection and try again.")
      setIsLoading(false)
      return
    }

    if (mapRef.current) {
      setIsLoading(true)
      try {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: 0, lng: 0 },
          zoom: 2,
        })

        const autocomplete = new window.google.maps.places.Autocomplete(
          document.getElementById("location") as HTMLInputElement
        )
        autocompleteRef.current = autocomplete

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace()
          if (place.geometry) {
            setLocation(place.formatted_address)
            updateProjectData({ location: place.formatted_address })

            map.setCenter(place.geometry.location)
            map.setZoom(15)

            if (markerRef.current) {
              markerRef.current.setMap(null)
            }

            markerRef.current = new window.google.maps.Marker({
              map,
              position: place.geometry.location,
            })
          }
        })

        setIsLoading(false)
      } catch (err) {
        setError("An error occurred while initializing the map. Please try again later.")
        setIsLoading(false)
      }
    }
  }, [updateProjectData])

  return (
    <div className="space-y-4 md:space-y-6">
      <h2 className="text-lg font-semibold mb-4">Project Location and Size</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 space-y-4">
          <div>
            <Label htmlFor="location">Project Location</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value)
                updateProjectData({ location: e.target.value })
              }}
              placeholder="Enter the project location"
            />
          </div>
          <div>
            <Label htmlFor="size">Approximate Size (in square feet or acres)</Label>
            <Input
              id="size"
              value={size}
              onChange={(e) => {
                setSize(e.target.value)
                updateProjectData({ size: e.target.value })
              }}
              placeholder="e.g., 2000 sq ft or 5 acres"
            />
          </div>
          <div>
            <Label htmlFor="description">Brief Description of the Site</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value)
                updateProjectData({ siteDescription: e.target.value })
              }}
              placeholder="Describe the current condition of the site, any existing structures, terrain, etc."
            />
          </div>
        </div>
        <div className="flex-1">
          {isLoading ? (
            <div className="w-full h-[300px] flex items-center justify-center bg-muted rounded-lg">
              <p>Loading map...</p>
            </div>
          ) : error ? (
            <div className="w-full h-[300px] flex items-center justify-center bg-muted rounded-lg">
              <p className="text-destructive">{error}</p>
            </div>
          ) : (
            <div
              ref={mapRef}
              className="w-full h-[300px] rounded-lg border border-gray-200"
              aria-label="Project location map"
            ></div>
          )}
        </div>
      </div>
    </div>
  )
}

