'use client'

import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

interface GoogleMapComponentProps {
  address: string
}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({ address }) => {
  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  }

  const [center, setCenter] = React.useState({ lat: 0, lng: 0 })

  React.useEffect(() => {
    // Geocode the address to get coordinates
    const geocoder = new google.maps.Geocoder()
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        const { lat, lng } = results[0].geometry.location
        setCenter({ lat: lat(), lng: lng() })
      } else {
        console.error('Geocode was not successful for the following reason: ' + status)
      }
    })
  }, [address])

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={15}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  )
}

export default GoogleMapComponent

