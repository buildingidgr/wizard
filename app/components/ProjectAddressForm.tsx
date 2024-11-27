'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'
import GoogleMapComponent from './GoogleMapComponent'

interface ProjectAddressFormProps {
  projectType: string;
  onBack: () => void;
}

const ProjectAddressForm: React.FC<ProjectAddressFormProps> = ({ projectType, onBack }) => {
  const router = useRouter()
  const [address, setAddress] = React.useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  })
  const [showMap, setShowMap] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowMap(true)
  }

  const handleConfirm = () => {
    // Here you would typically send this data to your backend or state management
    console.log('Confirming address:', address)
    // For now, we'll just log it and pretend to navigate to a next step
    router.push('/project-summary')
  }

  const fullAddress = `${address.street}, ${address.city}, ${address.state} ${address.zipCode}, ${address.country}`

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="space-y-1">
        <div className="flex items-center">
          <Button variant="ghost" onClick={onBack} className="mr-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <CardTitle className="text-2xl">Project Location</CardTitle>
            <CardDescription>
              Enter the address for your {projectType} project
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="street">Street Address</Label>
            <Input
              id="street"
              placeholder="1234 Main St"
              value={address.street}
              onChange={(e) => setAddress({ ...address, street: e.target.value })}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="City"
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                placeholder="State"
                value={address.state}
                onChange={(e) => setAddress({ ...address, state: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="zipCode">Zip Code</Label>
              <Input
                id="zipCode"
                placeholder="Zip Code"
                value={address.zipCode}
                onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                placeholder="Country"
                value={address.country}
                onChange={(e) => setAddress({ ...address, country: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="w-32">
              Show on Map
            </Button>
          </div>
        </form>
        {showMap && (
          <div className="mt-6 space-y-4">
            <GoogleMapComponent address={fullAddress} />
            <div className="flex justify-between">
              <Button onClick={() => setShowMap(false)} variant="outline">
                Edit Address
              </Button>
              <Button onClick={handleConfirm}>
                Confirm Location
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default ProjectAddressForm

