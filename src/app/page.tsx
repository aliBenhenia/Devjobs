"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Search from "@/components/shared/search";
import Card from "@/components/shared/Card";
import getLocations from "@/lib/getLocations";
import { getJobs } from "@/services/getJobs";
import { Spin } from "antd";
import { PAGE_SIZE } from "@/constants"; // Assuming you have a constants file

// const PAGE_SIZE = 10;

export default function Home() {
  const router = useRouter();

  const [filters, setFilters] = useState({
    searchText: "",
    selectedLocation: "",
    selectedCompany: "",
  });

  const [allJobs, setAllJobs] = useState<any[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
  const [visibleJobs, setVisibleJobs] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loader = useRef<HTMLDivElement>(null);

  // Fetch jobs on company change
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const company = filters.selectedCompany || "figma";
        const jobs = await getJobs(company);
        setAllJobs(jobs);
        setPage(1);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [filters.selectedCompany]);

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
        if (entry.isIntersecting && !loading && visibleJobs.length < filteredJobs.length) {
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
        onChange={setFilters}
        locations={getLocations(allJobs)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {visibleJobs.map((job) => (
          <div
            key={job.id}
            className="cursor-pointer"
            onClick={() => router.push(`/job/${job.id}`)}
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
        {loading && (
          <Spin size="large">
            <div className="h-10 w-10" />
          </Spin>
        )}
      </div>
    </div>
  );
}
