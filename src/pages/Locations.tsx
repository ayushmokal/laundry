import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import LocationCard from "@/components/LocationCard";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Search } from "lucide-react";
import { ImageStyle } from "@/types/location";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const Locations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: locations, isLoading } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      const { data, error } = await supabase.from("locations").select("*");
      if (error) throw error;
      return data;
    },
  });

  const filteredLocations = locations?.filter(location => 
    location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.address.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen flex flex-col bg-pink-50">
      <Navigation />
      
      {/* Search Section */}
      <section className="py-16 px-4 text-center">
        <h1 className="text-4xl font-display font-bold text-[#1a1a1a] mb-4">Find Your Nearest Location</h1>
        <p className="text-gray-600 mb-8">Search through our premium laundry locations across Los Angeles</p>
        
        <div className="max-w-2xl mx-auto">
          <Command className="rounded-full border shadow-sm">
            <div className="flex items-center px-4">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <CommandInput
                placeholder="Search by city, location name, or address..."
                value={searchQuery}
                onValueChange={setSearchQuery}
                className="flex-1 outline-none border-none focus:ring-0 placeholder-gray-400"
              />
            </div>
            {searchQuery && locations && (
              <CommandList>
                <CommandEmpty>No locations found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  {filteredLocations.slice(0, 5).map((location) => (
                    <CommandItem
                      key={location.id}
                      value={location.name}
                      onSelect={(value) => {
                        setSearchQuery(value);
                      }}
                    >
                      {location.name} - {location.address}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            )}
          </Command>
        </div>
      </section>

      {/* Locations Grid */}
      <main className="container mx-auto px-4 pb-16 flex-grow">
        {isLoading ? (
          <div className="text-center py-8">Loading locations...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLocations.map((location) => (
              <LocationCard
                key={location.id}
                id={location.id}
                name={location.name}
                address={location.address}
                hours={location.hours}
                rating={location.rating || 0}
                reviews={location.reviews || 0}
                image={location.image_url || "/placeholder.svg"}
                imageStyle={location.image_style as ImageStyle}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Locations;