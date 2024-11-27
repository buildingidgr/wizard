'use client'

import React from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import { Input } from "@/components/ui/input"

interface GoogleMapComponentProps {
  onAddressSelect: (address: string, lat: number, lng: number) => void
}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({ onAddressSelect }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places'],
  })

  const [center, setCenter] = React.useState({ lat: 0, lng: 0 })
  const [zoom, setZoom] = React.useState(2) // Start with a zoomed-out view
  const [address, setAddress] = React.useState('')
  const autocompleteRef = React.useRef<google.maps.places.Autocomplete | null>(null)
  const mapRef = React.useRef<google.maps.Map | null>(null)

  const mapContainerStyle = {
    width: '100%',
    height: '100%'
  }

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current?.getPlace()
    if (place && place.geometry && place.geometry.location) {
      const lat = place.geometry.location.lat()
      const lng = place.geometry.location.lng()
      setCenter({ lat, lng })
      setAddress(place.formatted_address || '')
      onAddressSelect(place.formatted_address || '', lat, lng)

      // Zoom in and center the map
      setZoom(17) // Set a closer zoom level
      if (mapRef.current) {
        mapRef.current.panTo({ lat, lng })
      }
    }
  }

  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map
  }

  React.useEffect(() => {
    if (isLoaded && !loadError) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById('address-input') as HTMLInputElement,
        { types: ['address'] }
      )
      autocompleteRef.current = autocomplete
      autocomplete.addListener('place_changed', handlePlaceSelect)

      return () => {
        window.google.maps.event.clearInstanceListeners(autocomplete)
      }
    }
  }, [isLoaded, loadError])

  if (loadError) {
    return <div className="h-full flex items-center justify-center">Error loading maps</div>
  }

  if (!isLoaded) {
    return <div className="h-full flex items-center justify-center">Loading maps</div>
  }

  return (
    <div className="space-y-4">
      <Input
        id="address-input"
        placeholder="Enter project address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full"
      />
      <div className="h-[400px] rounded-lg overflow-hidden">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={zoom}
          onLoad={onMapLoad}
        >
          {center.lat !== 0 && center.lng !== 0 && <Marker position={center} />}
        </GoogleMap>
      </div>
    </div>
  )
}

export default GoogleMapComponent

