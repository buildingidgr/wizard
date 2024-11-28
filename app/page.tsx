'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import IntroductoryPage from './components/IntroductoryPage'
import ProjectTypeSelector from './components/ProjectTypeSelector'
import ProjectAddressForm from './components/ProjectAddressForm'
import ProjectDetailsForm from './components/ProjectDetailsForm'
import ContactDetailsForm from './components/ContactDetailsForm'
import PinVerificationForm from './components/PinVerificationForm'
import PinnedProjectType from './components/PinnedProjectType'
import PinnedMap from './components/PinnedMap'
import PinnedProjectDetails from './components/PinnedProjectDetails'
import FormInstructions from './components/FormInstructions'
import ProgressBar from './components/ProgressBar'

export default function Home() {
  const [step, setStep] = useState<'intro' | 'type' | 'address' | 'details' | 'contact' | 'verify' | 'complete'>('intro')
  const [projectType, setProjectType] = useState<string | null>(null)
  const [address, setAddress] = useState<string | null>(null)
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null)
  const [projectDetails, setProjectDetails] = useState<any>(null)
  const [contactDetails, setContactDetails] = useState<{ fullName: string; email: string; phone: string } | null>(null)
  const [initialRequestTime, setInitialRequestTime] = useState<number | null>(null)
  const [projectData, setProjectData] = useState<any>(null)

  const handleStartForm = () => {
    setStep('type')
  }

  const handleSelectProjectType = (type: string) => {
    setProjectType(type)
    setStep('address')
  }

  const handleAddressConfirm = (confirmedAddress: string, lat: number, lng: number) => {
    setAddress(confirmedAddress)
    setCoordinates({ lat, lng })
    setStep('details')
  }

  const handleProjectDetailsSubmit = (details: any) => {
    setProjectDetails(details)
    setProjectData({
      projectType,
      location: {
        address,
        coordinates
      },
      projectDetails: details,
      client: contactDetails // This will be updated in PinVerificationForm
    })
    setStep('contact')
  }

  const handleContactDetailsSubmit = (details: { fullName: string; email: string; phone: string }, requestTime: number) => {
    setContactDetails(details)
    setInitialRequestTime(requestTime)
    setStep('verify')
  }

  const handleVerificationComplete = () => {
    console.log('All data collected and verified:', { projectType, address, coordinates, projectDetails, contactDetails })
    setStep('complete')
  }

  const handleBack = () => {
    switch (step) {
      case 'address':
        setStep('type')
        break
      case 'details':
        setStep('address')
        break
      case 'contact':
        setStep('details')
        break
      case 'verify':
        setStep('contact')
        break
      case 'complete':
        setStep('verify')
        break
      default:
        break
    }
  }

  const renderStep = () => {
    switch (step) {
      case 'intro':
        return <IntroductoryPage onStart={handleStartForm} />
      case 'type':
        return <ProjectTypeSelector onSelectProjectType={handleSelectProjectType} />
      case 'address':
        return (
          <ProjectAddressForm 
            projectType={projectType!} 
            onBack={handleBack}
            onAddressConfirm={handleAddressConfirm}
          />
        )
      case 'details':
        return (
          <ProjectDetailsForm 
            projectType={projectType!} 
            address={address!} 
            onBack={handleBack}
            onSubmit={handleProjectDetailsSubmit}
          />
        )
      case 'contact':
        return (
          <ContactDetailsForm 
            onBack={handleBack}
            onSubmit={handleContactDetailsSubmit}
          />
        )
      case 'verify':
        return (
          <PinVerificationForm 
            phoneNumber={contactDetails!.phone}
            initialRequestTime={initialRequestTime!}
            onVerificationComplete={handleVerificationComplete}
            projectData={projectData}
          />
        )
      case 'complete':
        return (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Submission Complete</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Thank you for submitting your project details. We'll review your information and get back to you soon.</p>
            </CardContent>
          </Card>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {step !== 'intro' && <ProgressBar currentStep={step} />}
      <div className="flex flex-col lg:flex-row flex-grow">
        <main className="flex-grow p-6">
          <div className="max-w-2xl mx-auto">
            {step !== 'intro' && <FormInstructions step={step} />}
            {renderStep()}
          </div>
        </main>
        {step !== 'intro' && (
          <aside className="lg:w-96 p-6 border-t lg:border-l lg:border-t-0">
            <div className="lg:sticky lg:top-6 space-y-6">
              <PinnedProjectType projectType={projectType || 'Not selected'} />
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

