import mongoose from "mongoose";

const AccommodationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: {
      city: { type: String, required: true },
      address: { type: String, required: true },
      latitude: { type: Number, required: false },
      longitude: { type: Number, required: false }
    },
    price_per_night: { type: Number, required: true },
    availability: {
      from: { type: Date, required: true },
      to: { type: Date, required: true }
    },
    property_type: { type: String, enum: ["Apartment", "Villa", "Condo", "Cabin", "Hostel"], required: true },
    amenities: [{ type: String }],
    images: [{ type: String }],
    rating: { type: Number, default: 0 },
    reviews: [
      {
        user: { type: String, required: true },
        comment: { type: String, required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        date: { type: Date, default: Date.now }
      }
    ],
    host: {
      name: { type: String, required: true },
      contact: { type: String, required: true },
      email: { type: String, required: true }
    },
    booking_history: [
      {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        check_in: { type: Date, required: true },
        check_out: { type: Date, required: true },
        status: { type: String, enum: ["Booked", "Cancelled"], default: "Booked" }
      }
    ]
  },
  { timestamps: true }
);

// ✅ Fix: Ensure model is only declared once (Prevents hot-reload issues)
export default mongoose.models.Accommodation || mongoose.model("Accommodation", AccommodationSchema);
