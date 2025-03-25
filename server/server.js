import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import accommodationRoutes from "./routes/accommodationRoutes.js";
import combinedRoutes from "./routes/combinedRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

app.use("/api", chatRoutes);
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/accommodations", accommodationRoutes);
app.use("/api", combinedRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
