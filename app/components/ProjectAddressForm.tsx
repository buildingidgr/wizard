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
  const [isAddressConfirmed, setIsAddressConfirmed] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsAddressConfirmed(true)
  }

  const handleConfirm = () => {
    console.log('Confirming address:', address)
    router.push('/project-summary')
  }

  const fullAddress = `${address.street}, ${address.city}, ${address.state} ${address.zipCode}, ${address.country}`

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="space-y-1">
        <div className="flex items-center">
          <Button variant="ghost" onClick={onBack} className="mr-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <CardTitle className="text-2xl">Project Location</CardTitle>
            <CardDescription>
              Enter and confirm the address for your {projectType} project
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
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
                <Button type="submit" className="w-full md:w-auto">
                  Update Map
                </Button>
              </div>
            </form>
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Instructions:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Enter the project address in the form above.</li>
                <li>Click &quot;Update Map&quot; to see the location on the map.</li>
                <li>Verify that the pin on the map accurately represents your project location.</li>
                <li>If the location is correct, click &quot;Confirm Location&quot; to proceed.</li>
                <li>If you need to make changes, update the form and click &quot;Update Map&quot; again.</li>
              </ol>
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-[400px] bg-muted rounded-lg overflow-hidden">
              <GoogleMapComponent address={fullAddress} />
            </div>
            <div className="flex justify-between">
              <Button onClick={() => setIsAddressConfirmed(false)} variant="outline">
                Edit Address
              </Button>
              <Button onClick={handleConfirm} disabled={!isAddressConfirmed}>
                Confirm Location
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProjectAddressForm

