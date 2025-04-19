"use client"
import { SearchIcon, MapPinIcon } from "lucide-react"

interface SearchProps {
  filters: {
    searchText: string
    selectedLocation: string
    fullTimeOnly: boolean
  }
  onChange: (filters: SearchProps["filters"]) => void;
  locations? : string[]
}

export default function Search({ filters, onChange ,locations}: SearchProps) {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-card dark:bg-card-dark rounded-lg flex flex-col md:flex-row items-center shadow-md">
        {/* Text Input */}
        <div className="flex-1 w-full flex items-center px-6 py-4 md:border-r dark:border-gray-700 ">
          <SearchIcon className="w-5 h-5 text-accent mr-4" />
          <input
            type="text"
            placeholder="Filter by title, companies, expertise..."
            value={filters.searchText}
            onChange={(e) => onChange({ ...filters, searchText: e.target.value })}
            className="w-full bg-transparent outline-none dark:text-white placeholder:text-gray-500"
          />
        </div>

        {/* Location Input */}
        <div className="flex-1 w-full flex items-center px-6 py-4 md:border-r dark:border-gray-700">
          <MapPinIcon className="w-5 h-5 text-accent mr-4" />
          <select
            value={filters.selectedLocation}
            onChange={(e) => onChange({ ...filters, selectedLocation: e.target.value })}
            className="w-full p-2 bg-card dark:bg-card-dark outline-none dark:text-white placeholder:text-gray-500"
          >
            <option value="">Location</option>
            {locations?.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* Full Time Only Checkbox */}
        <div className="flex items-center justify-between px-6 py-4 w-full md:w-auto">
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={filters.fullTimeOnly}
                onChange={(e) => onChange({ ...filters, fullTimeOnly: e.target.checked })}
                className="sr-only"
              />
              <div
                className={`block w-5 h-5 rounded border ${
                  filters.fullTimeOnly
                    ? "bg-accent border-accent"
                    : "bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                }`}
              >
                {filters.fullTimeOnly && (
                  <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 20 20">
                    <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                  </svg>
                )}
              </div>
            </div>
            <span className="ml-3 font-bold dark:text-white">Full Time Only</span>
          </label>

          {/* Search Button */}
          <button
            type="button"
            className="ml-6 px-8 py-3 bg-accent hover:bg-[#939BF4] text-white font-bold rounded-md transition-colors"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  )
}
