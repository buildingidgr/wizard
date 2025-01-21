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

function validateProjectData(data: any): data is ProjectData {
  try {
    // Validate project
    if (!data.project) return false;
    if (typeof data.project.category?.title !== 'string') return false;
    if (typeof data.project.category?.description !== 'string') return false;
    if (typeof data.project.location?.address !== 'string') return false;
    if (typeof data.project.location?.coordinates?.lat !== 'number') return false;
    if (typeof data.project.location?.coordinates?.lng !== 'number') return false;
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
  } catch (error) {
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const projectData = await request.json()

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
  } catch (error: any) {
    console.error('Error submitting project:', error)
    
    // Handle different types of errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid JSON data'
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Failed to submit project'
      },
      { status: 500 }
    )
  }
} 