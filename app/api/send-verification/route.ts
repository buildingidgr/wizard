import { NextResponse } from 'next/server'
import twilio from 'twilio'

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID

const client = twilio(accountSid, authToken)

export async function POST(request: Request) {
  const { phoneNumber } = await request.json()

  try {
    const verification = await client.verify.v2
      .services(verifyServiceSid!)
      .verifications.create({ to: phoneNumber, channel: 'sms' })

    return NextResponse.json({ success: true, status: verification.status })
  } catch (error) {
    console.error('Error sending verification:', error)
    return NextResponse.json({ error: 'Failed to send verification code' }, { status: 500 })
  }
}

