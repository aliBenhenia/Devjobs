"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Search from "@/components/shared/search";
import Card from "@/components/shared/Card";
import getLocations from "@/lib/getLocations";
import { getJobs } from "@/services/getJobs";
import { Spin } from "antd"; // Optional: if you use Ant Design

interface filteredDataProps {
  searchText: string;
  selectedLocation: string;
  selectedCompany: string;
}

interface JobListing {
  id: number;
  company: string;
  logo: string;
  logoBackground: string;
  position: string;
  postedAt: string;
  contract: string;
  location: string;
  website: string;
  apply: string;
  description: string;
  requirements: {
    content: string;
    items: string[];
  };
  role: {
    content: string;
    items: string[];
  };
}

export default function Home() {
  const router = useRouter();

  const [filters, setFilters] = useState<filteredDataProps>({
    searchText: "",
    selectedLocation: "",
    selectedCompany: "",
  });

  const [allJobs, setAllJobs] = useState<JobListing[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // <-- 👈 loading state

  useEffect(() => {
    const fetchAndFilterJobs = async () => {
      setLoading(true); // start loading

      try {
        const jobs = await getJobs(filters.selectedCompany || "figma");
        setAllJobs(jobs);

        const filtered = jobs.filter((item) => {
          const matchesText = item.position
            .toLowerCase()
            .includes(filters.searchText.toLowerCase());

          const matchesLocation = filters.selectedLocation
            ? item.location === filters.selectedLocation
            : true;

          return matchesText && matchesLocation;
        });

        setFilteredJobs(filtered);
      } catch (err) {
        console.error("Failed to fetch jobs", err);
      } finally {
        setLoading(false); // stop loading
      }
    };

    fetchAndFilterJobs();
  }, [filters.selectedCompany]);

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

    setFilteredJobs(filtered);
  }, [filters.searchText, filters.selectedLocation, allJobs]);

  return (
    <div>
      <Search
        filters={filters}
        onChange={setFilters}
        locations={getLocations(allJobs)}
      />

      {loading ? (
        <div className="flex justify-center items-center mt-16">
          <Spin size="large" /> {/* Optional: Replace with your own spinner if not using Ant Design */}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="cursor-pointer"
              onClick={() => router.push(`/job/${job.id}`)}
            >
              <Card {...job} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
