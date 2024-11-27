'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'

interface ContactDetailsFormProps {
  onBack: () => void;
  onSubmit: (details: { fullName: string; email: string; phone: string }) => void;
}

const ContactDetailsForm: React.FC<ContactDetailsFormProps> = ({ onBack, onSubmit }) => {
  const [contactDetails, setContactDetails] = useState({
    fullName: '',
    email: '',
    phone: ''
  })
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      const response = await fetch('/api/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: contactDetails.phone }),
      })

      if (response.ok) {
        onSubmit(contactDetails)
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to send verification code. Please try again.')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <div className="flex items-center">
          <Button variant="ghost" onClick={onBack} className="mr-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <CardTitle className="text-2xl">Contact Details</CardTitle>
            <CardDescription>
              Please provide your contact information
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder="Enter your full name"
              value={contactDetails.fullName}
              onChange={(e) => setContactDetails({ ...contactDetails, fullName: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={contactDetails.email}
              onChange={(e) => setContactDetails({ ...contactDetails, email: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Mobile Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your mobile phone number"
              value={contactDetails.phone}
              onChange={(e) => setContactDetails({ ...contactDetails, phone: e.target.value })}
              required
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div className="flex justify-end">
            <Button type="submit">Submit and Verify</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default ContactDetailsForm

