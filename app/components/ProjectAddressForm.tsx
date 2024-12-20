'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'
import GoogleMapComponent from './GoogleMapComponent'

interface ProjectAddressFormProps {
  projectType: string;
  onBack: () => void;
  onAddressConfirm: (address: string, lat: number, lng: number) => void;
}

const ProjectAddressForm: React.FC<ProjectAddressFormProps> = ({ projectType, onBack, onAddressConfirm }) => {
  const [address, setAddress] = React.useState('')
  const [coordinates, setCoordinates] = React.useState({ lat: 0, lng: 0 })
  const [isAddressConfirmed, setIsAddressConfirmed] = React.useState(false)

  const handleAddressSelect = (selectedAddress: string, lat: number, lng: number) => {
    setAddress(selectedAddress)
    setCoordinates({ lat, lng })
    setIsAddressConfirmed(true)
  }

  const handleConfirm = () => {
    console.log('Confirming address:', address, 'Coordinates:', coordinates)
    onAddressConfirm(address, coordinates.lat, coordinates.lng)
  }

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <div className="flex items-center">
          <Button variant="ghost" onClick={onBack} className="mr-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <CardTitle className="text-2xl">Project Location</CardTitle>
            <CardDescription>
              Enter and confirm the address for your project
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <GoogleMapComponent onAddressSelect={handleAddressSelect} />
          <div className="flex justify-between">
            <Button onClick={() => setIsAddressConfirmed(false)} variant="outline">
              Edit Address
            </Button>
            <Button onClick={handleConfirm} disabled={!isAddressConfirmed}>
              Confirm Location
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProjectAddressForm

