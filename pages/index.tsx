import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { PropertyProps } from '../interfaces'; // From Milestone 2
import Button from '../components/common/Button'; // From Milestone 1

const IndexPage: React.FC = () => {
  const [properties, setProperties] = useState<PropertyProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch properties from API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/properties'); // Replace with your actual endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch properties');
        }
        const data = await response.json();
        setProperties(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Head>
          <title>Loading Properties - ALX Listing App</title>
        </Head>
        <p className="text-xl text-gray-600">Loading properties...</p>
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
          <Button label="Retry" onClick={() => window.location.reload()} />
        </div>
      </div>
    );
  }

  // Success state with dynamic data
  return (
    <div>
      <Head>
        <title>Property Listings - ALX Listing App</title>
        <meta name="description" content="Find your favorite place here!" />
      </Head>

      {/* Hero Section - From Milestone 2 */}
      <section
        className="hero bg-cover bg-center py-24"
        style={{ backgroundImage: "url('/path-to-your-image.jpg')" }}
      >
        <div className="container mx-auto text-center text-white">
          <h1 className="text-5xl font-bold">Find your favorite place here!</h1>
          <p className="mt-4">The best prices for over 2 million properties worldwide.</p>
        </div>
      </section>

      {/* Filter Section - Using Button from Milestone 1 */}
      <section className="filters p-4">
        <div className="container mx-auto flex space-x-4 justify-center">
          {["Top Villa", "Self Checkin", "Luxury"].map((label) => (
            <Button
              key={label}
              label={label}
              onClick={() => console.log(`Filter by ${label}`)} // Placeholder for filter logic
            />
          ))}
        </div>
      </section>

      {/* Listing Section - Dynamic data */}
      <section className="property-listings p-4">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property: PropertyProps) => (
            <div
              key={property.name}
              className="property-card border p-4 rounded bg-white shadow-lg"
            >
              <img
                src={property.image}
                alt={property.name}
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="text-xl font-semibold mt-2">{property.name}</h3>
              <p className="text-gray-600">
                {property.address.city}, {property.address.country}
              </p>
              <p className="text-gray-800">Price: ${property.price}</p>
              <p className="text-yellow-500">Rating: {property.rating}</p>
              <Link href={`/property/${property.name}`} passHref>
                <Button label="View Details" onClick={() => {}} />
              </Link>
            </div>
          ))}
          {properties.length === 0 && (
            <p className="col-span-full text-center text-gray-500 py-8">
              No properties available at the moment
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default IndexPage;