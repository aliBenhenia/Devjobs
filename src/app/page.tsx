"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { debounce } from "lodash"; // Install if not already: npm i lodash
import Search from "@/components/shared/search";
import Card from "@/components/shared/Card";
import getLocations from "@/lib/getLocations";
import { getJobs } from "@/services/getJobs";
import { Spin } from "antd";
import { PAGE_SIZE } from "@/constants";
import { DEFAULT_COMPANY } from "@/constants";
import type { JobListing } from "@/types/job";


export default function Home() {
  const router = useRouter();
  const loader = useRef<HTMLDivElement>(null);

  const [filters, setFilters] = useState({
    searchText: "",
    selectedLocation: "",
    selectedCompany: "",
  });

  const [allJobs, setAllJobs] = useState<JobListing[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobListing[]>([]);
  const [visibleJobs, setVisibleJobs] = useState<JobListing[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  // Fetch jobs on company change
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const company = filters.selectedCompany || DEFAULT_COMPANY;
        const jobs = await getJobs(company);
        setAllJobs(jobs);
        setPage(1);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
        setInitialLoad(false);
      }
    };

    fetchJobs();
  }, [filters.selectedCompany]);

  // Debounce search text to improve UX
  const debouncedSearch = useRef(
    debounce((value: string) => {
      setFilters((prev) => ({ ...prev, searchText: value }));
    }, 300)
  ).current;

  const handleFilterChange = (newFilters: typeof filters) => {
    if (newFilters.searchText !== filters.searchText) {
      debouncedSearch(newFilters.searchText);
    } else {
      setFilters(newFilters);
    }
  };

  // Filter jobs by searchText and location
  useEffect(() => {
    const filtered = allJobs.filter((job) => {
      const title = job.position?.toLowerCase() || "";
      const location = job.location || "";

      const matchesText = filters.searchText.trim()
        ? title.includes(filters.searchText.toLowerCase().trim())
        : true;

      const matchesLocation = filters.selectedLocation
        ? location === filters.selectedLocation
        : true;

      return matchesText && matchesLocation;
    });

    setFilteredJobs(filtered);
    setVisibleJobs(filtered.slice(0, PAGE_SIZE));
    setPage(1);
  }, [filters.searchText, filters.selectedLocation, allJobs]);

  // Load more jobs on scroll
  const loadMore = useCallback(() => {
    const nextPage = page + 1;
    const newVisibleJobs = filteredJobs.slice(0, nextPage * PAGE_SIZE);
    setVisibleJobs(newVisibleJobs);
    setPage(nextPage);
  }, [page, filteredJobs]);

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    if (!loader.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          !loading &&
          visibleJobs.length < filteredJobs.length
        ) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(loader.current);

    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [loader.current, visibleJobs, filteredJobs, loading, loadMore]);

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      <Search
        filters={filters}
        onChange={handleFilterChange}
        locations={getLocations(allJobs)}
      />

      {/* Loading for first time */}
      {initialLoad && (
        <div className="flex justify-center mt-16">
          <Spin size="large" />
        </div>
      )}

      {/* No jobs found */}
      {!loading && !initialLoad && filteredJobs.length === 0 && (
        <div className="text-center text-gray-500 mt-12 text-lg">
          No jobs found.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {visibleJobs.map((job) => (
          <div
            key={`${job.id}-${job.company}`}
            className="cursor-pointer"
            onClick={() => router.push(`/job/${job.id}?company=${job.company}`)}
          >
            <Card {...job} />
          </div>
        ))}
      </div>

      {/* Infinite Scroll Loader */}
      <div
        ref={loader}
        className="flex justify-center items-center mt-10 min-h-[100px]"
      >
        {loading && !initialLoad && <Spin size="large" />}
      </div>
    </div>
  );
}
