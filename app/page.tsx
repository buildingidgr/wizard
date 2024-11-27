'use client'

import React from 'react'
import ProjectTypeSelector from './components/ProjectTypeSelector'
import ProjectAddressForm from './components/ProjectAddressForm'

export default function Home() {
  const [projectType, setProjectType] = React.useState<string | null>(null)

  const handleSelectProjectType = (type: string) => {
    setProjectType(type)
  }

  const handleBack = () => {
    setProjectType(null)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      {projectType ? (
        <ProjectAddressForm projectType={projectType} onBack={handleBack} />
      ) : (
        <ProjectTypeSelector onSelectProjectType={handleSelectProjectType} />
      )}
    </main>
  )
}

