import { useEffect, useState } from "react";
import "./Dashboard.css";

function AmenityBookingPage({ email, onBack }) {
  const [amenities, setAmenities] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [amenityId, setAmenityId] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchAmenities = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/amenities"
      );

      const data = await response.json();
      setAmenities(data);
    } catch (error) {
      console.error("Error loading amenities", error);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/bookings/resident/${email}`
      );

      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error loading bookings", error);
    }
  };

  useEffect(() => {
    fetchAmenities();
    fetchBookings();
  }, [email]);

  const selectedAmenity = amenities.find(
    (amenity) => amenity.id === Number(amenityId)
  );

  const makeBooking = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const response = await fetch(
        "http://localhost:8080/api/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amenityId: Number(amenityId),
            residentEmail: email,
            bookingDate: bookingDate,
            startTime: startTime + ":00",
            endTime: endTime + ":00",
            amount: selectedAmenity?.bookingFee || 0,
          }),
        }
      );

      const data = await response.text();

      if (!response.ok) {
        throw new Error(data);
      }

      setMessage("Amenity booked successfully! ✅");

      setAmenityId("");
      setBookingDate("");
      setStartTime("");
      setEndTime("");

      fetchBookings();
    } catch (error) {
      setError(error.message || "Unable to book amenity");
    }
  };

  return (
    <div className="complaint-page">

      <div className="complaint-header">
        <div>
          <button className="back-btn" onClick={onBack}>
            ← Back to Dashboard
          </button>

          <h1>📅 Amenity Booking</h1>

          <p>
            Book community amenities and view your bookings
          </p>
        </div>
      </div>

      <div className="complaint-container">

        <div className="complaint-form-card">

          <h2>Book an Amenity</h2>

          <form onSubmit={makeBooking}>

            <select
              value={amenityId}
              onChange={(e) => setAmenityId(e.target.value)}
              required
            >
              <option value="">Select Amenity</option>

              {amenities.map((amenity) => (
                <option
                  key={amenity.id}
                  value={amenity.id}
                >
                  {amenity.name}
                </option>
              ))}
            </select>

            {selectedAmenity && (
              <div className="amenity-info">
                <p>
                  <strong>Location:</strong>{" "}
                  {selectedAmenity.location}
                </p>

                <p>
                  <strong>Capacity:</strong>{" "}
                  {selectedAmenity.capacity}
                </p>

                <p>
                  <strong>Booking Fee:</strong>{" "}
                  ₹{selectedAmenity.bookingFee}
                </p>
              </div>
            )}

            <input
              type="date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              required
            />

            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />

            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />

            <button type="submit">
              Book Amenity
            </button>

          </form>

          {message && (
            <p className="complaint-message">
              {message}
            </p>
          )}

          {error && (
            <p className="login-error">
              ❌ {error}
            </p>
          )}

        </div>

        <div className="complaints-list">

          <h2>My Bookings</h2>

          {bookings.length === 0 ? (
            <p>No bookings found.</p>
          ) : (
            bookings.map((booking) => (

              <div
                className="complaint-item"
                key={booking.id}
              >

                <div>

                  <h3>
                    {amenities.find(
                      (amenity) =>
                        amenity.id === booking.amenityId
                    )?.name || `Amenity #${booking.amenityId}`}
                  </h3>

                  <p>
                    Date: {booking.bookingDate}
                  </p>

                  <small>
                    Time: {booking.startTime} -{" "}
                    {booking.endTime}
                  </small>

                  <br />

                  <small>
                    Amount: ₹{booking.amount}
                  </small>

                </div>

                <span className="status">
                  {booking.bookingStatus}
                </span>

              </div>

            ))
          )}

        </div>

      </div>

    </div>
  );
}

export default AmenityBookingPage;