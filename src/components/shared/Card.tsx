import Image from "next/image";
import React from "react";
interface CardProps {
    company: string;
    logo: string;
    logoBackground: string;
    position: string;
    postedAt: string;
    contract: string;
    location: string;
  }
  
  const Card = React.memo(({
    company,
    logo,
    logoBackground,
    position,
    postedAt,
    contract,
    location,
  }: CardProps) => {
    return (
      <div className="flex flex-col relative min-w-[280px] max-w-[360px] w-full rounded-xl shadow-md bg-card dark:bg-card-dark pt-7 ">
        <div
          className="h-13 flex items-center justify-center absolute -top-5 left-7 rounded-2xl p-3"
          style={{ backgroundColor: logoBackground }}
        >
          <Image 
          width={29}
          height={29}
          src={logo} alt={`${company} logo`} className=" object-contain" />
        </div>
  
        <div className="p-5 flex flex-col justify-between h-full">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            {postedAt} <span className="mx-1">•</span> {contract}
          </div>
  
          <h2 className="text-lg font-bold mb-2 dark:text-white">{position}</h2>
  
          <p className="text-sm text-gray-500 mb-4 dark:text-gray-400">{company}</p>
  
          <span className="text-sm font-semibold text-accent">{location}</span>
        </div>
      </div>
    );
  });
  
  export default Card;
  