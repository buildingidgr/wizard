'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

interface PinVerificationFormProps {
  phoneNumber: string;
  initialRequestTime: number;
  onVerificationComplete: () => void;
  projectData: any; // Add this prop to receive all project data
}

const PinVerificationForm: React.FC<PinVerificationFormProps> = ({ 
  phoneNumber, 
  initialRequestTime, 
  onVerificationComplete,
  projectData 
}) => {
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

    if (pin.length !== 6) {
      setError('Please enter a 6-digit PIN')
      return
    }

    try {
      const verifyResponse = await fetch('/api/verify-pin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, pin }),
      })

      if (verifyResponse.ok) {
        // PIN verified successfully, now send the webhook
        const webhookResponse = await fetch('/api/send-webhook', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...projectData,
            client: {
              ...projectData.client,
              phone: phoneNumber,
              verificationStatus: "verified"
            }
          }),
        })

        if (webhookResponse.ok) {
          onVerificationComplete()
        } else {
          setError('Failed to submit project data. Please try again.')
        }
      } else {
        const data = await verifyResponse.json()
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
        setPin('')

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
            <InputOTP
              maxLength={6}
              value={pin}
              onChange={(value) => setPin(value)}
              render={({ slots }) => (
                <>
                  <InputOTPGroup>
                    {slots.slice(0, 3).map((slot, index) => (
                      <InputOTPSlot key={index} {...slot} />
                    ))}
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    {slots.slice(3).map((slot, index) => (
                      <InputOTPSlot key={index + 3} {...slot} />
                    ))}
                  </InputOTPGroup>
                </>
              )}
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

