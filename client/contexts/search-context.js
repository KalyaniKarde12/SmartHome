"use client"
import { createContext, useContext, useState } from "react"

const SearchContext = createContext(undefined)

export function SearchProvider({ children }) {
  const [location, setLocation] = useState("")
  const [checkIn, setCheckIn] = useState(null)
  const [checkOut, setCheckOut] = useState(null)
  const [guests, setGuests] = useState(2)
  const [propertyType, setPropertyType] = useState("all")
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 })
  const [amenities, setAmenities] = useState([])
  
  return (
    <SearchContext.Provider
      value={{
        location,
        checkIn,
        checkOut,
        guests,
        propertyType,
        priceRange,
        amenities,
        setLocation,
        setCheckIn,
        setCheckOut,
        setGuests,
        setPropertyType,
        setPriceRange,
        setAmenities,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider")
  }
  return context
}