import { NextResponse } from 'next/server'
import twilio from 'twilio'

// Get environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID

// Initialize Twilio client
if (!accountSid || !authToken || !verifyServiceSid) {
  throw new Error('Missing required Twilio environment variables')
}

const client = twilio(accountSid, authToken)

// Ensure verifyServiceSid is a string
const VERIFY_SERVICE_SID: string = verifyServiceSid

export async function POST(request: Request) {
  try {
    const { phoneNumber } = await request.json()

    if (!phoneNumber) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      )
    }

    // Format phone number to E.164 format if not already formatted
    let formattedNumber = phoneNumber
    if (!phoneNumber.startsWith('+')) {
      formattedNumber = '+' + phoneNumber.replace(/\D/g, '')
    }

    console.log('Sending verification to:', formattedNumber)

    const verification = await client.verify.v2
      .services(VERIFY_SERVICE_SID)
      .verifications.create({
        to: formattedNumber,
        channel: 'sms',
        locale: 'el' // Greek language for SMS
      })

    console.log('Verification status:', verification.status)

    return NextResponse.json({ 
      success: true, 
      status: verification.status,
      sid: verification.sid 
    })
  } catch (error: any) {
    console.error('Error sending verification:', error)
    return NextResponse.json(
      { 
        error: error.message || 'Failed to send verification code',
        details: error.code ? `Twilio Error Code: ${error.code}` : undefined
      },
      { status: error.status || 500 }
    )
  }
} 