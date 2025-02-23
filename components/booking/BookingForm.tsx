import { useState } from "react";
import axios from "axios";

interface BookingFormProps {
  bookingDetails: {
    propertyName: string;
    price: number;
    bookingFee: number;
    totalNights: number;
    startDate: string;
  };
}

const BookingForm: React.FC<BookingFormProps> = ({ bookingDetails }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validate form
  const validateForm = () => {
    const errors: Partial<Record<keyof typeof formData, string>> = {};
    if (!formData.firstName) errors.firstName = "First name is required";
    if (!formData.lastName) errors.lastName = "Last name is required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Valid email is required";
    if (!formData.phoneNumber) errors.phoneNumber = "Phone number is required";
    if (!formData.cardNumber || formData.cardNumber.length < 16) errors.cardNumber = "Valid card number is required";
    if (!formData.expirationDate) errors.expirationDate = "Expiration date is required";
    if (!formData.cvv || formData.cvv.length < 3) errors.cvv = "Valid CVV is required";
    if (!formData.streetAddress) errors.streetAddress = "Street address is required";
    if (!formData.city) errors.city = "City is required";
    if (!formData.state) errors.state = "State is required";
    if (!formData.zipCode) errors.zipCode = "Zip code is required";
    if (!formData.country) errors.country = "Country is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const bookingPayload = {
        ...formData,
        propertyName: bookingDetails.propertyName,
        price: bookingDetails.price,
        bookingFee: bookingDetails.bookingFee,
        totalNights: bookingDetails.totalNights,
        startDate: bookingDetails.startDate,
      };
      const response = await axios.post("/api/bookings", bookingPayload);
      setSuccess("Booking confirmed successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        cardNumber: "",
        expirationDate: "",
        cvv: "",
        streetAddress: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      }); // Reset form
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold">Contact Details</h2>
      <form onSubmit={handleSubmit}>
        {/* Contact Information */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="border p-2 w-full mt-2"
            />
            {formErrors.firstName && <p className="text-red-500 text-sm">{formErrors.firstName}</p>}
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="border p-2 w-full mt-2"
            />
            {formErrors.lastName && <p className="text-red-500 text-sm">{formErrors.lastName}</p>}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 w-full mt-2"
            />
            {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
          </div>
          <div>
            <label>Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="border p-2 w-full mt-2"
            />
            {formErrors.phoneNumber && <p className="text-red-500 text-sm">{formErrors.phoneNumber}</p>}
          </div>
        </div>

        {/* Payment Information */}
        <h2 className="text-xl font-semibold mt-6">Pay with</h2>
        <div className="mt-4">
          <label>Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            className="border p-2 w-full mt-2"
          />
          {formErrors.cardNumber && <p className="text-red-500 text-sm">{formErrors.cardNumber}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label>Expiration Date</label>
            <input
              type="text"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleChange}
              className="border p-2 w-full mt-2"
            />
            {formErrors.expirationDate && <p className="text-red-500 text-sm">{formErrors.expirationDate}</p>}
          </div>
          <div>
            <label>CVV</label>
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              className="border p-2 w-full mt-2"
            />
            {formErrors.cvv && <p className="text-red-500 text-sm">{formErrors.cvv}</p>}
          </div>
        </div>

        {/* Billing Address */}
        <h2 className="text-xl font-semibold mt-6">Billing Address</h2>
        <div className="mt-4">
          <label>Street Address</label>
          <input
            type="text"
            name="streetAddress"
            value={formData.streetAddress}
            onChange={handleChange}
            className="border p-2 w-full mt-2"
          />
          {formErrors.streetAddress && <p className="text-red-500 text-sm">{formErrors.streetAddress}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="border p-2 w-full mt-2"
            />
            {formErrors.city && <p className="text-red-500 text-sm">{formErrors.city}</p>}
          </div>
          <div>
            <label>State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="border p-2 w-full mt-2"
            />
            {formErrors.state && <p className="text-red-500 text-sm">{formErrors.state}</p>}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label>Zip Code</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className="border p-2 w-full mt-2"
            />
            {formErrors.zipCode && <p className="text-red-500 text-sm">{formErrors.zipCode}</p>}
          </div>
          <div>
            <label>Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="border p-2 w-full mt-2"
            />
            {formErrors.country && <p className="text-red-500 text-sm">{formErrors.country}</p>}
          </div>
        </div>

        {/* Submit Button and Messages */}
        <button
          type="submit"
          disabled={loading}
          className={`mt-6 bg-green-500 text-white py-2 px-4 rounded-md w-full ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"}`}
        >
          {loading ? "Processing..." : "Confirm & Pay"}
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && <p className="text-green-500 mt-4">{success}</p>}
      </form>
    </div>
  );
};

export default BookingForm;