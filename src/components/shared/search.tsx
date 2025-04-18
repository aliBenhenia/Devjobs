import React from "react";

interface SearchProps {
  filters: {
    searchText: string;
    selectedLocation: string;
    remoteOnly: boolean;
  };
  onChange: (filters: SearchProps["filters"]) => void;
}

export default function Search({ filters, onChange }: SearchProps) {
  return (
    <div className="bg-card p-4 rounded-lg flex flex-col gap-4">
      {/* Text Input */}
      <input
        type="text"
        placeholder="Search jobs..."
        value={filters.searchText}
        onChange={(e) =>
          onChange({ ...filters, searchText: e.target.value })
        }
        className="p-2 rounded border border-border"
      />

      {/* Select Input */}
      <select
        value={filters.selectedLocation}
        onChange={(e) =>
          onChange({ ...filters, selectedLocation: e.target.value })
        }
        className="p-2 rounded border border-border"
      >
        <option value="">All Types</option>
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Contract">Contract</option>
      </select>

      {/* Checkbox */}
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={filters.remoteOnly}
          onChange={(e) =>
            onChange({ ...filters, remoteOnly: e.target.checked })
          }
        />
        Remote only
      </label>
    </div>
  );
}
