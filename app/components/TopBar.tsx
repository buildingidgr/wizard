import React from 'react'
import { Building } from 'lucide-react'

const TopBar: React.FC = () => {
  return (
    <div className="bg-primary text-primary-foreground py-2 px-4">
      <div className="container mx-auto flex items-center">
        <Building className="h-6 w-6 mr-2" />
        <span className="text-lg font-semibold">CivilEngineer Pro</span>
      </div>
    </div>
  )
}

export default TopBar

