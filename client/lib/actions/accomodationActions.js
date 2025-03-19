const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export const getAccommodations = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/accommodations`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch accommodations");
  
      return data.data; 
    } catch (error) {
      console.error("Error fetching accommodations:", error);
      return [];
    }
  };
  
  export const getAccommodationById = async (id) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/accommodations/${id}`, 
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      ); 
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch accommodation");
  
      return data;
    } catch (error) {
      console.error("Error fetching accommodation:", error);
      return null;
    }
  };
  
  