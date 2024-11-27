'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface PinVerificationFormProps {
  phoneNumber: string;
  onVerificationComplete: () => void;
}

const PinVerificationForm: React.FC<PinVerificationFormProps> = ({ phoneNumber, onVerificationComplete }) => {
  const [pin, setPin] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      const response = await fetch('/api/verify-pin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, pin }),
      })

      if (response.ok) {
        onVerificationComplete()
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to verify PIN. Please try again.')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Verify Your Phone Number</CardTitle>
        <CardDescription>Enter the 6-digit PIN sent to {phoneNumber}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pin">6-Digit PIN</Label>
            <Input
              id="pin"
              type="text"
              inputMode="numeric"
              pattern="\d{6}"
              maxLength={6}
              placeholder="Enter 6-digit PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" className="w-full">Verify PIN</Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default PinVerificationForm

