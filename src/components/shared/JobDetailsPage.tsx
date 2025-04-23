import { JobHeaderProps } from "@/types";
  
  const JobTitleLocation: React.FC<JobHeaderProps> = ({ title, location, className = "" }) => (
    <div className={className}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-400">{location}</p>
    </div>
  );
export default JobTitleLocation;  