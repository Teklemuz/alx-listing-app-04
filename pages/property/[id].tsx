import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import Head from "next/head";
import PropertyDetail from "@/components/property/PropertyDetail";
import BookingSection from "@/components/property/BookingSection";
import ReviewSection from "@/components/property/ReviewSection";
import { PropertyProps } from "@/interfaces/index";                 // From Milestone 3

export default function PropertyDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [property, setProperty] = useState<PropertyProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return; 
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`/api/properties/${id}`); 
        setProperty(response.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An error occurred while fetching property details"
        );
        console.error("Error fetching property details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Head>
          <title>Loading Property - ALX Listing App</title>
        </Head>
        <p className="text-xl text-gray-600">Loading property details...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Head>
          <title>Error - ALX Listing App</title>
        </Head>
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">{error}</p>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={() => router.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Property not found
  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Head>
          <title>Property Not Found - ALX Listing App</title>
        </Head>
        <p className="text-xl text-gray-600">Property not found</p>
      </div>
    );
  }

  // Success state
  return (
    <div className="flex flex-col md:flex-row">
      <Head>
        <title>{property.name} - ALX Listing App</title>
        <meta name="description" content={`Details for ${property.name}`} />
      </Head>
      <div className="flex-1">
        <PropertyDetail property={property} />
        <ReviewSection reviews={property.reviews || []} />
      </div>
      <div className="w-full md:w-1/3 p-4">
        <BookingSection price={property.price} />
      </div>
    </div>
  );
}