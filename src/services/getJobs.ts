import axios from "axios";
import api from "./api"; // Import the axios instance
import type { JobListing } from "@/types"; // Import the JobListing type
import { DEFAULT_COMPANY } from "@/constants";
import {LOGO_BACKGROUND} from "@/constants";
import getLogo from "@/lib/getLogo"; // Import the getLogo function

// Define the function to fetch job listings
export async function getJobs(company: string = DEFAULT_COMPANY): Promise<JobListing[]> {
  const res = await api.get(`/${company}/jobs`);
  const jobs = res.data.jobs;

  // Map the jobs to our JobListing type
  const logo = await getLogo(company || "Unknown");
  const listings: JobListing[] = await Promise.all(
    jobs.map(async (job: any) => {
      const website = job.absolute_url;
      const domain = new URL(website).hostname.replace("www.", "");

      // Fetch the logo asynchronously
    //   const logo = await getLogo(job.company_name || "Unknown");

      // Fallback logo if not found
      const finalLogo = logo || `https://logo.clearbit.com/${domain}` || "/default-logo.png";

      return {
        id: job.id,
        company: job.company_name || "Unknown",
        logo: finalLogo, // Use the logo fetched from Clearbit or fallback
        logoBackground: LOGO_BACKGROUND, // Optional: Use random or fixed color
        position: job.title,
        postedAt: job.updated_at,
        contract: job.metadata?.find((m: any) => m.name === "Employment Type")?.value || "Full Time",
        location: job.location?.name || "Remote",
        website,
        apply: website,
        description: job.content || "No description provided.",
        requirements: {
          content: "General qualifications",
          items: ["Good communication", "Teamwork"], // Fallback
        },
        role: {
          content: "Responsibilities",
          items: ["Collaborate", "Write code"], // Fallback
        },
      };
    })
  );

  return listings;
}
