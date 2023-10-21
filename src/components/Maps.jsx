import React, { useEffect } from 'react';
import H from '@here/maps-api-for-javascript';

const HereMap = () => {
  useEffect(() => {
    // Initialize the HERE Map
    const platform = new H.service.Platform({
      apikey: 'sXvsRFoQMxuRjHLR9k8GH7jns7Zh1JUSJJiHFmGULsk',
    });

    const defaultLayers = platform.createDefaultLayers();

    const map = new H.Map(
      document.getElementById('mapContainer'),
      defaultLayers.vector.normal.map,
      {
        center: { lat: 28.3588, lng: 75.5880 },
        zoom: 12,
      }
    );

    // Add map events, markers, etc. as needed

    return () => {
      // Clean up resources if needed
      map.dispose();
    };
  }, []); // Empty dependency array to run the effect only once on mount

  return <div id="mapContainer" style={{ height: '400px', width: '100%' }}></div>;
};

export default HereMap;
