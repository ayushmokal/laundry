import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import BlogForm from "./BlogForm";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const BlogManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) {
      console.error("Error fetching blogs:", error);
      toast({
        title: "Error",
        description: "Failed to fetch blogs",
        variant: "destructive",
      });
      return;
    }
    setBlogs(data || []);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("blogs")
        .insert([data]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Blog post added successfully",
      });

      await fetchBlogs();
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    } catch (error) {
      console.error("Error adding blog:", error);
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
    try {
      const { error } = await supabase
        .from("blogs")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      });

      await fetchBlogs();
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-display font-semibold text-primary mb-6">Add New Blog Post</h2>
        <BlogForm onSubmit={onSubmit} isSubmitting={isSubmitting} />
      </div>

      <div>
        <h3 className="text-xl font-display font-semibold text-primary mb-4">Manage Blog Posts</h3>
        <div className="grid gap-4">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <h4 className="font-medium">{blog.title}</h4>
                <p className="text-sm text-gray-600">By {blog.author}</p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(blog.id)}
                className="flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogManagement;