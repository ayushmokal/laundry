import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

interface ContactFieldsProps {
  control: Control<any>;
}

const ContactFields = ({ control }: ContactFieldsProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="contact_phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Contact Phone</FormLabel>
            <FormControl>
              <Input type="tel" placeholder="+1 (310) 555-0123" {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="contact_email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Contact Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="contact@beverlyhillslaundry.com" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default ContactFields;