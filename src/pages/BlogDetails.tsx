import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { format } from "date-fns";

const BlogDetails = () => {
  const { id } = useParams();

  const { data: blog, isLoading } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex flex-col">
      <Navigation />

      <main className="flex-grow container mx-auto px-4 py-16">
        <article className="max-w-3xl mx-auto">
          {blog.image_url && (
            <div className="aspect-video mb-8 rounded-lg overflow-hidden">
              <img
                src={blog.image_url}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="text-sm text-gray-600 mb-4">
            {format(new Date(blog.created_at), 'MMMM d, yyyy')}
          </div>

          <h1 className="text-4xl font-display font-bold text-primary mb-6">
            {blog.title}
          </h1>

          <div className="prose prose-pink max-w-none">
            {blog.content}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-600">Written by {blog.author}</p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogDetails;