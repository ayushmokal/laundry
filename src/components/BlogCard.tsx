import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { format } from "date-fns";

interface BlogCardProps {
  id: string;
  title: string;
  content: string;
  author: string;
  image_url?: string;
  created_at: string;
}

const BlogCard = ({ id, title, content, author, image_url, created_at }: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`} className="group">
      <article className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
        <div className="aspect-video relative overflow-hidden">
          <img
            src={image_url || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <Calendar className="w-4 h-4" />
            <time dateTime={created_at}>
              {format(new Date(created_at), 'MMMM d, yyyy')}
            </time>
          </div>
          <h2 className="text-2xl font-display font-bold text-primary mb-2 group-hover:text-brand-pink">
            {title}
          </h2>
          <p className="text-gray-600 line-clamp-3 mb-4">
            {content}
          </p>
          <div className="text-sm text-gray-500">
            By {author}
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;