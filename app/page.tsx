'use client'

import React from 'react'
import ProjectTypeSelector from './components/ProjectTypeSelector'
import ProjectAddressForm from './components/ProjectAddressForm'
import ProjectDetailsForm from './components/ProjectDetailsForm'
import PinnedProjectType from './components/PinnedProjectType'
import PinnedMap from './components/PinnedMap'
import FormInstructions from './components/FormInstructions'

export default function Home() {
  const [projectType, setProjectType] = React.useState<string | null>(null)
  const [address, setAddress] = React.useState<string | null>(null)
  const [coordinates, setCoordinates] = React.useState<{ lat: number; lng: number } | null>(null)

  const handleSelectProjectType = (type: string) => {
    setProjectType(type)
  }

  const handleAddressConfirm = (confirmedAddress: string, lat: number, lng: number) => {
    setAddress(confirmedAddress)
    setCoordinates({ lat, lng })
  }

  const handleBack = () => {
    if (address) {
      setAddress(null)
      setCoordinates(null)
    } else if (projectType) {
      setProjectType(null)
    }
  }

  const getCurrentStep = () => {
    if (!projectType) return 'type'
    if (!address) return 'address'
    return 'details'
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <main className="flex-grow p-6">
        <div className="max-w-3xl mx-auto">
          <FormInstructions step={getCurrentStep()} />
          {address && projectType ? (
            <ProjectDetailsForm 
              projectType={projectType} 
              address={address} 
              onBack={handleBack} 
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
        <aside className="lg:w-64 p-6 border-t lg:border-l lg:border-t-0">
          <div className="lg:sticky lg:top-6 space-y-6">
            <PinnedProjectType projectType={projectType} currentStep={getCurrentStep()} />
            {address && coordinates && (
              <PinnedMap address={address} lat={coordinates.lat} lng={coordinates.lng} />
            )}
          </div>
        </aside>
      )}
    </div>
  )
}

