import { Select } from "@/components/common/Field";

export default function GenreFilter({ genres, value, onChange }) {
  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Filter by genre"
      className="w-auto min-w-[160px] flex-[0_1_180px]"
    >
      <option value="">All Genres</option>
      {genres.filter(Boolean).map((g) => (
        <option key={g} value={g}>
          {g}
        </option>
      ))}
    </Select>
  );
}
