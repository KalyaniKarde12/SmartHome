import express from "express";
import https from "https";

const router = express.Router();

router.get("/combined-travel-data", async (req, res) => {
  try {
    // Create a promise for the TripAdvisor API using the Node.js https module
    const tripAdvisorPromise = new Promise((resolve, reject) => {
      const options = {
        method: "GET",
        hostname: "real-time-tripadvisor-scraper-api.p.rapidapi.com",
        path: `/tripadvisor_restaurants_search_v2?location=${encodeURIComponent(
          req.query.location || "new york"
        )}`,
        headers: {
          "x-rapidapi-key": "7a653cec75msh289891476cdd4dfp178068jsn208f8b56174e",
          "x-rapidapi-host": "real-time-tripadvisor-scraper-api.p.rapidapi.com",
        },
      };

      const request = https.request(options, function (response) {
        const chunks = [];

        response.on("data", function (chunk) {
          chunks.push(chunk);
        });

        response.on("end", function () {
          const body = Buffer.concat(chunks);
          try {
            const data = JSON.parse(body.toString());
            resolve(data);
          } catch (error) {
            reject(error);
          }
        });
      });

      request.on("error", (error) => {
        reject(error);
      });

      request.end();
    });

    // Wait for TripAdvisor API response
    const tripAdvisorData = await tripAdvisorPromise;

    // Create a structured response with only TripAdvisor data
    const combinedData = {
      restaurants: tripAdvisorData,
    };

    res.json(combinedData);
  } catch (error) {
    console.error("Error fetching travel data:", error);
    res.status(500).json({
      message: "Error fetching travel data",
      error: error.message,
    });
  }
});

export default router;
