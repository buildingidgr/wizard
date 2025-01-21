"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

interface GoogleMapsContextType {
  isLoaded: boolean;
  error: Error | null;
}

const GoogleMapsContext = createContext<GoogleMapsContextType>({
  isLoaded: false,
  error: null,
});

export function GoogleMapsProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (window.google?.maps) {
      setIsLoaded(true);
      return;
    }

    const timeoutId = setTimeout(() => {
      if (!window.google?.maps) {
        setError(new Error("Google Maps failed to load"));
      }
    }, 10000); // 10 second timeout

    const checkGoogleMaps = () => {
      if (window.google?.maps) {
        setIsLoaded(true);
        clearTimeout(timeoutId);
      } else {
        setTimeout(checkGoogleMaps, 100);
      }
    };

    checkGoogleMaps();

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <GoogleMapsContext.Provider value={{ isLoaded, error }}>
      {children}
    </GoogleMapsContext.Provider>
  );
}

export const useGoogleMaps = () => useContext(GoogleMapsContext);