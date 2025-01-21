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
    }
    details: {
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

function transformProjectData(data: ProjectData): TransformedData {
  // Split full name into first and last name
  const [firstName = '', lastName = ''] = data.contact.fullName.split(' ')

  // Extract address components from the Google Places data
  const addressComponents = data.project.location.address.split(',').map((s: string) => s.trim())
  const [street = '', city = ''] = addressComponents
  
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
        street,
        city,
        state: "",
        unit: "",
        country: "GR",
        postalCode: ""
      }
    },
    project: {
      category: data.project.category,
      location: {
        coordinates: data.project.location.coordinates
      },
      details: data.project.details
    },
    metadata: data.metadata
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Transform the data to match the required format
    const transformedData = transformProjectData(data)
    
    console.log('Transformed data:', JSON.stringify(transformedData, null, 2))

    const response = await fetch('https://webhook-service-production-dfad.up.railway.app/webhook/opportunity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transformedData)
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || `HTTP error! status: ${response.status}`)
    }

    return NextResponse.json(result)
  } catch (error: any) {
    console.error('Webhook proxy error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to forward request to webhook service'
      },
      { status: 500 }
    )
  }
} 