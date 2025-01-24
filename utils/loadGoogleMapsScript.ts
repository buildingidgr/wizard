declare global {
  interface Window {
    initGoogleMaps: () => void;
  }
}

export const loadGoogleMapsScript = (apiKey: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window.google !== 'undefined') {
      resolve();
      return;
    }

    window.initGoogleMaps = () => {
      resolve();
    };

    try {
      const script = document.createElement('script');
      const key = apiKey.trim();
      if (!key) {
        throw new Error('Google Maps API key is required');
      }
      
      script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places&language=el&region=GR&callback=initGoogleMaps`;
      script.async = true;
      script.defer = true;
      script.onerror = () => {
        console.error('Google Maps script failed to load. Check your API key and restrictions.');
        reject(new Error('Failed to load Google Maps script'));
      };
      document.head.appendChild(script);
    } catch (error) {
      console.error('Error loading Google Maps:', error);
      reject(error);
    }
  });
}; 