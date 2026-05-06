interface Props {
  districts: string[];
  horizons: number[];
  dateOptions: string[];
  selectedDistrict: string;
  selectedHorizon: number;
  selectedDate: string;
  setSelectedDistrict: (v: string) => void;
  setSelectedHorizon: (v: number) => void;
  setSelectedDate: (v: string) => void;
}

export default function FilterPanel({
  districts,
  horizons,
  dateOptions,
  selectedDistrict,
  selectedHorizon,
  selectedDate,
  setSelectedDistrict,
  setSelectedHorizon,
  setSelectedDate,
}: Props) {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
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

      <select
        className="border rounded-lg px-4 py-2"
        value={selectedHorizon.toString()}
        onChange={(e) => setSelectedHorizon(Number(e.target.value))}
      >
        <option value="0">All Horizons</option>
        {horizons.map((horizon) => (
          <option key={horizon} value={horizon.toString()}>
            Horizon {horizon}
          </option>
        ))}
      </select>

      <select
        className="border rounded-lg px-4 py-2"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      >
        <option value="All">All Weeks</option>
        {dateOptions.map((date) => (
          <option key={date} value={date}>
            {date}
          </option>
        ))}
      </select>
    </div>
  );
}