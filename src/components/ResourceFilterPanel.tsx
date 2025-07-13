const RESOURCE_TYPES = [
  "Treatment Center", "Detox", "Sober Living Home", "Shelter", "Food Pantry",
  "Clothing Closet", "Employment Help", "ID / Documentation Help", "Transportation Assistance",
  "Mental Health", "Legal Aid", "Veterans Services", "Reentry Support", "Support Groups", "Case Management"
];

interface Props {
  selectedTypes: string[];
  onChange: (type: string) => void;
}

export default function ResourceFilterPanel({ selectedTypes, onChange }: Props) {
  return (
    <aside className="w-72 min-h-[500px] h-full bg-white rounded shadow p-4 overflow-y-auto">
      <h2 className="font-semibold mb-2">Filter by Resource Type</h2>
      <ul>
        {RESOURCE_TYPES.map(type => (
          <li key={type} className="mb-1">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => onChange(type)}
                className="mr-2"
              />
              {type}
            </label>
          </li>
        ))}
      </ul>
    </aside>
  );
}
