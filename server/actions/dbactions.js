import connectDB from "../config/db";
import Accommodation from "../models/accommodationModel"; // Fix model import

export const getAllAccommodations = async () => {
  await connectDB(); // Ensure DB connection before query

  try {
    const accommodations = await Accommodation.find();
    console.log("Fetched Accommodations:", accommodations);
    return accommodations;
  } catch (error) {
    console.error("Error fetching accommodations:", error);
    throw new Error("Failed to fetch accommodations"); // Throw error for API handling
  }
};
