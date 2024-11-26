"use client"

import { useState, useEffect, useRef } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AddressAutocompleteProps {
  value: string
  onChange: (address: string) => void
  placeholder?: string
}

export function AddressAutocomplete({ value, onChange, placeholder }: AddressAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const autocompleteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // This is a mock function. In a real application, you would call an API here.
    const fetchSuggestions = async (input: string) => {
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 300))
      return [
        `${input} Street, City`,
        `${input} Avenue, Town`,
        `${input} Road, Village`
      ]
    }

    if (value.length > 2) {
      fetchSuggestions(value).then(setSuggestions)
    } else {
      setSuggestions([])
    }
  }, [value])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target as Node)) {
        setSuggestions([])
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div ref={autocompleteRef} className="relative">
      <Label htmlFor="address">Address</Label>
      <Input
        id="address"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onChange(suggestion)
                setSuggestions([])
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

