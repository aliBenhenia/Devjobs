import Image from "next/image";

interface BannerProps {
    srcPicture : string
}

const Banner = ({srcPicture}:BannerProps) => {
  return (
    <div className="w-full h-[300px] relative">
        <Image src={srcPicture} alt="" fill className="object-cover" />
    </div>
  )
};
export default Banner;

