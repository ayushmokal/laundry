import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Control, useWatch } from "react-hook-form";
import MapPreview from "./MapPreview";

interface BasicInfoFieldsProps {
  control: Control<any>;
}

const BasicInfoFields = ({ control }: BasicInfoFieldsProps) => {
  // Watch the address field to update map preview
  const address = useWatch({
    control,
    name: "address",
  });

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Location Name</FormLabel>
            <FormControl>
              <Input required placeholder="Beverly Hills Premium Laundry" {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea required placeholder="Enter location description" {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Address</FormLabel>
            <FormControl>
              <Input required placeholder="123 Rodeo Drive, Beverly Hills, CA 90210" {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormItem>
        <FormLabel>Location Preview</FormLabel>
        <MapPreview address={address || ""} />
      </FormItem>

      <FormField
        control={control}
        name="image_url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Image URL</FormLabel>
            <FormControl>
              <Input placeholder="https://example.com/image.jpg" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default BasicInfoFields;