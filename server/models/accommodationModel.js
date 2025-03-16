import mongoose from "mongoose";

const AccommodationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  location: {
    city: { type: String, required: true },
    address: { type: String, required: true },
    latitude: { type: Number },
    longitude: { type: Number },
  },
  price_per_night: { type: Number, required: true },
  amenities: [{ type: String }],
  images: [{ type: String }],
  rating: { type: Number, default: 0 },
}, { timestamps: true });

const Accommodation = mongoose.models.Accommodation || mongoose.model("Accommodation", AccommodationSchema);

export default Accommodation;
