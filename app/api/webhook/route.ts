import { NextResponse } from 'next/server'

interface ProjectData {
  contact: {
    fullName: string
    email: string
    phone: {
      countryCode: string
      number: string
    }
  }
  project: {
    category: {
      title: string
      description: string
    }
    location: {
      address: string
      coordinates: {
        lat: number
        lng: number
      }
      parsedAddress?: {
        route: string
        streetNumber: string
        locality: string
        postalCode: string
        administrativeAreaLevel1: string
        administrativeAreaLevel2: string
      }
    }
    details: {
      title: string
      description: string
    }
  }
  metadata: {
    submittedAt: string
    locale: string
    source: string
    version: string
  }
}

interface TransformedData {
  contact: {
    firstName: string
    lastName: string
    email: string
    phones: Array<{
      type: string
      number: string
      primary: boolean
    }>
    address: {
      street: string
      city: string
      state: string
      unit: string
      country: string
      postalCode: string
    }
  }
  project: {
    category: {
      title: string
      description: string
    }
    location: {
      coordinates: {
        lat: number
        lng: number
      }
    }
    details: {
      title: string
      description: string
    }
  }
  metadata: {
    submittedAt: string
    locale: string
    source: string
    version: string
    administrativeArea: string
  }
}

interface WebhookError extends Error {
  status?: number;
}

function transformProjectData(data: ProjectData): TransformedData {
  // Split full name into first and last name
  const [firstName = '', lastName = ''] = data.contact.fullName.split(' ')

  // Use the parsed address components if available
  const addressComponents = data.project.location.parsedAddress || {
    route: '',
    streetNumber: '',
    locality: '',
    postalCode: '',
    administrativeAreaLevel1: '',
    administrativeAreaLevel2: ''
  }
  
  return {
    contact: {
      firstName,
      lastName,
      email: data.contact.email,
      phones: [
        {
          type: "mobile",
          number: `${data.contact.phone.countryCode}${data.contact.phone.number}`,
          primary: true
        }
      ],
      address: {
        street: `${addressComponents.route} ${addressComponents.streetNumber}`.trim(),
        city: addressComponents.locality,
        state: addressComponents.administrativeAreaLevel1,
        unit: "",
        country: "GR",
        postalCode: addressComponents.postalCode
      }
    },
    project: {
      category: data.project.category,
      location: {
        coordinates: data.project.location.coordinates
      },
      details: {
        title: data.project.details.title,
        description: data.project.details.description
      }
    },
    metadata: {
      ...data.metadata,
      administrativeArea: addressComponents.administrativeAreaLevel2 // Add prefecture/administrative area
    }
  }
}

export async function POST(request: Request) {
  try {
    console.log('Webhook request received')
    const data = await request.json()
    
    console.log('Original data:', JSON.stringify(data, null, 2))
    
    // Transform the data to match the required format
    const transformedData = transformProjectData(data)
    
    console.log('Transformed data:', JSON.stringify(transformedData, null, 2))
    console.log('Sending request to webhook service...')

    const webhookUrl = 'https://webhook-service-production-dfad.up.railway.app/webhook/opportunity'
    console.log('Webhook URL:', webhookUrl)

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transformedData)
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