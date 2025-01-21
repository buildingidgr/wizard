import { NextResponse } from 'next/server';
import { Twilio } from 'twilio';

// Check for required environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

// Initialize Twilio client if environment variables are available
const client = accountSid && authToken ? new Twilio(accountSid, authToken) : null;

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

    const { phoneNumber } = await request.json();

    // Send verification code using Verify API
    const verification = await client.verify.v2
      .services(verifyServiceSid)
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