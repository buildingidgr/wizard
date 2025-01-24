import { NextResponse } from 'next/server'

interface ProjectData {
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
      title: string
      description: string
    }
  }
  contact: {
    fullName: string
    email: string
    phone: {
      countryCode: string
      number: string
    }
  }
  metadata: {
    submittedAt: string
    locale: string
    source: string
    version: string
  }
}

interface UnknownProjectData {
  project?: {
    category?: {
      title?: unknown
      description?: unknown
    }
    location?: {
      address?: unknown
      coordinates?: {
        lat?: unknown
        lng?: unknown
      }
    }
    details?: {
      title?: unknown
      description?: unknown
    }
  }
  contact?: {
    fullName?: unknown
    email?: unknown
    phone?: {
      countryCode?: unknown
      number?: unknown
    }
  }
  metadata?: {
    submittedAt?: unknown
    locale?: unknown
    source?: unknown
    version?: unknown
  }
}

function validateProjectData(data: UnknownProjectData): data is ProjectData {
  try {
    // Validate project
    if (!data.project) return false;
    if (typeof data.project.category?.title !== 'string') return false;
    if (typeof data.project.category?.description !== 'string') return false;
    if (typeof data.project.location?.address !== 'string') return false;
    if (typeof data.project.location?.coordinates?.lat !== 'number') return false;
    if (typeof data.project.location?.coordinates?.lng !== 'number') return false;
    if (typeof data.project.details?.title !== 'string') return false;
    if (typeof data.project.details?.description !== 'string') return false;

    // Validate contact
    if (!data.contact) return false;
    if (typeof data.contact.fullName !== 'string') return false;
    if (typeof data.contact.email !== 'string') return false;
    if (typeof data.contact.phone?.countryCode !== 'string') return false;
    if (typeof data.contact.phone?.number !== 'string') return false;

    // Validate metadata
    if (!data.metadata) return false;
    if (typeof data.metadata.submittedAt !== 'string') return false;
    if (typeof data.metadata.locale !== 'string') return false;
    if (typeof data.metadata.source !== 'string') return false;
    if (typeof data.metadata.version !== 'string') return false;

    return true;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const rawData: unknown = await request.json()
    const projectData = rawData as UnknownProjectData

    // Validate the data structure
    if (!validateProjectData(projectData)) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid project data structure'
        },
        { status: 400 }
      )
    }

    // Here you would typically:
    // 1. Store it in your database
    // 2. Send notification emails
    // 3. etc.

    // For now, we'll just log it and return success
    console.log('Project submitted:', JSON.stringify(projectData, null, 2))

    return NextResponse.json({ 
      success: true,
      message: 'Project submitted successfully',
      data: {
        id: Date.now().toString(), // Temporary ID for demo
        submittedAt: new Date().toISOString()
      }
    })
  } catch (err) {
    console.error('Error submitting project:', err)
    
    // Handle different types of errors
    if (err instanceof SyntaxError) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid JSON data'
        },
        { status: 400 }
      )
    }

    const error = err as Error
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Failed to submit project'
      },
      { status: 500 }
    )
  }
} 