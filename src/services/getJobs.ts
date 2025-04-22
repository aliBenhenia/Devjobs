import api from "./api"; // Import the axios instance
import type { JobListing } from "@/types"; // Import the JobListing type
import { DEFAULT_COMPANY, LOGO_BASE_URL, LOGO_BACKGROUND } from "@/constants";
import getLogo from "@/lib/getLogo"; 
import handleApiError from "@/lib/handleApiError"; // Import the error handling function
import { AxiosError } from "axios"; // Import AxiosError for error handling
interface Job {
  id: number;
  absolute_url: string;
  company_name: string;
  title: string;
  updated_at: string;
  metadata: { name: string; value: string }[];
  location: { name: string };
  content: string;
}

// Define the function to fetch job listings
export async function getJobs(company: string = DEFAULT_COMPANY): Promise<JobListing[]> {
  try {
    const res = await api.get(`/${company}/jobs`);
    
    // Check if the response is valid
    if (!res.data || !res.data.jobs) {
      throw new Error('Invalid response data');
    }

    const jobs = res.data.jobs;
    const logo = await getLogo(company);  // Fetch logo for the company once
    
    const listings: JobListing[] = await Promise.all(
      jobs.map((job: Job) => {
        const { absolute_url, company_name, title, updated_at, metadata, location, content } = job; // Destructuring job object
        
        const website = absolute_url;
        const domain = new URL(website).hostname.replace("www.", "");
        
        // Use the fetched logo or fallback to a URL based on the company domain
        const finalLogo = logo || `${LOGO_BASE_URL}/${domain}` || "/default-logo.png";

        return {
          id: job.id,
          company: company_name || "Unknown",
          logo: finalLogo,
          logoBackground: LOGO_BACKGROUND,
          position: title,
          postedAt: updated_at,
          contract: metadata?.find((m) => m.name === "Employment Type")?.value || "Full Time",
          location: location?.name || "Remote",
          website,
          apply: website,
          description: content || "No description provided.",
          requirements: {
            content: "General qualifications",
            items: ["Good communication", "Teamwork"],
          },
          role: {
            content: "Responsibilities",
            items: ["Collaborate", "Write code"],
          },
        };
      })
    );
    
    return listings;
  } catch (error: unknown) {
    // Log error details for debugging (in development)
    console.error("Error fetching job listings:", error);
    
    const err = handleApiError(error as AxiosError); // Handle the error using the imported function
    throw new Error(err);
  }
}