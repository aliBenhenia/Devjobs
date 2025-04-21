"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Search from "@/components/shared/search";
import Card from "@/components/shared/Card";
import getLocations from "@/lib/getLocations";
import { getJobs } from "@/services/getJobs";
import { Spin } from "antd";


const PAGE_SIZE = 10; // How many jobs per scroll load

export default function Home() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    searchText: "",
    selectedLocation: "",
    selectedCompany: "",
  });

  const [allJobs, setAllJobs] = useState([]);
  const [visibleJobs, setVisibleJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loader = useRef<HTMLDivElement>(null);

  // Fetch jobs when company changes
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const jobs = await getJobs(filters.selectedCompany || "figma");
        setAllJobs(jobs);
        setVisibleJobs(jobs.slice(0, PAGE_SIZE));
        setPage(1);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [filters.selectedCompany]);

  // Filter again when text or location changes
  useEffect(() => {
    const filtered = allJobs.filter((item) => {
      const matchesText = item.position
        .toLowerCase()
        .includes(filters.searchText.toLowerCase());

      const matchesLocation = filters.selectedLocation
        ? item.location === filters.selectedLocation
        : true;

      return matchesText && matchesLocation;
    });

    setVisibleJobs(filtered.slice(0, PAGE_SIZE));
    setPage(1);
  }, [filters.searchText, filters.selectedLocation, allJobs]);

  // Infinite Scroll using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !loading) {
          loadMore();
        }
      },
      { threshold: 1 }
    );

    if (loader.current) observer.observe(loader.current);

    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [loader, visibleJobs]);

  const loadMore = () => {
    const nextPage = page + 1;
    const nextItems = allJobs.slice(0, nextPage * PAGE_SIZE);
    setVisibleJobs(nextItems);
    setPage(nextPage);
  };

  return (
    <div>
      <Search
        filters={filters}
        onChange={setFilters}
        locations={getLocations(allJobs)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 ml-4 mr-4">
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

      {/* Loader div for infinite scroll */}
    
    
      <div ref={loader} className="flex justify-center items-center mt-10 min-h-[100px]">
        <Spin size="large" >
    <div className="h-10 w-10" /> {/* dummy content to activate nested mode */}
  </Spin>
</div>

    </div>
  );
}
