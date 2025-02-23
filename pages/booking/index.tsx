import { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import BookingForm from "@/components/booking/BookingForm";
import OrderSummary from "@/components/booking/OrderSummary";
import CancellationPolicy from "@/components/booking/CancellationPolicy";

// Define booking details type (adjust based on your API requirements)
interface BookingDetails {
  propertyName: string;
  price: number;
  bookingFee: number;
  totalNights: number;
  startDate: string;
}

export default function BookingPage() {
  // State for booking details (fetched from API or passed from property page)
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  // Simulate fetching booking details (e.g., from property page or API)
  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        setLoadingDetails(true);
        // Replace with actual API call if needed, e.g., /api/bookings/preview
        const response = await axios.get("/api/bookings/preview"); // Placeholder endpoint
        setBookingDetails(response.data);
      } catch (err) {
        setErrorDetails("Failed to load booking details.");
      } finally {
        setLoadingDetails(false);
      }
    };

    fetchBookingDetails();
  }, []);

  // Loading state for booking details
  if (loadingDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Head>
          <title>Loading Booking - ALX Listing App</title>
        </Head>
        <p className="text-xl text-gray-600">Loading booking details...</p>
      </div>
    );
  }

  // Error state for booking details
  if (errorDetails || !bookingDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Head>
          <title>Error - ALX Listing App</title>
        </Head>
        <p className="text-red-500 text-xl">
          {errorDetails || "Booking details not available."}
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Head>
        <title>Booking - {bookingDetails.propertyName} - ALX Listing App</title>
        <meta name="description" content={`Book ${bookingDetails.propertyName}`} />
      </Head>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BookingForm bookingDetails={bookingDetails} />
        <OrderSummary bookingDetails={bookingDetails} />
      </div>
      <CancellationPolicy />
    </div>
  );
}