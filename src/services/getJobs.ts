import api from "@/services/api";
import axios from "axios";
// import { JobListing } from "@/types/job";
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

const boardToken = "lever"; // Change to any board like "airbnb", "stripe", etc.

export async function getJobs(company:string = "Figma"): Promise<JobListing[]> {
    const res = await axios.get(`https://boards-api.greenhouse.io/v1/boards/${company}/jobs`); 
  const jobs = res.data.jobs;

  const listings: JobListing[] = jobs.map((job: any) => {
    const website = job.absolute_url;
    const domain = new URL(website).hostname.replace("www.", "");

    return {
      id: job.id,
      company: job.company_name || "Unknown",
      logo: `https://logo.clearbit.com/${domain}`,
      logoBackground: "#ffffff", // optional, or random if you want
      position: job.title,
      postedAt: job.updated_at,
      contract:
        job.metadata?.find((m: any) => m.name === "Employment Type")?.value ||
        "Full Time",
      location: job.location?.name || "Remote",
      website,
      apply: website,
      description: job.content || "No description provided.",
      requirements: {
        content: "General qualifications",
        items: ["Good communication", "Teamwork"], // fallback
      },
      role: {
        content: "Responsibilities",
        items: ["Collaborate", "Write code"], // fallback
      },
    };
  });

  return listings;
}
