'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'

interface ContactDetailsFormProps {
  onBack: () => void;
}

const ContactDetailsForm: React.FC<ContactDetailsFormProps> = ({ onBack }) => {
  const router = useRouter()
  const [contactDetails, setContactDetails] = React.useState({
    fullName: '',
    email: '',
    phone: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitting contact details:', contactDetails)
    // Here you would typically send this data to your backend
    // For now, we'll just log it and pretend to navigate to a confirmation page
    router.push('/submission-confirmation')
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
          <div className="flex justify-end">
            <Button type="submit">Submit Contact Details</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default ContactDetailsForm

