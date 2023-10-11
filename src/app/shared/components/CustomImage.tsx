import { DEFAULT_IMAGE_SOURCE, DEFAULT_PROFILE_IMAGE } from "../../utils/constant";

interface CustomImageProps {
src: string;
alt: string;
className?: string;
}

const handleBrokenImage = (e: any) => {
    e.target.src = DEFAULT_PROFILE_IMAGE;
    e.target.onerror = null;
};
  

const CustomImage = ({ src, alt, className }: CustomImageProps) => (
<img
    data-sizes="auto"
    data-src={src}
    src={DEFAULT_IMAGE_SOURCE}
    alt={alt}
    className={className ? `${className} lazyload` : `lazyload`}
    onError={handleBrokenImage}
/>
);

export default CustomImage;
  