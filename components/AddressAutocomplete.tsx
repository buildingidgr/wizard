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
  const [internalValue, setInternalValue] = useState(value)

  // Initialize Autocomplete only once
  useEffect(() => {
    if (!isLoaded || !inputRef.current || isInitializedRef.current) return

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

    isInitializedRef.current = true
    
    autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
      types: ['address'],
      componentRestrictions: { country: 'gr' },
      fields: ['address_components', 'formatted_address', 'geometry', 'name', 'place_id']
    })

    // Create a geocoder instance for reverse geocoding
    const geocoder = new google.maps.Geocoder()

    const placeChangedListener = () => {
      if (!autocompleteRef.current) return

      const place = autocompleteRef.current.getPlace()

      if (place?.geometry) {
        // Get Greek formatted address using geocoder
        geocoder.geocode(
          { 
            location: place.geometry.location,
            language: 'el'
          },
          (results, status) => {
            if (status === google.maps.GeocoderStatus.OK && results?.[0]) {
              const greekFormattedPlace = results[0]
              const parsedAddress = parseAddressComponents(greekFormattedPlace.address_components, greekFormattedPlace.formatted_address)
              const placeWithParsedAddress = {
                ...place,
                formatted_address: greekFormattedPlace.formatted_address,
                address_components: greekFormattedPlace.address_components,
                parsedAddress
              }
              setInputValue(greekFormattedPlace.formatted_address || '')
              setInternalValue(greekFormattedPlace.formatted_address || '')
              onChange(greekFormattedPlace.formatted_address || '', placeWithParsedAddress)
            }
          }
        )
      } else if (place?.place_id) {
        const placesService = new google.maps.places.PlacesService(document.createElement('div'))
        placesService.getDetails({
          placeId: place.place_id,
          fields: ['address_components', 'formatted_address', 'geometry', 'name']
        }, (result, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && result?.geometry?.location) {
            // Get Greek formatted address using geocoder
            geocoder.geocode(
              { 
                location: result.geometry.location,
                language: 'el'
              },
              (results, geoStatus) => {
                if (geoStatus === google.maps.GeocoderStatus.OK && results?.[0]) {
                  const greekFormattedResult = results[0]
                  const parsedAddress = parseAddressComponents(greekFormattedResult.address_components, greekFormattedResult.formatted_address)
                  const resultWithParsedAddress = {
                    ...result,
                    formatted_address: greekFormattedResult.formatted_address,
                    address_components: greekFormattedResult.address_components,
                    parsedAddress
                  }
                  setInputValue(greekFormattedResult.formatted_address || '')
                  setInternalValue(greekFormattedResult.formatted_address || '')
                  onChange(greekFormattedResult.formatted_address || '', resultWithParsedAddress)
                }
              }
            )
          }
        })
      }
    }

    autocompleteRef.current.addListener('place_changed', placeChangedListener)

    return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current)
        isInitializedRef.current = false
      }
    }
  }, [isLoaded, onChange])

  // Keep input value in sync with prop
  useEffect(() => {
    if (value !== internalValue) {
      setInputValue(value)
      setInternalValue(value)
    }
  }, [value, internalValue])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
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