import { useEffect, useState } from "react";
import Header from "../components/Header";
import ResourceFilterPanel from "../components/ResourceFilterPanel";
// import Map from "../components/Map"; // Commented out Map import
import ResourceList from "../components/ResourceList";

// Dummy data for demonstration; replace with real data fetching
const ALL_RESOURCES = [
  {
    id: "1",
    name: "Hope Shelter",
    type: "Shelter",
    city: "Springfield",
    county: "Greene",
    latitude: 37.2153,
    longitude: -93.2982,
    hours: "24/7",
    contact: "555-1234",
    distance: "0.5 mi",
  },
  {
    id: "2",
    name: "Fresh Start Food Pantry",
    type: "Food Pantry",
    city: "Springfield",
    county: "Greene",
    latitude: 37.2163,
    longitude: -93.292,
    hours: "Mon-Fri 9am-5pm",
    contact: "555-5678",
    distance: "0.7 mi",
  },
  // ...more resources
];

export default function Home() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [resources, setResources] = useState(ALL_RESOURCES);

  // Get user location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        () => {
          // Default location if permission denied
          setUserLocation({ lat: 37.2153, lng: -93.2982 });
        }
      );
    } else {
      setUserLocation({ lat: 37.2153, lng: -93.2982 });
    }
  }, []);

  // Filter resources when selectedTypes changes
  const filteredResources =
    selectedTypes.length === 0
      ? resources
      : resources.filter((r) => selectedTypes.includes(r.type));

  const handleFilterChange = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <>
      <Header />
      <main className="flex flex-col md:flex-row p-6 gap-6 min-h-screen bg-gray-100">
        <ResourceFilterPanel selectedTypes={selectedTypes} onChange={handleFilterChange} />
        <div className="flex-1 flex flex-col">
          <div className="h-96 mb-6 flex items-center justify-center bg-gray-200 text-gray-600">
            {/* Placeholder instead of Map */}
            Map is temporarily disabled
          </div>
          <ResourceList resources={filteredResources} />
        </div>
      </main>
    </>
  );
}
