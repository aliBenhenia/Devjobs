"use client"
import { SearchIcon, MapPinIcon, BuildingIcon } from "lucide-react"
import Button from "@/components/ui/Button"
import {COMPANIES as companies} from "@/constants"
import { useState, useCallback, useEffect, useRef } from "react"

const BASE_URL = process.env.REACT_APP_API_URL || "https://boards-api.greenhouse.io/v1/boards"

interface SearchProps {
  filters: {
    searchText: string
    selectedLocation: string
    selectedCompany: string
  }
  onChange: (filters: SearchProps["filters"]) => void;
  locations? : string[];
}

interface Job {
  id: string;
  title: string;
  location?: {
    name: string;
  };
  company: string;
}

export default function Search({ filters, onChange ,locations}: SearchProps) {
  const [jobResults, setJobResults] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Fetch job results based on search text
  const fetchJobs = useCallback(async (query: string) => {
    if (!query.trim()) {
      setJobResults([])
      return
    }

    setIsLoading(true)
    try {
      // Fetch from all companies
      const allJobs: Job[] = []
      for (const company of companies.slice(0, 5)) { // Limit to 5 companies for performance
        try {
          const response = await fetch(`${BASE_URL}/${company}/embed/jobs?content=true`)
          if (response.ok) {
            const data = await response.json()
            const filteredJobs = data.jobs.filter((job: Job) =>
              job.title.toLowerCase().includes(query.toLowerCase())
            ).slice(0, 3) // Limit to 3 jobs per company
            
            filteredJobs.forEach((job: Job) => {
              allJobs.push({
                ...job,
                company: company
              })
            })
          }
        } catch (error) {
          console.error(`Error fetching from ${company}:`, error)
        }
      }
      setJobResults(allJobs.slice(0, 10)) // Show max 10 results
    } catch (error) {
      console.error("Error fetching jobs:", error)
      setJobResults([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Handle search text change with debounce
  const handleSearchTextChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    onChange({ ...filters, searchText: value })
    
    if (value.trim()) {
      setShowDropdown(true)
      fetchJobs(value)
    } else {
      setShowDropdown(false)
      setJobResults([])
    }
  }, [filters, onChange, fetchJobs])

  const handleLocationChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...filters, selectedLocation: e.target.value })
  }, [filters, onChange])

  const handleCompanyChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...filters, selectedCompany: e.target.value })
  }, [filters, onChange])

  const handleJobSelect = (jobId: string, company: string) => {
    window.location.href = `/job/${jobId}?company=${company}`
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }
    
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showDropdown])

  return (
    <div className="w-full max-w-6xl mx-auto relative">
      <div className="bg-card dark:bg-card-dark rounded-xl shadow-lg flex flex-col md:flex-row items-center overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
        {/* Text Input */}
        <div className="flex-1 w-full flex items-center px-6 py-5 md:border-r dark:border-gray-700 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-800 relative">
          <SearchIcon className="w-5 h-5 text-accent mr-4 flex-shrink-0" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Filter by title, companies, expertise..."
            // value={filters.searchText}
            onChange={handleSearchTextChange}
            onFocus={() => filters.searchText && setShowDropdown(true)}
            className="w-full bg-transparent outline-none dark:text-white placeholder:text-gray-500 text-lg"
          />
        </div>

        {/* Location Input */}
        <div className="flex-1 w-full flex items-center px-6 py-5 md:border-r dark:border-gray-700 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-800">
          <MapPinIcon className="w-5 h-5 text-accent mr-4 flex-shrink-0" />
          <select
            value={filters.selectedLocation}
            onChange={handleLocationChange}
            className="w-full p-2 bg-card dark:bg-card-dark outline-none dark:text-white placeholder:text-gray-500 text-lg appearance-none"
          >
            <option value="">Location</option>
            {locations?.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
        
        {/* Companies Input */}
        <div className="flex-1 w-full flex items-center px-6 py-5 md:border-r dark:border-gray-700 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-800">
          <BuildingIcon className="w-5 h-5 text-accent mr-4 flex-shrink-0" />
          <select
            value={filters.selectedCompany}
            onChange={handleCompanyChange}
            className="w-full p-2 bg-card dark:bg-card-dark outline-none dark:text-white placeholder:text-gray-500 text-lg appearance-none"
          >
            <option value="">Companies</option>
            {companies?.map((company) => (
              <option key={company} value={company}>
                {company.charAt(0).toUpperCase() + company.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Search Button */}
        <div className="flex items-center justify-between px-6 py-4 w-full md:w-auto">
          <Button 
            // onClick={() => {}} 
            className="ml-0 md:ml-6 px-8 py-4 bg-accent hover:bg-accent/90 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg w-full md:w-auto flex items-center justify-center"
          >
            <SearchIcon className="w-5 h-5 mr-2" />
            Search
          </Button>
        </div>
      </div>

      {/* Job Results Dropdown */}
      {showDropdown && (
        <div 
          ref={dropdownRef}
          className="absolute z-10 mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto"
        >
          {isLoading ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              Searching jobs...
            </div>
          ) : jobResults.length > 0 ? (
            <div className="py-2">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Job Results
              </div>
              {jobResults.map((job) => (
                <div
                  key={`${job.id}-${job.company}`}
                  onClick={() => handleJobSelect(job.id, job.company)}
                  className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-0 transition-colors"
                >
                  <div className="font-medium text-gray-900 dark:text-white">
                    {job.title}
                  </div>
                  <div className="flex items-center mt-1">
                    <span className="text-sm text-accent font-medium">
                      {job.company.charAt(0).toUpperCase() + job.company.slice(1)}
                    </span>
                    {job.location && (
                      <span className="text-sm text-gray-500 dark:text-gray-400 ml-2 flex items-center">
                        <MapPinIcon className="w-3 h-3 mr-1" />
                        {job.location.name}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : filters.searchText ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No jobs found for &quot;{filters.searchText}&quot;
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}