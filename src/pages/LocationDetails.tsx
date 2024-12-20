import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Star, Phone, Mail, Clock, MapPin, Wifi, Shield } from "lucide-react";
import { ImageStyle } from "@/types/location";
import { useState, useEffect, useRef } from "react";
import mapboxgl from 'mapbox-gl';

const LocationDetails = () => {
  const { id } = useParams();
  const [imageError, setImageError] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);

  const { data: location, isLoading } = useQuery({
    queryKey: ["location", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("locations")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (location?.image_url) {
      // Pre-load the image to check if it's valid
      const img = new Image();
      img.src = location.image_url;
      img.onload = () => {
        setImageUrl(location.image_url);
        setImageError(false);
      };
      img.onerror = () => {
        console.error("Failed to load location image");
        setImageError(true);
        setImageUrl("/placeholder.svg");
      };
    }
  }, [location]);

  useEffect(() => {
    if (!location?.address || !mapContainer.current) return;

    mapboxgl.accessToken = 'pk.eyJ1IjoieWFzaGtoYW4iLCJhIjoiY200NnhjZGQxMWUwNTJtc2RqZmN6MHYyaSJ9.tn3H6bg-mn8hrUY-X3lBCg';

    const initializeMap = async () => {
      try {
        // Geocode the address
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            location.address
          )}.json?access_token=${mapboxgl.accessToken}`
        );
        const data = await response.json();

        if (!data.features?.length) {
          console.error("Location not found");
          return;
        }

        const [lng, lat] = data.features[0].center;

        // Initialize map
        if (!map.current) {
          map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: 15,
          });

          // Add navigation controls
          map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
        } else {
          map.current.flyTo({
            center: [lng, lat],
            zoom: 15,
          });
        }

        // Update or create marker
        if (marker.current) {
          marker.current.setLngLat([lng, lat]);
        } else {
          marker.current = new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .addTo(map.current);
        }
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initializeMap();

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
      if (marker.current) {
        marker.current.remove();
        marker.current = null;
      }
    };
  }, [location?.address]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-pink-50 to-white">
        <Navigation />
        <div className="container mx-auto px-4 py-8 flex-grow">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded-lg mb-8"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!location) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-pink-50 to-white">
        <Navigation />
        <div className="container mx-auto px-4 py-8 flex-grow">
          <h1 className="text-2xl font-semibold text-gray-900">Location not found</h1>
        </div>
        <Footer />
      </div>
    );
  }

  const imageStyle = location.image_style as ImageStyle;
  const overlayFrom = imageStyle?.overlay?.from || 'black/60';
  const overlayTo = imageStyle?.overlay?.to || 'transparent';

  const handleImageError = () => {
    setImageError(true);
    setImageUrl("/placeholder.svg");
    console.error("Failed to load location image");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-pink-50 to-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        {/* Hero Section */}
        <div className="relative h-[400px] mb-8 rounded-xl overflow-hidden">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={location.name}
            className="w-full h-full object-cover"
            onError={handleImageError}
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h1 className="text-4xl font-bold text-white">{location.name}</h1>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Description */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-primary mb-4">
              Premium Laundry Services in Beverly Hills
            </h2>
            <p className="text-gray-600">
              {location.description || "Experience luxury laundry care in the heart of Beverly Hills. Our state-of-the-art facility caters to the discerning residents of this prestigious community, offering specialized care for designer garments and high-end fabrics. Located near the iconic Rodeo Drive, we provide convenient, top-tier laundry services that match the elegant lifestyle of Beverly Hills."}
            </p>
          </div>

          {/* Operating Hours */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-primary mb-4">Operating Hours</h3>
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 text-brand-pink mr-2" />
                <span>Monday - Friday: 6:00 AM - 11:00 PM</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 text-brand-pink mr-2" />
                <span>Saturday: 7:00 AM - 10:00 PM</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 text-brand-pink mr-2" />
                <span>Sunday: 7:00 AM - 9:00 PM</span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-primary mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 text-brand-pink mr-2" />
                <span>{location.address}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="w-5 h-5 text-brand-pink mr-2" />
                <span>{location.contact_phone || "(213) 555-0123"}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Mail className="w-5 h-5 text-brand-pink mr-2" />
                <span>{location.contact_email || "beverly.hills@lalaundry.com"}</span>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-primary mb-4">Amenities</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center text-gray-600">
                <Wifi className="w-5 h-5 text-brand-pink mr-2" />
                <span>Free WiFi</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Shield className="w-5 h-5 text-brand-pink mr-2" />
                <span>24/7 Security</span>
              </div>
            </div>
          </div>

          {/* Location Map */}
          <div className="md:col-span-2">
            <h3 className="font-semibold text-primary mb-4">Location</h3>
            <div className="bg-gray-100 rounded-xl h-[400px] overflow-hidden">
              <div ref={mapContainer} className="w-full h-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LocationDetails;