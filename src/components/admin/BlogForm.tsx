import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface BlogFormData {
  title: string;
  content: string;
  author: string;
  image_url?: string;
}

interface BlogFormProps {
  onSubmit: (data: BlogFormData) => Promise<void>;
  isSubmitting: boolean;
}

const BlogForm = ({ onSubmit, isSubmitting }: BlogFormProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const form = useForm<BlogFormData>({
    defaultValues: {
      title: "",
      content: "",
      author: "",
      image_url: "",
    },
  });

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.match(/^image\/(jpeg|png|jpg)$/)) {
      form.setError("image_url", {
        message: "Only JPG and PNG files are allowed",
      });
      return;
    }

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { data, error } = await supabase.storage
        .from('blog-images')
        .upload(fileName, file);

      if (error) {
        console.error("Error uploading image:", error);
        if (error.message.includes("bucket")) {
          toast({
            title: "Error",
            description: "Storage not configured. Please contact administrator.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: "Failed to upload image. Please try again.",
            variant: "destructive",
          });
        }
        throw error;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(fileName);

      form.setValue("image_url", publicUrl);
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      form.setError("image_url", {
        message: "Failed to upload image",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter blog title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Write your blog content here..." 
                  className="min-h-[200px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input placeholder="Enter author name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <div className="space-y-4">
                <FormControl>
                  <Input placeholder="Enter image URL" {...field} />
                </FormControl>
                <div className="flex items-center gap-4">
                  <Input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                  />
                  {isUploading && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  )}
                </div>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting || isUploading}>
          {isSubmitting ? "Adding Blog..." : "Add Blog"}
        </Button>
      </form>
    </Form>
  );
};

export default BlogForm;