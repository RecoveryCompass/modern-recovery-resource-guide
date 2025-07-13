import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY!;

interface Resource {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

interface MapProps {
  resources: Resource[];
  userLocation: { lat: number; lng: number } | null;
}

const Map: React.FC<MapProps> = ({ resources, userLocation }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);

  // Initialize map once
  useEffect(() => {
    if (map.current) return; // already initialized
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: userLocation
        ? [userLocation.lng, userLocation.lat]
        : [-77.0369, 38.9072], // fallback center
      zoom: 10,
    });
  }, [userLocation]);

  // Update markers whenever resources or map changes
  useEffect(() => {
    if (!map.current) return;

    // Clear old markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Add new markers
    resources.forEach(resource => {
      const marker = new mapboxgl.Marker()
        .setLngLat([resource.longitude, resource.latitude])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setText(resource.name)
        )
        .addTo(map.current!);
      markers.current.push(marker);
    });
  }, [resources]);

  // Center map when userLocation changes
  useEffect(() => {
    if (!map.current || !userLocation) return;
    map.current.flyTo({
      center: [userLocation.lng, userLocation.lat],
      zoom: 12,
    });
  }, [userLocation]);

  return <div ref={mapContainer} style={{ width: '100%', height: '400px' }} />;
};

export default Map;
