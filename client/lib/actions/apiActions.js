const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getCombinedTravelData = async (filters = {}) => {
  try {
    // Convert filters object to URL query parameters
    const queryParams = new URLSearchParams(filters).toString();

    // Use the new endpoint name
    const response = await fetch(`${API_BASE_URL}/api/combined-travel-data?${queryParams}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    // Parse the JSON response
    const data = await response.json();

    // Check if the response was successful
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch travel data");
    }

    return {
      restaurants: data.restaurants || [],
    };
  } catch (error) {
    console.error("Error fetching travel data:", error);
    
    return {
      restaurants: [],
    };
  }
};

// Helper function to format filters specifically for travel data
export const formatTravelFilters = (rawFilters) => {
  const formattedFilters = {};

  // Handle location
  if (rawFilters.location) {
    formattedFilters.location = rawFilters.location;
  }

  return formattedFilters;
};
