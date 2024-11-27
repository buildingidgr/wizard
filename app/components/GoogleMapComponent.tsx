'use client'

import React from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import { Input } from "@/components/ui/input"

interface GoogleMapComponentProps {
  onAddressSelect: (address: string, lat: number, lng: number) => void
}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({ onAddressSelect }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places'],
  })

  const [center, setCenter] = React.useState({ lat: 0, lng: 0 })
  const [zoom, setZoom] = React.useState(2)
  const [address, setAddress] = React.useState('')
  const autocompleteRef = React.useRef<google.maps.places.Autocomplete | null>(null)
  const mapRef = React.useRef<google.maps.Map | null>(null)

  const mapContainerStyle = {
    width: '100%',
    height: '100%'
  }

  const mapStyles = [
    {
        "featureType": "all",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "weight": "2.00"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#9c9c9c"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#eeeeee"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#7b7b7b"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#46bcec"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#c8d7d4"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#070707"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    }
  ]

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current?.getPlace()
    if (place && place.geometry && place.geometry.location) {
      const lat = place.geometry.location.lat()
      const lng = place.geometry.location.lng()
      setCenter({ lat, lng })
      setAddress(place.formatted_address || '')
      onAddressSelect(place.formatted_address || '', lat, lng)

      setZoom(17)
      if (mapRef.current) {
        mapRef.current.panTo({ lat, lng })
      }
    }
  }

  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map
  }

  React.useEffect(() => {
    if (isLoaded && !loadError) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById('address-input') as HTMLInputElement,
        { types: ['address'] }
      )
      autocompleteRef.current = autocomplete
      autocomplete.addListener('place_changed', handlePlaceSelect)

      return () => {
        window.google.maps.event.clearInstanceListeners(autocomplete)
      }
    }
  }, [isLoaded, loadError])

  if (loadError) {
    return <div className="h-full flex items-center justify-center">Error loading maps</div>
  }

  if (!isLoaded) {
    return <div className="h-full flex items-center justify-center">Loading maps</div>
  }

  return (
    <div className="space-y-4">
      <Input
        id="address-input"
        placeholder="Enter project address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full"
      />
      <div className="h-[400px] rounded-lg overflow-hidden">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={zoom}
          onLoad={onMapLoad}
          options={{
            styles: mapStyles,
            disableDefaultUI: true,
            zoomControl: true,
          }}
        >
          {center.lat !== 0 && center.lng !== 0 && <Marker position={center} />}
        </GoogleMap>
      </div>
    </div>
  )
}

export default GoogleMapComponent

