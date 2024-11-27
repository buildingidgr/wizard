import { NextResponse } from 'next/server'
import twilio from 'twilio'

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID

const client = twilio(accountSid, authToken)

export async function POST(request: Request) {
  const { phoneNumber, pin } = await request.json()

  try {
    const verification_check = await client.verify.v2
      .services(verifyServiceSid!)
      .verificationChecks.create({ to: phoneNumber, code: pin })

    if (verification_check.status === 'approved') {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: 'Invalid PIN' }, { status: 400 })
    }
  } catch (error) {
    console.error('Error verifying PIN:', error)
    return NextResponse.json({ error: 'Failed to verify PIN' }, { status: 500 })
  }
}

