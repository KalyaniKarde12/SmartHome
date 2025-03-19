"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Clock, MapPin, Phone, Search, Star, UtensilsCrossed } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatTravelFilters, getCombinedTravelData } from "@/lib/actions/apiActions"

const cuisinesList = [
  { name: "Italian", icon: UtensilsCrossed },
  { name: "French", icon: UtensilsCrossed },
  { name: "Mediterranean", icon: UtensilsCrossed },
  { name: "European", icon: UtensilsCrossed },
  { name: "Healthy", icon: UtensilsCrossed },
  { name: "Pizza", icon: UtensilsCrossed },
  { name: "Neapolitan", icon: UtensilsCrossed },
  { name: "Campania", icon: UtensilsCrossed },
]

const sortRestaurants = (restaurants, sortBy) => {
  switch (sortBy) {
    case "price_low":
      // Sort by price range (using $ signs as proxy)
      return [...restaurants].sort((a, b) => {
        const aPrice = a.priceTypes ? a.priceTypes.length : 0
        const bPrice = b.priceTypes ? b.priceTypes.length : 0
        return aPrice - bPrice
      })
    case "price_high":
      return [...restaurants].sort((a, b) => {
        const aPrice = a.priceTypes ? a.priceTypes.length : 0
        const bPrice = b.priceTypes ? b.priceTypes.length : 0
        return bPrice - aPrice
      })
    case "rating":
      return [...restaurants].sort((a, b) => b.rating - a.rating)
    default:
      return restaurants // Recommended (default order)
  }
}

export default function ListingsPage() {
  const [restaurants, setRestaurants] = useState([])
  const [displayedRestaurants, setDisplayedRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    cuisines: [],
  })
  const [sortBy, setSortBy] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const formattedFilters = formatTravelFilters(filters);
        const data = await getCombinedTravelData(formattedFilters);
        // Access the restaurants data array correctly
        setRestaurants(data.restaurants?.data || []);
      } catch (error) {
        console.error("Error fetching travel data:", error);
        setRestaurants([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  useEffect(() => {
    let restaurantsData = Array.isArray(restaurants) ? [...restaurants] : [];

    // Apply search filter
    if (searchQuery) {
      restaurantsData = restaurantsData.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Apply cuisine filters if any
    if (filters.cuisines.length > 0) {
      restaurantsData = restaurantsData.filter((restaurant) =>
        filters.cuisines.some((cuisine) =>
          restaurant.cuisines?.some((c) => c.toLowerCase().includes(cuisine.toLowerCase())),
        ),
      );
    }

    // Apply sorting
    if (sortBy) {
      restaurantsData = sortRestaurants(restaurantsData, sortBy);
    }

    setDisplayedRestaurants(restaurantsData);
  }, [restaurants, searchQuery, filters, sortBy]);

  const toggleCuisine = (cuisine) => {
    setFilters((prev) => {
      const cuisines = [...prev.cuisines]
      if (cuisines.includes(cuisine)) {
        return { ...prev, cuisines: cuisines.filter((c) => c !== cuisine) }
      } else {
        return { ...prev, cuisines: [...cuisines, cuisine] }
      }
    })
  }

  return (
    <div className="container py-12 mx-auto px-5">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
          <Input
            type="search"
            placeholder="Search restaurants..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4">
          <Select onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="price_low">Price: Low to High</SelectItem>
              <SelectItem value="price_high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="restaurants" className="space-y-4">
        <TabsList>
          <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
          <TabsTrigger value="cuisines">Cuisines</TabsTrigger>
        </TabsList>
        <TabsContent value="restaurants" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <>
                {[...Array(9)].map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="relative h-52">
                      <Skeleton className="h-full w-full" />
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>
                            <Skeleton className="h-6 w-40 mb-1" />
                          </CardTitle>
                          <CardDescription>
                            <Skeleton className="h-4 w-24" />
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </>
            ) : (
              <>
                {displayedRestaurants.map((restaurant) => (
                  <Link href={restaurant.link} target="_blank" key={restaurant.id}>
                    <Card className="overflow-hidden h-full hover:shadow-md transition-shadow duration-300">
                      <div className="relative h-52">
                        <Image
                          src={restaurant.thumbnail || "/placeholder.svg?height=400&width=600"}
                          alt={restaurant.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-white text-slate-800 hover:bg-white">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                            {restaurant.rating?.toFixed(1)}
                          </Badge>
                        </div>
                        {restaurant.priceTypes && (
                          <div className="absolute bottom-3 right-3">
                            <Badge className="bg-blue-500 text-white hover:bg-blue-600">{restaurant.priceTypes}</Badge>
                          </div>
                        )}
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{restaurant.name}</CardTitle>
                            <CardDescription className="flex items-center mt-1">
                              <MapPin className="h-3.5 w-3.5 mr-1 text-slate-400" />
                              {restaurant.address?.fullAddress?.split(",")[0] || "Address unavailable"}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {restaurant.cuisines?.slice(0, 3).map((cuisine, index) => (
                            <Badge key={index} variant="outline" className="bg-slate-50">
                              {cuisine}
                            </Badge>
                          ))}
                          {restaurant.cuisines?.length > 3 && (
                            <Badge variant="outline" className="bg-slate-50">
                              +{restaurant.cuisines.length - 3} more
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {restaurant.openStatusText || "Hours unavailable"}
                          </div>
                          {restaurant.telephone && (
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-1" />
                              Available
                            </div>
                          )}
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="font-semibold text-teal-600">
                            {restaurant.reviewsCount} {restaurant.reviewsCount === 1 ? "review" : "reviews"}
                          </div>
                          <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
                            View Details
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </>
            )}
          </div>
        </TabsContent>

        <TabsContent value="cuisines" className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {cuisinesList.map((cuisine) => (
              <Badge
                key={cuisine.name}
                variant="secondary"
                className={`cursor-pointer ${
                  filters.cuisines.includes(cuisine.name)
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-slate-100 text-slate-800 hover:bg-slate-200"
                }`}
                onClick={() => toggleCuisine(cuisine.name)}
              >
                {cuisine.name}
              </Badge>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
