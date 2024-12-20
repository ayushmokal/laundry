import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { useState } from "react";

const defaultAmenities = [
  "WiFi",
  "Parking",
  "24/7 Access",
  "Dry Cleaning",
  "Wash & Fold",
  "Self-Service",
  "Premium Detergents",
  "Alterations",
];

interface AmenitiesFieldsProps {
  form: UseFormReturn<any>;
}

const AmenitiesFields = ({ form }: AmenitiesFieldsProps) => {
  const [newAmenity, setNewAmenity] = useState("");
  const [customAmenities, setCustomAmenities] = useState<string[]>([]);

  const handleAddCustomAmenity = () => {
    if (!newAmenity.trim()) return;
    
    const amenity = newAmenity.trim();
    setCustomAmenities(prev => [...prev, amenity]);
    setNewAmenity("");
    
    // Add the new amenity to the form values if it's not already selected
    const currentAmenities = form.getValues("amenities");
    if (!currentAmenities.includes(amenity)) {
      form.setValue("amenities", [...currentAmenities, amenity]);
    }
  };

  const allAmenities = [...defaultAmenities, ...customAmenities];

  return (
    <FormField
      control={form.control}
      name="amenities"
      render={() => (
        <FormItem className="space-y-4">
          <FormLabel>Amenities</FormLabel>
          
          <div className="flex gap-4 items-end mb-4">
            <div className="flex-1">
              <Input
                placeholder="Add custom amenity"
                value={newAmenity}
                onChange={(e) => setNewAmenity(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCustomAmenity();
                  }
                }}
              />
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleAddCustomAmenity}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {allAmenities.map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox
                  id={amenity}
                  checked={form.getValues("amenities").includes(amenity)}
                  onCheckedChange={(checked) => {
                    const currentAmenities = form.getValues("amenities");
                    if (checked) {
                      form.setValue("amenities", [...currentAmenities, amenity]);
                    } else {
                      form.setValue(
                        "amenities",
                        currentAmenities.filter((a) => a !== amenity)
                      );
                    }
                  }}
                />
                <label
                  htmlFor={amenity}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {amenity}
                </label>
              </div>
            ))}
          </div>
        </FormItem>
      )}
    />
  );
};

export default AmenitiesFields;