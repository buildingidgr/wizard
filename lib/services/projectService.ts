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

// Validation function to ensure all required fields are present and of correct type
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

export async function submitProject(data: ProjectData): Promise<{ success: boolean; error?: string }> {
  // Use our proxy endpoint to avoid CORS issues
  const endpoint = '/api/webhook';
  const MAX_RETRIES = 3;
  const TIMEOUT_MS = 10000; // 10 seconds

  // Validate endpoint
  if (!endpoint) {
    console.error('API endpoint is not configured');
    return { success: false, error: 'API endpoint is not configured' };
  }

  // Function to make the API call with timeout
  const fetchWithTimeout = async (url: string, options: RequestInit, timeout: number) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        credentials: 'include', // Include credentials for same-origin requests
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  };

  // Retry logic with exponential backoff
  const retryFetch = async (attempt: number = 1): Promise<Response> => {
    try {
      // Clean up phone number format
      const cleanedData = {
        ...data,
        contact: {
          ...data.contact,
          phone: {
            countryCode: data.contact.phone.countryCode.substring(0, 3),
            number: data.contact.phone.number.replace(/^\+\d{2}/, '')
          }
        }
      };

      // Validate the cleaned data structure
      if (!validateProjectData(cleanedData)) {
        console.error('Invalid project data structure:', cleanedData);
        throw new Error('Invalid project data structure');
      }

      console.log(`Attempt ${attempt} - Submitting to endpoint:`, endpoint);
      console.log('Request data:', JSON.stringify(cleanedData, null, 2));

      const response = await fetchWithTimeout(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': window.location.origin
        },
        body: JSON.stringify(cleanedData)
      }, TIMEOUT_MS);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return response;
    } catch (error) {
      if (attempt >= MAX_RETRIES) {
        throw error;
      }
      
      // Exponential backoff delay
      const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
      console.log(`Attempt ${attempt} failed, retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      
      return retryFetch(attempt + 1);
    }
  };

  try {
    const response = await retryFetch();
    const result = await response.json();
    
    console.log('Success response:', result);
    return { success: true };
  } catch (error) {
    console.error('Error submitting project:', error);
    let errorMessage = 'An unknown error occurred';
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        errorMessage = 'Request timed out. Please try again.';
      } else if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        errorMessage = 'Network error. Please check your connection and try again.';
      } else {
        errorMessage = error.message;
      }
    }
    
    return { 
      success: false, 
      error: errorMessage
    };
  }
} 