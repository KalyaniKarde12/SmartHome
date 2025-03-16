import express from "express";
import Accommodation from "../models/accommodationModel.js";


const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const accommodations = await Accommodation.find();
    res.json({ success: true, data: accommodations });
  } catch (error) {
    console.error("Error fetching accommodations:", error);
    res.status(500).json({ success: false, message: "Failed to fetch accommodations" });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const accommodation = await Accommodation.findById(id);
    if (!accommodation) {
      return res.status(404).json({ success: false, message: "Accommodation not found" });
    }

    res.json({ success: true, data: accommodation });
  } catch (error) {
    console.error("Error fetching accommodation by ID:", error);
    res.status(500).json({ success: false, message: "Failed to fetch accommodation" });
  }
});


export default router; 
