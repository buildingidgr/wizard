"use client"

import React, { useRef, useEffect, useState } from 'react'
import { Input } from '@/app/components/ui/input'

interface AddressAutocompleteProps {
  onAddressSelect: (address: string) => void
}

export function AddressAutocomplete({ onAddressSelect }: AddressAutocompleteProps) {
  const [inputValue, setInputValue] = useState('')
  const autoCompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (!window.google) {
      console.error('Google Maps JavaScript API not loaded')
      return
    }

    const options: google.maps.places.AutocompleteOptions = {
      fields: ["formatted_address", "geometry", "name"],
      strictBounds: false,
      types: ["address"],
    }

    if (inputRef.current) {
      autoCompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, options)

      const listener = autoCompleteRef.current.addListener("place_changed", () => {
        if (autoCompleteRef.current) {
          const place = autoCompleteRef.current.getPlace()
          if (place && place.formatted_address) {
            onAddressSelect(place.formatted_address)
          }
        }
      })

      return () => {
        if (listener) {
          window.google.maps.event.removeListener(listener)
        }
        if (autoCompleteRef.current) {
          window.google.maps.event.clearInstanceListeners(autoCompleteRef.current)
        }
      }
    }
  }, [onAddressSelect])

  return (
    <Input
      ref={inputRef}
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder="Enter an address"
    />
  )
}

