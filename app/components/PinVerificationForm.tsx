'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface PinVerificationFormProps {
  phoneNumber: string;
  initialRequestTime: number;
  onVerificationComplete: () => void;
}

const PinVerificationForm: React.FC<PinVerificationFormProps> = ({ phoneNumber, initialRequestTime, onVerificationComplete }) => {
  const [pin, setPin] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [canRequestNewPin, setCanRequestNewPin] = useState(false)
  const [timeUntilNewRequest, setTimeUntilNewRequest] = useState(30)
  const [requestCount, setRequestCount] = useState(1)

  useEffect(() => {
    const timer = setInterval(() => {
      const elapsedTime = Math.floor((Date.now() - initialRequestTime) / 1000)
      if (elapsedTime >= 30) {
        setCanRequestNewPin(true)
        setTimeUntilNewRequest(0)
        clearInterval(timer)
      } else {
        setTimeUntilNewRequest(30 - elapsedTime)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [initialRequestTime])

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

  const handleRequestNewPin = async () => {
    if (requestCount >= 3) {
      setError('Maximum number of PIN requests reached. Please try again later.')
      return
    }

    try {
      const response = await fetch('/api/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      })

      if (response.ok) {
        setRequestCount(requestCount + 1)
        setCanRequestNewPin(false)
        setTimeUntilNewRequest(30)
        setError(null)

        // Reset the timer
        const newRequestTime = Date.now()
        const timer = setInterval(() => {
          const elapsedTime = Math.floor((Date.now() - newRequestTime) / 1000)
          if (elapsedTime >= 30) {
            setCanRequestNewPin(true)
            setTimeUntilNewRequest(0)
            clearInterval(timer)
          } else {
            setTimeUntilNewRequest(30 - elapsedTime)
          }
        }, 1000)
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to send new verification code. Please try again.')
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
        <div className="mt-4">
          <Button
            onClick={handleRequestNewPin}
            disabled={!canRequestNewPin || requestCount >= 3}
            className="w-full"
          >
            {canRequestNewPin ? 'Request New PIN' : `Wait ${timeUntilNewRequest}s to request new PIN`}
          </Button>
          {requestCount > 1 && (
            <p className="text-sm text-muted-foreground mt-2">
              PIN request {requestCount}/3
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default PinVerificationForm

