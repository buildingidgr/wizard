import { NextResponse } from 'next/server';
import { Twilio } from 'twilio';

// Initialize Twilio client
const client = new Twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

interface TwilioError extends Error {
  code?: string;
  status?: number;
}

export async function POST(request: Request) {
  try {
    const { phoneNumber } = await request.json();

    // Send verification code using Verify API
    const verification = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID!)
      .verifications
      .create({
        to: phoneNumber,
        channel: 'sms',
        locale: 'el' // Greek language
      });

    return NextResponse.json({ 
      success: true, 
      status: verification.status 
    });
  } catch (err) {
    const error = err as TwilioError;
    console.error('Error sending verification:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to send verification code',
        code: error.code
      },
      { status: error.status || 500 }
    );
  }
} 