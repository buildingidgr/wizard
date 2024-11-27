import { NextResponse } from 'next/server'
import twilio from 'twilio'

export async function POST(request: Request) {
  const { phoneNumber } = await request.json()

  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID

  if (!accountSid || !authToken || !verifyServiceSid) {
    console.error('Missing Twilio credentials')
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
  }

  console.log('Initializing Twilio client with:', { accountSid, authToken: '******', verifyServiceSid })

  const client = twilio(accountSid, authToken)

  try {
    console.log('Attempting to send verification to:', phoneNumber)
    const verification = await client.verify.v2
      .services(verifyServiceSid)
      .verifications.create({ to: phoneNumber, channel: 'sms' })

    console.log('Verification sent successfully:', verification.status)
    return NextResponse.json({ success: true, status: verification.status })
  } catch (error) {
    console.error('Error sending verification:', error)
    return NextResponse.json({ error: 'Failed to send verification code', details: error.message }, { status: 500 })
  }
}

