import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import LocationForm from "./admin/LocationForm";
import AuthComponent from "./Auth";
import { Trash2, Pencil, Database } from "lucide-react";
import { Button } from "./ui/button";
import { seedDatabase } from "@/utils/seedData";

const AdminPanel = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [session, setSession] = useState(null);
  const [locations, setLocations] = useState([]);
  const [editingLocation, setEditingLocation] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    fetchLocations();

    return () => subscription.unsubscribe();
  }, []);

  const fetchLocations = async () => {
    const { data, error } = await supabase
      .from("locations")
      .select("id, name, description, address, hours, contact_phone, contact_email, image_url, amenities, rating, reviews");
    
    if (error) {
      console.error("Error fetching locations:", error);
      toast({
        title: "Error",
        description: "Failed to fetch locations",
        variant: "destructive",
      });
      return;
    }
    setLocations(data || []);
  };

  const handleSeedDatabase = async () => {
    if (!session) {
      toast({
        title: "Error",
        description: "You must be logged in to seed the database",
        variant: "destructive",
      });
      return;
    }

    setIsSeeding(true);
    try {
      await seedDatabase();
      await fetchLocations();
      queryClient.invalidateQueries({ queryKey: ["locations"] });
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast({
        title: "Success",
        description: "Database seeded successfully",
      });
    } catch (error) {
      console.error("Error seeding database:", error);
      toast({
        title: "Error",
        description: "Failed to seed database",
        variant: "destructive",
      });
    } finally {
      setIsSeeding(false);
    }
  };

  const onSubmit = async (data) => {
    if (!session) {
      toast({
        title: "Error",
        description: "You must be logged in to manage locations",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { maps_url, ...locationData } = data;
      
      if (editingLocation) {
        // Update existing location
        const { error } = await supabase
          .from("locations")
          .update(locationData)
          .eq("id", editingLocation.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Location updated successfully",
        });
        setEditingLocation(null);
      } else {
        // Add new location
        const finalLocationData = {
          ...locationData,
          rating: 0,
          reviews: 0
        };

        const { error } = await supabase
          .from("locations")
          .insert([finalLocationData]);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Location added successfully",
        });
      }

      // Refresh the locations list
      await fetchLocations();
      queryClient.invalidateQueries({ queryKey: ["locations"] });
    } catch (error) {
      console.error("Error managing location:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!session) {
      toast({
        title: "Error",
        description: "You must be logged in to delete locations",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from("locations")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Location deleted successfully",
      });

      // Refresh the locations list
      await fetchLocations();
      queryClient.invalidateQueries({ queryKey: ["locations"] });
    } catch (error) {
      console.error("Error deleting location:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleEdit = (location) => {
    setEditingLocation(location);
  };

  const handleCancelEdit = () => {
    setEditingLocation(null);
  };

  if (!session) {
    return <AuthComponent />;
  }

  return (
    <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-display font-semibold text-primary">
          {editingLocation ? "Edit Location" : "Add New Location"}
        </h2>
        <div className="flex gap-4 items-center">
          <Button
            variant="outline"
            onClick={handleSeedDatabase}
            disabled={isSeeding}
            className="flex items-center gap-2"
          >
            <Database className="w-4 h-4" />
            {isSeeding ? "Seeding..." : "Seed Database"}
          </Button>
          {editingLocation && (
            <Button
              variant="outline"
              onClick={handleCancelEdit}
            >
              Cancel Edit
            </Button>
          )}
          <button
            onClick={() => supabase.auth.signOut()}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Sign Out
          </button>
        </div>
      </div>
      
      <LocationForm 
        onSubmit={onSubmit} 
        isSubmitting={isSubmitting} 
        initialData={editingLocation}
      />

      <div className="mt-12">
        <h3 className="text-xl font-display font-semibold text-primary mb-4">Manage Locations</h3>
        <div className="grid gap-4">
          {locations.map((location) => (
            <div
              key={location.id}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <h4 className="font-medium">{location.name}</h4>
                <p className="text-sm text-gray-600">{location.address}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(location)}
                  className="flex items-center gap-2"
                >
                  <Pencil className="w-4 h-4" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(location.id)}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
