"use client";
import { useState,useEffect, use } from "react";
import Search from "@/components/shared/search";
import data  from "@/data/data.json";
interface filteredDataProps {
  searchText : string,
  selectedLocation : string,
  fullTimeOnly : boolean
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
  const [filteredData, setFilters] = useState<filteredDataProps>({
    searchText : "",
    selectedLocation : "",
    fullTimeOnly : false
  });
  const [jobData, setJobData] = useState<JobListing[]>(data);
  useEffect(() => {
    const filtered = data.filter((item: JobListing) => {
      const matchesText = item.position.toLowerCase()
        .includes(filteredData.searchText.toLowerCase());

      const matchesLocations = filteredData.selectedLocation
        ? item.location === filteredData.selectedLocation
        : true;

      const matchesFullTime = filteredData.fullTimeOnly ? item.contract === "Full Time" : true;

      return (matchesText && matchesLocations && matchesFullTime);
    });

    setJobData(filtered);
  }, [filteredData]);
  return (
    <div className="">
      <Search filters={filteredData} onChange={setFilters} />
    </div>
  );
}
