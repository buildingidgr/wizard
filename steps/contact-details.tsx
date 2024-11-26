"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, XCircle } from 'lucide-react'

// Hypothetical SMS verification service
const sendVerificationCode = async (phoneNumber: string) => {
  // In a real implementation, this would call an API to send an SMS
  console.log(`Sending verification code to ${phoneNumber}`)
  return Math.floor(100000 + Math.random() * 900000).toString()
}

const verifyCode = async (phoneNumber: string, code: string) => {
  // In a real implementation, this would call an API to verify the code
  console.log(`Verifying code ${code} for ${phoneNumber}`)
  return Math.random() > 0.2 // 80% success rate for demonstration
}

export function ContactDetails({ updateProjectData }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [isVerified, setIsVerified] = useState(false)
  const [isVerificationSent, setIsVerificationSent] = useState(false)
  const [verificationError, setVerificationError] = useState("")

  const handleSendVerification = async () => {
    if (phoneNumber) {
      await sendVerificationCode(phoneNumber)
      setIsVerificationSent(true)
      setVerificationError("")
    }
  }

  const handleVerifyCode = async () => {
    if (phoneNumber && verificationCode) {
      const isValid = await verifyCode(phoneNumber, verificationCode)
      if (isValid) {
        setIsVerified(true)
        setVerificationError("")
        updateProjectData({ name, email, phoneNumber })
      } else {
        setVerificationError("Invalid verification code. Please try again.")
      }
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold mb-4">Contact Details</h2>
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
        />
      </div>
      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
        />
      </div>
      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <div className="flex space-x-2">
          <Input
            id="phone"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
            className="flex-grow"
          />
          <Button onClick={handleSendVerification} disabled={isVerified || !phoneNumber}>
            {isVerificationSent ? "Resend" : "Send"} Code
          </Button>
        </div>
      </div>
      {isVerificationSent && !isVerified && (
        <div>
          <Label htmlFor="verificationCode">Verification Code</Label>
          <div className="flex space-x-2">
            <Input
              id="verificationCode"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Enter verification code"
              className="flex-grow"
            />
            <Button onClick={handleVerifyCode}>Verify</Button>
          </div>
        </div>
      )}
      {isVerified && (
        <Alert>
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Your phone number has been verified.</AlertDescription>
        </Alert>
      )}
      {verificationError && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{verificationError}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}

