import { colorSchemes } from "../assets/assets";
const ColorSchemeSelector = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (color: string) => void;
}) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-zinc-200">
        Color Scheme
      </label>
      <div className="grid grid-cols-6 gap-3">
        {colorSchemes.map((scheme) => (
          <button
            className={`relative rounded-lg transition-all ${value === scheme.id && "ring-2 ring-pink-50"}`}
            title={scheme.name}
            key={scheme.id}
            onClick={() => onChange(scheme.id)}
          >
            <div className="flex h-10 rounded-lg overflow-hidden">
              {scheme.colors.map((color, i) => {
                return (
                  <div
                    key={i}
                    className="flex-1 "
                    style={{ backgroundColor: color }}
                  ></div>
                );
              })}
            </div>
          </button>
        ))}
      </div>
      <p>Selected : {colorSchemes.find((s) => s.id === value)?.name}</p>
    </div>
  );
};

export default ColorSchemeSelector;
