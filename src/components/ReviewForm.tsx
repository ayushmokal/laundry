import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { Star } from "lucide-react";

interface ReviewFormProps {
  locationId: string;
  onReviewSubmitted: () => void;
}

const ReviewForm = ({ locationId, onReviewSubmitted }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast({
        title: "Error",
        description: "Please select a rating",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Add the review
      const { error: reviewError } = await supabase
        .from("reviews")
        .insert([
          {
            location_id: locationId,
            rating,
            comment,
          },
        ]);

      if (reviewError) throw reviewError;

      // Update the location's rating and review count
      const { data: reviews } = await supabase
        .from("reviews")
        .select("rating")
        .eq("location_id", locationId);

      const avgRating = reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length;

      const { error: locationError } = await supabase
        .from("locations")
        .update({
          rating: avgRating,
          reviews: reviews.length,
        })
        .eq("id", locationId);

      if (locationError) throw locationError;

      toast({
        title: "Success",
        description: "Review submitted successfully",
      });

      setRating(0);
      setComment("");
      onReviewSubmitted();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast({
        title: "Error",
        description: "Failed to submit review",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              className="focus:outline-none"
            >
              <Star
                className={`w-6 h-6 ${
                  value <= rating ? "text-yellow-500 fill-current" : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience..."
          className="w-full"
        />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
};

export default ReviewForm;