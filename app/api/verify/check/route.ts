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
    const { phoneNumber, code } = await request.json()

    if (!phoneNumber || !code) {
      return NextResponse.json(
        { error: 'Phone number and code are required' },
        { status: 400 }
      )
    }

    // Format phone number to E.164 format if not already formatted
    let formattedNumber = phoneNumber
    if (!phoneNumber.startsWith('+')) {
      formattedNumber = '+' + phoneNumber.replace(/\D/g, '')
    }

    console.log('Checking verification for:', formattedNumber)

    const verificationCheck = await client.verify.v2
      .services(VERIFY_SERVICE_SID)
      .verificationChecks.create({
        to: formattedNumber,
        code: code
      })

    console.log('Verification check status:', verificationCheck.status)

    return NextResponse.json({
      success: true,
      status: verificationCheck.status,
      valid: verificationCheck.valid,
      sid: verificationCheck.sid
    })
  } catch (error: any) {
    console.error('Error checking verification:', error)
    return NextResponse.json(
      { 
        error: error.message || 'Failed to verify code',
        details: error.code ? `Twilio Error Code: ${error.code}` : undefined
      },
      { status: error.status || 500 }
    )
  }
} 