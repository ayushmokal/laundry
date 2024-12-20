import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import BasicInfoFields from "./form/BasicInfoFields";
import ContactFields from "./form/ContactFields";
import HoursFields from "./form/HoursFields";
import AmenitiesFields from "./form/AmenitiesFields";
import { useEffect } from "react";

interface LocationFormData {
  name: string;
  description: string;
  address: string;
  hours: string;
  contact_phone?: string;
  contact_email?: string;
  image_url?: string;
  amenities: string[];
}

interface LocationFormProps {
  onSubmit: (data: LocationFormData) => Promise<void>;
  isSubmitting: boolean;
  initialData?: LocationFormData | null;
}

const LocationForm = ({ onSubmit, isSubmitting, initialData }: LocationFormProps) => {
  const form = useForm<LocationFormData>({
    defaultValues: {
      name: "",
      description: "",
      address: "",
      hours: "",
      contact_phone: "",
      contact_email: "",
      image_url: "",
      amenities: [],
    },
  });

  useEffect(() => {
    if (initialData) {
      // Reset form with initial data when editing
      form.reset(initialData);
    } else {
      // Reset to empty values when adding new
      form.reset({
        name: "",
        description: "",
        address: "",
        hours: "",
        contact_phone: "",
        contact_email: "",
        image_url: "",
        amenities: [],
      });
    }
  }, [initialData, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <BasicInfoFields control={form.control} />
        <HoursFields form={form} />
        <ContactFields control={form.control} />
        <AmenitiesFields form={form} />
        
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : initialData ? "Update Location" : "Add Location"}
        </Button>
      </form>
    </Form>
  );
};

export default LocationForm;