'use client'

import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import ProjectTypeSelector from './components/ProjectTypeSelector'
import ProjectAddressForm from './components/ProjectAddressForm'
import ProjectDetailsForm from './components/ProjectDetailsForm'
import ContactDetailsForm from './components/ContactDetailsForm'
import PinVerificationForm from './components/PinVerificationForm'
import PinnedProjectType from './components/PinnedProjectType'
import PinnedMap from './components/PinnedMap'
import PinnedProjectDetails from './components/PinnedProjectDetails'
import FormInstructions from './components/FormInstructions'

export default function Home() {
  const [projectType, setProjectType] = React.useState<string | null>(null)
  const [address, setAddress] = React.useState<string | null>(null)
  const [coordinates, setCoordinates] = React.useState<{ lat: number; lng: number } | null>(null)
  const [projectDetails, setProjectDetails] = React.useState<any>(null)
  const [contactDetails, setContactDetails] = React.useState<{ fullName: string; email: string; phone: string } | null>(null)
  const [isVerifying, setIsVerifying] = React.useState(false)
  const [isComplete, setIsComplete] = React.useState(false)

  const handleSelectProjectType = (type: string) => {
    setProjectType(type)
  }

  const handleAddressConfirm = (confirmedAddress: string, lat: number, lng: number) => {
    setAddress(confirmedAddress)
    setCoordinates({ lat, lng })
  }

  const handleProjectDetailsSubmit = (details: any) => {
    setProjectDetails(details)
  }

  const handleContactDetailsSubmit = (details: { fullName: string; email: string; phone: string }) => {
    setContactDetails(details)
    setIsVerifying(true)
  }

  const handleVerificationComplete = () => {
    // Here you would typically submit all the collected data to your backend
    console.log('All data collected and verified:', { projectType, address, coordinates, projectDetails, contactDetails })
    setIsComplete(true)
    // Navigate to a confirmation page or show a success message
  }

  const handleBack = () => {
    if (isComplete) {
      setIsComplete(false)
    } else if (isVerifying) {
      setIsVerifying(false)
    } else if (contactDetails) {
      setContactDetails(null)
    } else if (projectDetails) {
      setProjectDetails(null)
    } else if (address) {
      setAddress(null)
      setCoordinates(null)
    } else if (projectType) {
      setProjectType(null)
    }
  }

  const getCurrentStep = () => {
    if (isComplete) return 'complete'
    if (!projectType) return 'type'
    if (!address) return 'address'
    if (!projectDetails) return 'details'
    if (!contactDetails || isVerifying) return 'contact'
    return 'complete'
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col lg:flex-row flex-grow">
        <main className="flex-grow p-6">
          <div className="max-w-2xl mx-auto">
            <FormInstructions step={getCurrentStep()} />
            {isComplete ? (
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Submission Complete</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Thank you for submitting your project details. We'll review your information and get back to you soon.</p>
                </CardContent>
              </Card>
            ) : isVerifying ? (
              <PinVerificationForm 
                phoneNumber={contactDetails!.phone}
                onVerificationComplete={handleVerificationComplete}
              />
            ) : contactDetails ? (
              <PinVerificationForm 
                phoneNumber={contactDetails.phone}
                onVerificationComplete={handleVerificationComplete}
              />
            ) : projectDetails ? (
              <ContactDetailsForm 
                onBack={handleBack}
                onSubmit={handleContactDetailsSubmit}
              />
            ) : address && projectType ? (
              <ProjectDetailsForm 
                projectType={projectType} 
                address={address} 
                onBack={handleBack}
                onSubmit={handleProjectDetailsSubmit}
              />
            ) : projectType ? (
              <ProjectAddressForm 
                projectType={projectType} 
                onBack={handleBack}
                onAddressConfirm={handleAddressConfirm}
              />
            ) : (
              <ProjectTypeSelector onSelectProjectType={handleSelectProjectType} />
            )}
          </div>
        </main>
        {projectType && (
          <aside className="lg:w-96 p-6 border-t lg:border-l lg:border-t-0">
            <div className="lg:sticky lg:top-6 space-y-6">
              <PinnedProjectType projectType={projectType} currentStep={getCurrentStep()} />
              {address && coordinates && (
                <PinnedMap address={address} lat={coordinates.lat} lng={coordinates.lng} />
              )}
              {projectDetails && (
                <PinnedProjectDetails details={projectDetails} />
              )}
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}

