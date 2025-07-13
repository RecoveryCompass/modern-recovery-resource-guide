import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

// Make sure to replace this with your Mapbox token or use env variables
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

const Map = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-93.2923, 37.20896], // example: Springfield, MO coordinates
      zoom: 12,
    });

    // Add navigation controls (zoom buttons)
    map.current.addControl(new mapboxgl.NavigationControl());
    
    // Example marker
    new mapboxgl.Marker()
      .setLngLat([-93.2923, 37.20896])
      .setPopup(new mapboxgl.Popup().setHTML('<h4>Hope Shelter</h4><p>Shelter</p>'))
      .addTo(map.current);

  }, []);

  return (
    <div
      ref={mapContainer}
      style={{ width: '100%', height: '400px', borderRadius: '8px', marginTop: '1rem' }}
    />
  );
};

export default Map;
