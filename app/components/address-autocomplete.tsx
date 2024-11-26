"use client"

import { useState, useEffect, useRef } from 'react'
import { Input } from "@/components/ui/input"

interface AddressAutocompleteProps {
  onAddressSelect: (address: string) => void
}

export function AddressAutocomplete({ onAddressSelect }: AddressAutocompleteProps) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const autocompleteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (query.length > 2) {
      // In a real application, you would call an API here
      // For this example, we'll use a mock function
      const mockSuggestions = [
        query + " Street, City, Country",
        query + " Avenue, Town, State",
        query + " Road, Village, Region",
      ]
      setSuggestions(mockSuggestions)
    } else {
      setSuggestions([])
    }
  }, [query])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target as Node)) {
        setSuggestions([])
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSelect = (address: string) => {
    setQuery(address)
    onAddressSelect(address)
    setSuggestions([])
  }

  return (
    <div ref={autocompleteRef} className="relative">
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter address"
        className="w-full"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-background border border-input mt-1 rounded-md shadow-lg">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-accent cursor-pointer"
              onClick={() => handleSelect(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

