import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useToast } from '@/components/ui/use-toast';

interface MapPreviewProps {
  address: string;
}

const MapPreview = ({ address }: MapPreviewProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const { toast } = useToast();
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);

  useEffect(() => {
    const initializeMap = async () => {
      if (!mapContainer.current || !address) return;

      try {
        // Geocode the address
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            address
          )}.json?access_token=pk.eyJ1IjoieWFzaGtoYW4iLCJhIjoiY200NnhjZGQxMWUwNTJtc2RqZmN6MHYyaSJ9.tn3H6bg-mn8hrUY-X3lBCg`
        );
        const data = await response.json();

        if (!data.features?.length) {
          toast({
            title: "Location not found",
            description: "Could not find coordinates for this address",
            variant: "destructive",
          });
          return;
        }

        const [lng, lat] = data.features[0].center;
        setCoordinates([lng, lat]);

        // Initialize or update map
        if (!map.current) {
          mapboxgl.accessToken = 'pk.eyJ1IjoieWFzaGtoYW4iLCJhIjoiY200NnhjZGQxMWUwNTJtc2RqZmN6MHYyaSJ9.tn3H6bg-mn8hrUY-X3lBCg';
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
        toast({
          title: "Error",
          description: "Failed to load map preview",
          variant: "destructive",
        });
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
  }, [address, toast]);

  return (
    <div className="relative w-full h-[300px] rounded-md overflow-hidden border border-input bg-background">
      <div ref={mapContainer} className="absolute inset-0" />
      {!coordinates && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50">
          <p className="text-sm text-muted-foreground">Enter an address to see the map preview</p>
        </div>
      )}
    </div>
  );
};

export default MapPreview;