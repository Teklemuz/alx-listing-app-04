import { useState, useEffect } from "react";
import axios from "axios";
import { ReviewProps } from "@/interfaces/index"; // From Milestone 3

interface ReviewSectionProps {
  propertyId: string; // Property ID to fetch reviews for
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ propertyId }) => {
  const [reviews, setReviews] = useState<ReviewProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!propertyId) return; 
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`/api/properties/${propertyId}/reviews`);
        setReviews(response.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An error occurred while fetching reviews"
        );
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [propertyId]);

  // Loading state
  if (loading) {
    return (
      <div className="mt-8">
        <h3 className="text-2xl font-semibold">Reviews</h3>
        <p className="text-gray-600">Loading reviews...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="mt-8">
        <h3 className="text-2xl font-semibold">Reviews</h3>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // No reviews state
  if (reviews.length === 0) {
    return (
      <div className="mt-8">
        <h3 className="text-2xl font-semibold">Reviews</h3>
        <p className="text-gray-600">No reviews yet.</p>
      </div>
    );
  }

  // Success state with dynamic reviews
  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold">Reviews</h3>
      {reviews.map((review, index) => (
        <div key={index} className="border-b pb-4 mb-4">
          <div className="flex items-center">
            <img
              src={review.avatar}
              alt={review.name}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <p className="font-bold">{review.name}</p>
              <p className="text-yellow-500">{review.rating} stars</p>
            </div>
          </div>
          <p className="mt-2">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewSection;