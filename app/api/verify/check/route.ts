import { NextResponse } from 'next/server'
import twilio from 'twilio'

// Get environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID

// Initialize Twilio client if environment variables are available
const client = accountSid && authToken ? twilio(accountSid, authToken) : null;

interface TwilioError extends Error {
  code?: string;
  status?: number;
}

export async function POST(request: Request) {
  try {
    // Check if Twilio is configured
    if (!client || !verifyServiceSid) {
      console.warn('Twilio is not configured. Please set the required environment variables.');
      return NextResponse.json(
        { 
          success: false, 
          error: 'SMS verification service is not configured'
        },
        { status: 503 }
      );
    }

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
      .services(verifyServiceSid)
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
  } catch (err) {
    const error = err as TwilioError
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