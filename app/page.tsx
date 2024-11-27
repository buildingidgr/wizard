'use client'

import React from 'react'
import ProjectTypeSelector from './components/ProjectTypeSelector'
import ProjectAddressForm from './components/ProjectAddressForm'
import ProjectDetailsForm from './components/ProjectDetailsForm'

export default function Home() {
  const [projectType, setProjectType] = React.useState<string | null>(null)
  const [address, setAddress] = React.useState<string | null>(null)

  const handleSelectProjectType = (type: string) => {
    setProjectType(type)
  }

  const handleAddressConfirm = (confirmedAddress: string) => {
    setAddress(confirmedAddress)
  }

  const handleBack = () => {
    if (address) {
      setAddress(null)
    } else if (projectType) {
      setProjectType(null)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
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
    </main>
  )
}

