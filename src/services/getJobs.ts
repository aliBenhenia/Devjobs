import axios from "axios";
import api from "./api"; // Import the axios instance

// Define the structure of the JobListing
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

// Define the function to get the company logo from Clearbit Autocomplete API
async function getLogo(companyName: string): Promise<string | null> {
  try {
    // Make a request to Clearbit's autocomplete API
    const res = await axios.get(
      `https://autocomplete.clearbit.com/v1/companies/suggest?query=${encodeURIComponent(
        companyName
      )}`
    );

    // Get the logo URL from the response
    const logo = res.data?.[0]?.logo;
    return logo || null;
  } catch (error) {
    // Return null if there's an error (e.g., no logo available)
    return null;
  }
}

const boardToken = "lever"; // Change to any board like "airbnb", "stripe", etc.

// Define the function to fetch job listings
export async function getJobs(company: string = "Figma"): Promise<JobListing[]> {
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
        logoBackground: "#ffffff", // Optional: Use random or fixed color
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
