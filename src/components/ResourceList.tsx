interface Resource {
  id: string;
  name: string;
  type: string;
  city: string;
  county: string;
  hours?: string;
  contact?: string;
  distance?: string;
}

interface Props {
  resources: Resource[];
}

export default function ResourceList({ resources }: Props) {
  if (resources.length === 0) {
    return <div className="text-gray-500 py-8 text-center">No resources found.</div>;
  }

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Nearby Resources</h2>
      <ul className="space-y-4">
        {resources.map((resource) => (
          <li key={resource.id} className="bg-white rounded shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <div className="font-bold text-blue-600">{resource.name}</div>
              <div className="text-sm text-gray-500">{resource.type}</div>
              <div className="text-sm">{resource.city}, {resource.county}</div>
              {resource.hours && <div className="text-xs text-gray-400">Hours: {resource.hours}</div>}
              {resource.contact && <div className="text-xs text-gray-400">Contact: {resource.contact}</div>}
            </div>
            {resource.distance && (
              <div className="text-xs text-teal-600 mt-2 md:mt-0 md:ml-4">
                {resource.distance} away
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
