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
interface Job {
  id: number
  title: string
  location: {
    name: string
  }
  updated_at: string
  absolute_url: string
  content: string // HTML content
}
export type { JobListing, Job };