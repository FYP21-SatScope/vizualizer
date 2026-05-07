interface Props {
  districts: string[];
  horizons: number[];
  selectedDistrict: string;
  selectedHorizon: number;

  setSelectedDistrict: (v: string) => void;
  setSelectedHorizon: (v: number) => void;
}

export default function FilterPanel({
  districts,
  horizons,
  selectedDistrict,
  selectedHorizon,

  setSelectedDistrict,
  setSelectedHorizon,
}: Props) {
  return (
    <div className="flex flex-wrap gap-6 mb-6">

      {/* District Filter */}
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">District</label>
        <select
          className="border rounded-lg px-4 py-2"
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
        >
          <option value="All">All Districts</option>
          {districts.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>
      </div>

      {/* Horizon Filter */}
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Forecast Horizon</label>
        <select
          className="border rounded-lg px-4 py-2"
          value={selectedHorizon.toString()}
          onChange={(e) => setSelectedHorizon(Number(e.target.value))}
        >
          <option value="0">All Horizons</option>
          {horizons.map((horizon) => (
            <option key={horizon} value={horizon.toString()}>
              {horizon} Week{horizon > 1 ? 's' : ''}
            </option>
          ))}
        </select>
      </div>

    </div>
  );
}