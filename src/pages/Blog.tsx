import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import { useState } from "react";
import { Search } from "lucide-react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  
  const { data: blogs, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const filteredBlogs = blogs?.filter(blog => 
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.author.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex flex-col">
      <Navigation />
      
      {/* Search Section */}
      <section className="py-16 px-4 text-center">
        <h1 className="text-4xl font-display font-bold text-primary mb-4">Our Blog</h1>
        <p className="text-gray-600 mb-8">Stay updated with our latest news and tips</p>
        
        <div className="max-w-2xl mx-auto">
          <Command className="rounded-lg border shadow-md">
            <CommandInput
              placeholder="Search blogs..."
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            {searchQuery && blogs && (
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  {filteredBlogs.slice(0, 5).map((blog) => (
                    <CommandItem
                      key={blog.id}
                      value={blog.title}
                      onSelect={(value) => {
                        setSearchQuery(value);
                      }}
                    >
                      {blog.title}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            )}
          </Command>
        </div>
      </section>

      {/* Blog Grid */}
      <main className="container mx-auto px-4 pb-16 flex-grow">
        {isLoading ? (
          <div className="text-center py-8">Loading blogs...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                title={blog.title}
                content={blog.content}
                author={blog.author}
                image_url={blog.image_url}
                created_at={blog.created_at}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Blog;