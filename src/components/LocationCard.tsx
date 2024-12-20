import { MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { ImageStyle } from "@/types/location";
import { hoverScale, hoverGlow } from "@/utils/animations";
import { formatHours } from "@/utils/dateUtils";

interface LocationCardProps {
  id: string;
  name: string;
  address: string;
  hours: string;
  rating: number;
  reviews: number;
  image: string;
  imageStyle?: ImageStyle;
}

const LocationCard = ({ 
  id, 
  name, 
  address, 
  hours, 
  rating, 
  reviews, 
  image,
  imageStyle 
}: LocationCardProps) => {
  const overlayFrom = imageStyle?.overlay?.from || 'black/60';
  const overlayTo = imageStyle?.overlay?.to || 'transparent';
  
  // Parse hours string to get today's schedule
  const todaySchedule = formatHours(hours);
  
  return (
    <Link to={`/locations/${id}`} className="block">
      <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${hoverScale} ${hoverGlow} group`}>
        <div className="relative h-48 bg-gray-200 overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className={`absolute inset-0 bg-gradient-to-t from-${overlayFrom} to-${overlayTo} transition-opacity duration-300 group-hover:opacity-75`} />
          <div className="absolute bottom-0 left-0 right-0 p-4 transform transition-transform duration-300 group-hover:translate-y-[-4px]">
            <h3 className="text-xl font-semibold text-white">{name}</h3>
          </div>
        </div>
        <div className="p-4 space-y-2">
          <div className="flex items-center text-gray-600 gap-2 group-hover:text-brand-pink transition-colors duration-300">
            <MapPin className="w-4 h-4 text-brand-pink" />
            <span className="text-sm text-gray-500">{address}</span>
          </div>
          <div className="flex items-center text-gray-600 gap-2 group-hover:text-brand-pink transition-colors duration-300">
            <Clock className="w-4 h-4 text-brand-pink" />
            <span className="text-sm text-gray-500">{todaySchedule}</span>
          </div>
          <div className="flex items-center text-gray-600 gap-1">
            <div className="flex items-center">
              <span className="text-sm text-yellow-500 transform transition-transform duration-300 group-hover:scale-110">★</span>
              <span className="text-sm text-gray-500 ml-1">{rating.toFixed(1)}</span>
            </div>
            <span className="text-sm text-gray-500">({reviews} reviews)</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LocationCard;