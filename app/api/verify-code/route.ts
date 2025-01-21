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
    const { phoneNumber, code } = await request.json();

    // Verify the code using Verify API
    const verificationCheck = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID!)
      .verificationChecks
      .create({
        to: phoneNumber,
        code: code
      });

    return NextResponse.json({ 
      success: verificationCheck.status === 'approved',
      status: verificationCheck.status,
      valid: verificationCheck.valid
    });
  } catch (err) {
    const error = err as TwilioError;
    console.error('Error verifying code:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to verify code',
        code: error.code
      },
      { status: error.status || 500 }
    );
  }
} 