import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GoogleMap, Marker } from '@react-google-maps/api'

interface PinnedMapProps {
  address: string;
  lat: number;
  lng: number;
}

const PinnedMap: React.FC<PinnedMapProps> = ({ address, lat, lng }) => {
  const mapContainerStyle = {
    width: '100%',
    height: '200px'
  }

  const center = {
    lat: lat,
    lng: lng
  }

  return (
    <Card className="w-full mt-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Project Location</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm mb-2">{address}</div>
        <div className="h-[200px] rounded-lg overflow-hidden">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={15}
            options={{
              disableDefaultUI: true,
              zoomControl: false,
              scrollwheel: false,
              draggable: false,
            }}
          >
            <Marker position={center} />
          </GoogleMap>
        </div>
      </CardContent>
    </Card>
  )
}

export default PinnedMap

