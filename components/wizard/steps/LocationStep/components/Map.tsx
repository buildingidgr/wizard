"use client"

import { useRef, useState, useEffect } from 'react'
import { Maximize2, Minimize2, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface MapProps {
  selectedLocation: google.maps.LatLngLiteral | null
  onLocationChange: (location: google.maps.LatLngLiteral) => void
}

const mapStyles = [
  {
    featureType: "all",
    elementType: "geometry",
    stylers: [{ saturation: -60 }]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      { lightness: -10 },
      { saturation: -30 }
    ]
  },
  {
    featureType: "poi",
    elementType: "all",
    stylers: [{ visibility: "off" }]
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [{ visibility: "off" }]
  },
  {
    featureType: "road",
    elementType: "all",
    stylers: [
      { saturation: -70 },
      { lightness: 10 }
    ]
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [{ lightness: 30 }]
  }
]

export const Map = ({ selectedLocation, onLocationChange }: MapProps) => {
  const mapDivRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<google.maps.Map | null>(null)
  const markerRef = useRef<google.maps.Marker | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const pendingUpdateRef = useRef<google.maps.LatLngLiteral | null>(null)

  const toggleFullscreen = () => {
    if (!mapDivRef.current) return
    
    if (!document.fullscreenElement) {
      mapDivRef.current.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  useEffect(() => {
    if (selectedLocation) {
      pendingUpdateRef.current = selectedLocation
    }
  }, [selectedLocation])

  useEffect(() => {
    if (!mapDivRef.current || !window.google || mapRef.current) return

    const greeceBounds = {
      north: 41.8,
      south: 34.8,
      west: 19.4,
      east: 28.2
    }

    const defaultCenter = { lat: 38.2, lng: 23.8 }
    const center = selectedLocation || defaultCenter

    const map = new window.google.maps.Map(mapDivRef.current, {
      center,
      zoom: selectedLocation ? 18 : 6,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      styles: mapStyles,
      restriction: {
        latLngBounds: greeceBounds,
        strictBounds: false
      }
    })

    const marker = new google.maps.Marker({
      map,
      position: center,
      draggable: true,
      animation: google.maps.Animation.DROP
    })

    marker.addListener('dragend', () => {
      const position = marker.getPosition()
      if (position) {
        const location = {
          lat: position.lat(),
          lng: position.lng()
        }
        onLocationChange(location)
      }
    })

    map.addListener('idle', () => {
      mapRef.current = map
      markerRef.current = marker
      setIsMapLoaded(true)

      if (pendingUpdateRef.current) {
        marker.setPosition(pendingUpdateRef.current)
        map.panTo(pendingUpdateRef.current)
        map.setZoom(18)
        pendingUpdateRef.current = null
      }
    })

    return () => {
      if (marker) {
        marker.setMap(null)
      }
      mapRef.current = null
      markerRef.current = null
      setIsMapLoaded(false)
    }
  }, [selectedLocation, onLocationChange])

  useEffect(() => {
    if (!isMapLoaded || !mapRef.current || !markerRef.current || !selectedLocation) return

    markerRef.current.setPosition(selectedLocation)
    mapRef.current.panTo(selectedLocation)
    mapRef.current.setZoom(18)
  }, [isMapLoaded, selectedLocation])

  return (
    <div 
      className={cn(
        "relative w-full overflow-hidden rounded-lg border bg-background/50",
        "transition-all duration-300",
        isFullscreen ? "h-screen" : "h-[350px]"
      )}
    >
      <div ref={mapDivRef} className="w-full h-full" />
      <Button
        variant="secondary"
        size="sm"
        onClick={toggleFullscreen}
        className="absolute top-3 right-3 shadow-sm"
      >
        {isFullscreen ? (
          <Minimize2 className="h-4 w-4" />
        ) : (
          <Maximize2 className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
}