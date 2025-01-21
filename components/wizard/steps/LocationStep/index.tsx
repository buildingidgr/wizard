"use client"

import { useState } from 'react'
import { AddressAutocomplete } from '@/components/AddressAutocomplete'
import { StepContainer } from "../shared/StepContainer"
import { ProgressBar } from "../shared/ProgressBar"
import { StepHeader } from "../shared/StepHeader"
import { StepNavigation } from "../shared/StepNavigation"
import { Map } from "./components/Map"
import { Card } from "@/components/ui/card"
import { MapPin, Navigation, Search } from "lucide-react"

interface AddressComponents {
  streetNumber: string;
  route: string;
  streetAddress: string;
  subpremise: string;
  locality: string;
  sublocality: string;
  administrativeAreaLevel1: string;
  administrativeAreaLevel2: string;
  administrativeAreaLevel3: string;
  country: string;
  countryCode: string;
  postalCode: string;
  formattedAddress: string;
}

type ExtendedPlaceResult = google.maps.places.PlaceResult & {
  parsedAddress?: AddressComponents;
};

interface LocationStepProps {
  address: string;
  selectedAddressData: ExtendedPlaceResult | null;
  onAddressChange: (value: string, placeData?: ExtendedPlaceResult) => void;
  onContinue: () => void;
  onBack: () => void;
}

export const LocationStep = ({
  address,
  selectedAddressData,
  onAddressChange,
  onContinue,
  onBack
}: LocationStepProps) => {
  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral | null>(() => {
    if (selectedAddressData?.geometry?.location) {
      return selectedAddressData.geometry.location.toJSON()
    }
    return null
  })

  const handleAddressSelect = (value: string, placeData?: ExtendedPlaceResult) => {
    if (placeData?.geometry?.location) {
      const coordinates = placeData.geometry.location.toJSON()
      setMapCenter(coordinates)
      onAddressChange(value, placeData)
    } else {
      onAddressChange(value, placeData)
    }
  }

  const handleMapLocationChange = async (location: google.maps.LatLngLiteral) => {
    setMapCenter(location)
    try {
      const geocoder = new google.maps.Geocoder()
      const result = await geocoder.geocode({ location })
      
      if (result.results[0]) {
        const placeData = result.results[0]
        const parsedAddress = parseAddressComponents(placeData.address_components, placeData.formatted_address)
        
        const modifiedPlaceData: ExtendedPlaceResult = {
          ...placeData,
          parsedAddress
        }
        
        onAddressChange(placeData.formatted_address, modifiedPlaceData)
      }
    } catch (error) {
      console.error('Error geocoding location:', error)
    }
  }

  const parseAddressComponents = (components: google.maps.GeocoderAddressComponent[] | undefined, formatted_address: string = ''): AddressComponents => {
    const result: AddressComponents = {
      streetNumber: '',
      route: '',
      streetAddress: '',
      subpremise: '',
      locality: '',
      sublocality: '',
      administrativeAreaLevel1: '',
      administrativeAreaLevel2: '',
      administrativeAreaLevel3: '',
      country: '',
      countryCode: '',
      postalCode: '',
      formattedAddress: formatted_address
    }

    if (!components) return result

    for (const component of components) {
      const types = component.types

      if (types.includes('street_number')) {
        result.streetNumber = component.long_name
      }
      if (types.includes('route')) {
        result.route = component.long_name
      }
      if (types.includes('subpremise')) {
        result.subpremise = component.long_name
      }
      if (types.includes('locality')) {
        result.locality = component.long_name
      }
      if (types.includes('sublocality')) {
        result.sublocality = component.long_name
      }
      if (types.includes('administrative_area_level_1')) {
        result.administrativeAreaLevel1 = component.long_name
      }
      if (types.includes('administrative_area_level_2')) {
        result.administrativeAreaLevel2 = component.long_name
      }
      if (types.includes('administrative_area_level_3')) {
        result.administrativeAreaLevel3 = component.long_name
      }
      if (types.includes('country')) {
        result.country = component.long_name
        result.countryCode = component.short_name
      }
      if (types.includes('postal_code')) {
        result.postalCode = component.long_name
      }
    }

    // Combine street number and route for full street address
    result.streetAddress = [result.streetNumber, result.route]
      .filter(Boolean)
      .join(' ')
      .trim()

    console.log('[Debug] Parsed address components:', result)
    return result
  }

  return (
    <StepContainer>
      <ProgressBar currentStep={1} />
      <div className="space-y-8">
        <StepHeader 
          step={2} 
          title="Επιλέξτε τοποθεσία έργου"
          subtitle="Εντοπίστε με ακρίβεια το σημείο του έργου σας"
        />
        
        <div className="grid gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin size={16} className="text-primary" />
              <p className="text-sm">Μπορείτε να επιλέξετε την τοποθεσία με δύο τρόπους:</p>
            </div>
            <div className="grid gap-2 pl-6">
              <div className="flex items-center gap-2">
                <Search size={14} className="text-primary" />
                <p className="text-sm">Αναζητήστε τη διεύθυνση στην μπάρα αναζήτησης</p>
              </div>
              <div className="flex items-center gap-2">
                <Navigation size={14} className="text-primary" />
                <p className="text-sm">Επιλέξτε απευθείας το σημείο στον χάρτη</p>
              </div>
            </div>
          </div>

          <Card className="p-6 space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-primary/5 text-primary">
                <Search size={20} />
              </div>
              <div className="space-y-1.5 flex-1">
                <h3 className="font-medium text-base">
                  Αναζήτηση διεύθυνσης
                </h3>
                <p className="text-sm text-muted-foreground">
                  Πληκτρολογήστε τη διεύθυνση του έργου σας
                </p>
              </div>
            </div>

            <AddressAutocomplete
              value={address}
              onChange={handleAddressSelect}
              className="w-full"
            />
          </Card>

          <Card className="p-6 space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-primary/5 text-primary">
                <MapPin size={20} />
              </div>
              <div className="space-y-1.5 flex-1">
                <h3 className="font-medium text-base">
                  Επιβεβαίωση τοποθεσίας
                </h3>
                <p className="text-sm text-muted-foreground">
                  Μετακινήστε τον δείκτη για να προσαρμόσετε την ακριβή τοποθεσία
                </p>
              </div>
            </div>

            <Map
              selectedLocation={mapCenter}
              onLocationChange={handleMapLocationChange}
            />

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Navigation size={14} className="text-primary" />
              <p>Σύρετε τον δείκτη για να προσαρμόσετε την ακριβή τοποθεσία</p>
            </div>
          </Card>
        </div>

        <StepNavigation
          onContinue={onContinue}
          onBack={onBack}
          disabled={!selectedAddressData}
        />
      </div>
    </StepContainer>
  )
}