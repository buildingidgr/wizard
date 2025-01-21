"use client"

import React, { useState } from 'react'
import Script from 'next/script'
import { AddressAutocomplete } from '@/components/AddressAutocomplete'
import { StepContainer } from "../../../shared/StepContainer"
import { ProgressBar } from "../../../shared/ProgressBar"
import { StepHeader } from "../../../shared/StepHeader"
import { StepNavigation } from "../../../shared/StepNavigation"
import { Map } from "./Map"

interface LocationStepProps {
  address: string
  selectedAddressData: google.maps.places.PlaceResult | null
  onAddressChange: (address: string, location?: google.maps.LatLngLiteral) => void
  onContinue: () => void
  onBack: () => void
}

export const LocationStep = ({
  address,
  selectedAddressData,
  onAddressChange,
  onContinue,
  onBack
}: LocationStepProps) => {
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false)
  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral | null>(null)

  const handleAddressSelect = (value: string, placeData?: google.maps.places.PlaceResult) => {
    const location = placeData?.geometry?.location?.toJSON()
    onAddressChange(value, location)
    if (location) {
      setMapCenter(location)
    }
  }

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        onLoad={() => setIsGoogleMapsLoaded(true)}
      />
      <StepContainer>
        <ProgressBar currentStep={1} />
        <div className="space-y-6">
          <StepHeader 
            step={2} 
            title="Επιλέξτε τοποθεσία έργου"
            subtitle="Τοποθεσία έργου"
          />
          <div className="space-y-4">
            {isGoogleMapsLoaded && (
              <>
                <AddressAutocomplete
                  value={address}
                  onChange={handleAddressSelect}
                  className="w-full"
                />
                <Map
                  selectedLocation={mapCenter}
                  onLocationChange={(location) => {
                    setMapCenter(location)
                  }}
                />
              </>
            )}
            <p className="text-sm text-muted-foreground text-center">
              Μπορείτε να σύρετε τον δείκτη για να προσαρμόσετε την ακριβή τοποθεσία
            </p>
          </div>
          <StepNavigation
            onContinue={onContinue}
            onBack={onBack}
            disabled={!selectedAddressData}
          />
        </div>
      </StepContainer>
    </>
  )
}