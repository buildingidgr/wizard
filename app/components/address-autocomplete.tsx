"use client"

import { useState, useEffect, useRef } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AddressAutocompleteProps {
  onAddressSelect: (address: string) => void
}

export function AddressAutocomplete({ onAddressSelect }: AddressAutocompleteProps) {
  const [inputValue, setInputValue] = useState('')
  const autoCompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`
      script.async = true
      script.defer = true
      document.head.appendChild(script)
      return script
    }

    const script = loadGoogleMapsScript()

    script.addEventListener('load', initAutocomplete)

    return () => {
      script.removeEventListener('load', initAutocomplete)
      document.head.removeChild(script)
    }
  }, [])

  const initAutocomplete = () => {
    if (!inputRef.current) return

    autoCompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
      types: ['address'],
      componentRestrictions: { country: 'us' },
      fields: ['formatted_address'],
    })

    autoCompleteRef.current.addListener('place_changed', handlePlaceSelect)
  }

  const handlePlaceSelect = () => {
    const addressObject = autoCompleteRef.current?.getPlace()
    const address = addressObject?.formatted_address
    if (address) {
      setInputValue(address)
      onAddressSelect(address)
    }
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="address">Project Location</Label>
      <Input
        ref={inputRef}
        type="text"
        id="address"
        placeholder="Enter project address"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full"
      />
    </div>
  )
}

