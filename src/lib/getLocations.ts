
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
const getLocations = (data:JobListing[]):string[]=>{
    return data.map((job) => job.location).filter((location, index, locations) => locations.indexOf(location) === index);
}
export default getLocations;