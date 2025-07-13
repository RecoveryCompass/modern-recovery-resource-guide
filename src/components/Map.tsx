import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

interface Resource {
  id: string;
  name: string;
  type: string;
  latitude: number;
  longitude: number;
}

interface Props {
  resources: Resource[];
  userLocation: { lat: number; lng: number } | null;
}

export default function Map({ resources, userLocation }: Props) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || !userLocation) return;

    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/standard",
        center: [userLocation.lng, userLocation.lat],
        zoom: 12,
      });

      mapRef.current.addControl(new mapboxgl.NavigationControl());
    } else {
      mapRef.current.setCenter([userLocation.lng, userLocation.lat]);
    }

    // Remove existing markers
    document.querySelectorAll(".mapboxgl-marker").forEach((el) => el.remove());

    // Add resource pins
    resources.forEach((resource) => {
      new mapboxgl.Marker({ color: "#2563eb" })
        .setLngLat([resource.longitude, resource.latitude])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<strong>${resource.name}</strong><br/>${resource.type}`
          )
        )
        .addTo(mapRef.current!);
    });
  }, [resources, userLocation]);

  return (
    <div ref={mapContainer} className="w-full h-full rounded shadow" style={{ minHeight: 384 }} />
  );
}
