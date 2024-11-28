import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const payload = await request.json()

  const webhookPayload = {
    type: "opportunity.created",
    data: {
      data: {
        id: `opp_${Date.now()}`, // Generate a unique ID
        object: "opportunity",
        created_at: Math.floor(Date.now() / 1000),
        updated_at: Math.floor(Date.now() / 1000),
        ...payload
      },
      object: "event",
      type: "opportunity.created",
      timestamp: Math.floor(Date.now() / 1000),
      event_attributes: {
        http_request: {
          client_ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
          user_agent: request.headers.get('user-agent')
        }
      }
    }
  }

  try {
    const webhookUrl = process.env.WEBHOOK_URL
    if (!webhookUrl) {
      console.error('Webhook URL is not defined')
      return NextResponse.json({ error: 'Webhook URL is not defined' }, { status: 500 })
    }

    console.log('Sending webhook to:', webhookUrl)
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookPayload),
    })

    if (!response.ok) {
      console.error(`Webhook request failed with status ${response.status}:`, await response.text())
      return NextResponse.json({ error: `Webhook request failed with status ${response.status}` }, { status: response.status })
    }

    console.log('Webhook sent successfully')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending webhook:', error)
    return NextResponse.json({ error: 'Failed to send webhook' }, { status: 500 })
  }
}

