import { NextResponse } from 'next/server'

interface WebhookError extends Error {
  status?: number;
}

export async function POST(request: Request) {
  try {
    console.log('Webhook request received')
    const data = await request.json()
    
    console.log('Received raw request body:', JSON.stringify(data))
    console.log('Sending request to webhook service...')

    const webhookUrl = 'https://webhook-service-production-dfad.up.railway.app/webhook/opportunity'
    console.log('Webhook URL:', webhookUrl)

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })

    const result = await response.json()
    console.log('Webhook service response:', {
      status: response.status,
      statusText: response.statusText,
      result
    })

    if (!response.ok) {
      console.error('Webhook service error:', {
        status: response.status,
        statusText: response.statusText,
        result
      })
      throw new Error(result.message || `HTTP error! status: ${response.status}`)
    }

    console.log('Webhook request completed successfully')
    return NextResponse.json(result)
  } catch (err) {
    const error = err as WebhookError
    console.error('Webhook proxy error:', {
      message: error.message,
      status: error.status,
      stack: error.stack
    })
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to forward request to webhook service'
      },
      { status: error.status || 500 }
    )
  }
} 