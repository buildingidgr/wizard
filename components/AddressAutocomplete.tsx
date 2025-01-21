"use client"

import React, { useRef, useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { useGoogleMaps } from "@/components/providers/GoogleMapsProvider"

interface AddressComponents {
  streetNumber: string
  route: string
  streetAddress: string // Combination of streetNumber + route
  subpremise: string
  locality: string // City
  sublocality: string
  administrativeAreaLevel1: string // State/Region
  administrativeAreaLevel2: string // County/Prefecture
  administrativeAreaLevel3: string
  country: string
  countryCode: string
  postalCode: string
  formattedAddress: string // Full formatted address from Google
}

interface AddressAutocompleteProps {
  value: string
  onChange: (value: string, placeData?: google.maps.places.PlaceResult & { parsedAddress?: AddressComponents }) => void
  className?: string
}

export function AddressAutocomplete({ value, onChange, className }: AddressAutocompleteProps) {
  const { isLoaded, error } = useGoogleMaps()
  const inputRef = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const [inputValue, setInputValue] = useState(value)
  const isInitializedRef = useRef(false)
  const [isSelecting, setIsSelecting] = useState(false)

  const parseAddressComponents = (components: google.maps.GeocoderAddressComponent[] | undefined, formatted_address: string = ''): AddressComponents => {
    const result: AddressComponents = {
      streetNumber: '',
      route: '',
      streetAddress: '',
      subpremise: '',
      locality: '',
      sublocality: '',
      administrativeAreaLevel1: '',
      administrativeAreaLevel2: '',
      administrativeAreaLevel3: '',
      country: '',
      countryCode: '',
      postalCode: '',
      formattedAddress: formatted_address
    }

    if (!components) return result

    for (const component of components) {
      const types = component.types

      if (types.includes('street_number')) {
        result.streetNumber = component.long_name
      }
      if (types.includes('route')) {
        result.route = component.long_name
      }
      if (types.includes('subpremise')) {
        result.subpremise = component.long_name
      }
      if (types.includes('locality')) {
        result.locality = component.long_name
      }
      if (types.includes('sublocality')) {
        result.sublocality = component.long_name
      }
      if (types.includes('administrative_area_level_1')) {
        result.administrativeAreaLevel1 = component.long_name
      }
      if (types.includes('administrative_area_level_2')) {
        result.administrativeAreaLevel2 = component.long_name
      }
      if (types.includes('administrative_area_level_3')) {
        result.administrativeAreaLevel3 = component.long_name
      }
      if (types.includes('country')) {
        result.country = component.long_name
        result.countryCode = component.short_name
      }
      if (types.includes('postal_code')) {
        result.postalCode = component.long_name
      }
    }

    // Combine street number and route for full street address
    result.streetAddress = [result.streetNumber, result.route]
      .filter(Boolean)
      .join(' ')
      .trim()

    console.log('[Debug] Parsed address components:', result)
    return result
  }

  // Initialize Autocomplete only once
  useEffect(() => {
    if (!isLoaded || !inputRef.current || isInitializedRef.current) return

    console.log('[Debug] Initializing Autocomplete')
    isInitializedRef.current = true
    
    autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
      types: ['address'],
      componentRestrictions: { country: 'gr' },
      fields: ['address_components', 'formatted_address', 'geometry', 'name', 'place_id']
    })

    const placeChangedListener = () => {
      if (!autocompleteRef.current) return

      console.log('[Debug] Place changed event triggered')
      setIsSelecting(true)

      const place = autocompleteRef.current.getPlace()
      console.log('[Debug] Raw place data:', place)

      if (place?.geometry) {
        console.log('[Debug] Using place with geometry:', place.geometry.location?.toJSON())
        const parsedAddress = parseAddressComponents(place.address_components)
        const placeWithParsedAddress = {
          ...place,
          parsedAddress
        }
        setInputValue(place.formatted_address || '')
        onChange(place.formatted_address || '', placeWithParsedAddress)
      } else if (place?.place_id) {
        console.log('[Debug] Fetching place details for ID:', place.place_id)
        const placesService = new google.maps.places.PlacesService(document.createElement('div'))
        placesService.getDetails({
          placeId: place.place_id,
          fields: ['address_components', 'formatted_address', 'geometry', 'name']
        }, (result, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && result) {
            console.log('[Debug] Place details fetched:', result)
            const parsedAddress = parseAddressComponents(result.address_components)
            const resultWithParsedAddress = {
              ...result,
              parsedAddress
            }
            setInputValue(result.formatted_address || '')
            onChange(result.formatted_address || '', resultWithParsedAddress)
          }
        })
      }

      // Reset selection state after a short delay
      setTimeout(() => {
        setIsSelecting(false)
      }, 100)
    }

    autocompleteRef.current.addListener('place_changed', placeChangedListener)

    return () => {
      if (autocompleteRef.current) {
        console.log('[Debug] Final cleanup of Autocomplete')
        google.maps.event.clearInstanceListeners(autocompleteRef.current)
        isInitializedRef.current = false
      }
    }
  }, [isLoaded, onChange, parseAddressComponents])

  // Sync input value with prop value when not selecting
  useEffect(() => {
    if (!isSelecting) {
      setInputValue(value)
    }
  }, [value, isSelecting])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isSelecting) return
    
    const newValue = e.target.value
    console.log('[Debug] Input change:', newValue)
    setInputValue(newValue)
    onChange(newValue, undefined)
  }

  if (error) {
    return (
      <div className="text-red-500 text-sm">
        Error loading Google Maps. Please refresh the page.
      </div>
    )
  }

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Αναζήτηση διεύθυνσης..."
        className={className}
      />
      {!isLoaded && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
        </div>
      )}
    </div>
  )
}