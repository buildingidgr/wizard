"use client"

import React, { useState } from 'react'
import { Input } from "@/components/ui/input"

interface AddressAutocompleteProps {
  onAddressSelect: (address: string) => void;
}

export function AddressAutocomplete({ onAddressSelect }: AddressAutocompleteProps) {
  const [address, setAddress] = useState('');

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAddress = e.target.value;
    setAddress(newAddress);
    onAddressSelect(newAddress);
  };

  return (
    <Input
      type="text"
      placeholder="Enter address"
      value={address}
      onChange={handleAddressChange}
    />
  );
}

