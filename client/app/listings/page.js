"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Search, MapPin, Star, Home, SlidersHorizontal, X, Wifi, Car, UtensilsCrossed, Wind, Tv } from "lucide-react"
import Footer from "@/components/footer"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { getAccommodations } from "@/lib/actions/dbActions"


export default function Listings() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [listings, setListings] = useState([])
    const [loading, setLoading] = useState(true)
    const [filters, setFilters] = useState({
        location: searchParams.get("location") || "",
        propertyType: searchParams.get("type") || "all",
        priceRange: [
            Number.parseInt(searchParams.get("minPrice") || "50"),
            Number.parseInt(searchParams.get("maxPrice") || "1000"),
        ],
        guests: searchParams.get("guests") || "2",
        bedrooms: searchParams.get("bedrooms") || "any",
        amenities: searchParams.get("amenities") ? searchParams.get("amenities").split(",") : [],
        sortBy: searchParams.get("sortBy") || "recommended",
    })

    useEffect(() => {
        const fetchListings = async () => {
            setLoading(true)
            try {
                const data = await getAccommodations()

                // Apply filters to the fetched data
                let filteredData = [...data]

                // Filter by location
                if (filters.location) {
                    const locationLower = filters.location.toLowerCase()
                    filteredData = filteredData.filter(
                        (listing) =>
                            listing.location.city.toLowerCase().includes(locationLower) ||
                            listing.title.toLowerCase().includes(locationLower),
                    )
                }

                // Filter by property type
                if (filters.propertyType !== "all") {
                    filteredData = filteredData.filter(
                        (listing) => listing.property_type.toLowerCase() === filters.propertyType.toLowerCase(),
                    )
                }

                // Filter by price range
                filteredData = filteredData.filter(
                    (listing) =>
                        listing.price_per_night >= filters.priceRange[0] && listing.price_per_night <= filters.priceRange[1],
                )

                // Filter by amenities
                if (filters.amenities.length > 0) {
                    filteredData = filteredData.filter((listing) =>
                        filters.amenities.every((amenity) =>
                            listing.amenities.some((a) => a.toLowerCase() === amenity.toLowerCase()),
                        ),
                    )
                }

                setListings(filteredData)
            } catch (error) {
                console.error("Error fetching listings:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchListings()
    }, [filters])

    // Update URL when filters change
    useEffect(() => {
        const params = new URLSearchParams()

        if (filters.location) params.set("location", filters.location)
        if (filters.propertyType !== "all") params.set("type", filters.propertyType)
        if (filters.guests !== "2") params.set("guests", filters.guests)
        if (filters.bedrooms !== "any") params.set("bedrooms", filters.bedrooms)
        if (filters.priceRange[0] !== 50) params.set("minPrice", filters.priceRange[0].toString())
        if (filters.priceRange[1] !== 1000) params.set("maxPrice", filters.priceRange[1].toString())
        if (filters.amenities.length > 0) params.set("amenities", filters.amenities.join(","))
        if (filters.sortBy !== "recommended") params.set("sortBy", filters.sortBy)

        // Update URL without causing a page refresh
        router.push(`/listings?${params.toString()}`, { scroll: false })
    }, [filters, router])

    const updateFilter = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }))
    }

    const toggleAmenity = (amenity) => {
        setFilters((prev) => {
            const amenities = [...prev.amenities]
            if (amenities.includes(amenity)) {
                return { ...prev, amenities: amenities.filter((a) => a !== amenity) }
            } else {
                return { ...prev, amenities: [...amenities, amenity] }
            }
        })
    }

    const clearFilters = () => {
        setFilters({
            location: "",
            propertyType: "all",
            priceRange: [50, 1000],
            guests: "2",
            bedrooms: "any",
            amenities: [],
            sortBy: "recommended",
        })
    }

    // Update the sortListings function to work with your data structure
    const sortListings = (listings, sortBy) => {
        switch (sortBy) {
            case "price_low":
                return [...listings].sort((a, b) => a.price_per_night - b.price_per_night)
            case "price_high":
                return [...listings].sort((a, b) => b.price_per_night - a.price_per_night)
            case "rating":
                return [...listings].sort((a, b) => b.rating - a.rating)
            default:
                return listings // Recommended (default order)
        }
    }

    const displayedListings = sortListings(listings, filters.sortBy)

    const amenitiesList = [
        { name: "Wi-Fi", icon: Wifi },
        { name: "Parking", icon: Car },
        { name: "Kitchen", icon: UtensilsCrossed },
        { name: "Air Conditioning", icon: Wind },
        { name: "TV", icon: Tv },
    ]

    const handleSearchClick = () => {
        // Force a re-fetch by creating a new object reference
        setFilters((prev) => ({ ...prev }))
    }

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1 bg-slate-50">
                {/* Search Header */}
                <div className="bg-white border-b shadow-sm py-6">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row gap-4 items-center">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                <Input
                                    placeholder="Search by location, property name..."
                                    className="pl-10"
                                    value={filters.location}
                                    onChange={(e) => updateFilter("location", e.target.value)}
                                />
                            </div>

                            <Select value={filters.propertyType} onValueChange={(value) => updateFilter("propertyType", value)}>
                                <SelectTrigger className="w-full md:w-[180px]">
                                    <SelectValue placeholder="Property Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Properties</SelectItem>
                                    <SelectItem value="apartment">Apartment</SelectItem>
                                    <SelectItem value="penthouse">Penthouse</SelectItem>
                                    <SelectItem value="studio">Studio</SelectItem>
                                    <SelectItem value="villa">Villa</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={filters.guests} onValueChange={(value) => updateFilter("guests", value)}>
                                <SelectTrigger className="w-full md:w-[150px]">
                                    <SelectValue placeholder="Guests" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">1 Guest</SelectItem>
                                    <SelectItem value="2">2 Guests</SelectItem>
                                    <SelectItem value="3">3 Guests</SelectItem>
                                    <SelectItem value="4">4 Guests</SelectItem>
                                    <SelectItem value="5">5+ Guests</SelectItem>
                                </SelectContent>
                            </Select>

                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="outline" className="w-full md:w-auto ">
                                        <SlidersHorizontal className="mr-2 h-4 w-4" /> More Filters
                                    </Button>
                                </SheetTrigger>
                                <SheetContent className="sm:w-full max-w-md bg-white mx-auto">
                                    <div className="h-full flex flex-col mx-5 my-5">
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="text-lg font-semibold">Filters</h3>
                                           
                                        </div>

                                        <div className="space-y-6 flex-1 overflow-y-auto">
                                            <div>
                                                <h4 className="font-medium mb-3">Price Range</h4>
                                                <div className="px-2">
                                                    <Slider
                                                        value={filters.priceRange}
                                                        min={50}
                                                        max={1000}
                                                        step={10}
                                                        onValueChange={(value) => updateFilter("priceRange", value)}
                                                    />
                                                </div>
                                                <div className="flex justify-between mt-2 text-sm text-slate-600">
                                                    <span>${filters.priceRange[0]}</span>
                                                    <span>${filters.priceRange[1]}+</span>
                                                </div>
                                            </div>

                                            <Separator />

                                            <div>
                                                <h4 className="font-medium mb-3">Bedrooms</h4>
                                                <Select value={filters.bedrooms} onValueChange={(value) => updateFilter("bedrooms", value)}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Any" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="any">Any</SelectItem>
                                                        <SelectItem value="1">1+</SelectItem>
                                                        <SelectItem value="2">2+</SelectItem>
                                                        <SelectItem value="3">3+</SelectItem>
                                                        <SelectItem value="4">4+</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <Separator />

                                            <div>
                                                <h4 className="font-medium mb-3">Amenities</h4>
                                                <div className="space-y-3">
                                                    {amenitiesList.map((amenity) => (
                                                        <div key={amenity.name} className="flex items-center space-x-2">
                                                            <Checkbox
                                                                id={`amenity-${amenity.name}`}
                                                                checked={filters.amenities.includes(amenity.name)}
                                                                onCheckedChange={() => toggleAmenity(amenity.name)}
                                                            />
                                                            <label
                                                                htmlFor={`amenity-${amenity.name}`}
                                                                className="flex items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                            >
                                                                <amenity.icon className="mr-2 h-4 w-4 text-slate-500" />
                                                                {amenity.name}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t mt-auto">
                                            <Button
                                                className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700"
                                                onClick={() => handleSearchClick()}
                                            >
                                                Show Results
                                            </Button>
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>

                            <Button
                                className="w-full md:w-auto bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700"
                                onClick={() => handleSearchClick()}
                            >
                                <Search className="mr-2 h-4 w-4" /> Search
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8">
                    {/* Results Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800">
                                {loading ? "Searching accommodations..." : `${displayedListings.length} accommodations found`}
                            </h1>
                            {filters.location && <p className="text-slate-600">in {filters.location}</p>}
                        </div>

                        <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-0">
                            {filters.propertyType !== "all" && (
                                <Badge variant="secondary" className="bg-slate-100">
                                    {filters.propertyType.charAt(0).toUpperCase() + filters.propertyType.slice(1)}
                                    <button className="ml-1 hover:text-slate-900" onClick={() => updateFilter("propertyType", "all")}>
                                        <X className="h-3 w-3" />
                                    </button>
                                </Badge>
                            )}

                            {filters.amenities.length > 0 && (
                                <Badge variant="secondary" className="bg-slate-100">
                                    {filters.amenities.length} amenities
                                    <button className="ml-1 hover:text-slate-900" onClick={() => updateFilter("amenities", [])}>
                                        <X className="h-3 w-3" />
                                    </button>
                                </Badge>
                            )}

                            {filters.bedrooms !== "any" && (
                                <Badge variant="secondary" className="bg-slate-100">
                                    {filters.bedrooms}+ bedrooms
                                    <button className="ml-1 hover:text-slate-900" onClick={() => updateFilter("bedrooms", "any")}>
                                        <X className="h-3 w-3" />
                                    </button>
                                </Badge>
                            )}

                            <Select value={filters.sortBy} onValueChange={(value) => updateFilter("sortBy", value)}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="recommended">Recommended</SelectItem>
                                    <SelectItem value="price_low">Price: Low to High</SelectItem>
                                    <SelectItem value="price_high">Price: High to Low</SelectItem>
                                    <SelectItem value="rating">Top Rated</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Listings Grid */}
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <Card key={item} className="overflow-hidden animate-pulse">
                                    <div className="h-64 bg-slate-200" />
                                    <CardHeader className="pb-2">
                                        <div className="h-6 bg-slate-200 rounded w-3/4 mb-2" />
                                        <div className="h-4 bg-slate-200 rounded w-1/2" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="h-4 bg-slate-200 rounded w-full mb-2" />
                                        <div className="h-4 bg-slate-200 rounded w-2/3" />
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : displayedListings.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="mb-4">
                                <Home className="h-12 w-12 mx-auto text-slate-400" />
                            </div>
                            <h2 className="text-xl font-semibold mb-2">No accommodations found</h2>
                            <p className="text-slate-600 mb-6">Try adjusting your filters or search for a different location</p>
                            <Button variant="outline" onClick={clearFilters}>
                                Clear all filters
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {displayedListings.map((listing) => (
                                <Link href={`/listing/${listing._id}`} key={listing._id}>
                                    <Card className="overflow-hidden h-full hover:shadow-md transition-shadow duration-300">
                                        <div className="relative h-64">
                                            <Image
                                                src={listing.images[0] || "/placeholder.svg?height=400&width=600"}
                                                alt={listing.title}
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute top-3 right-3">
                                                <Badge className="bg-white text-slate-800 hover:bg-white">
                                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                                                    {listing.rating}
                                                </Badge>
                                            </div>
                                        </div>
                                        <CardHeader className="pb-2">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <CardTitle className="text-lg">{listing.title}</CardTitle>
                                                    <CardDescription className="flex items-center mt-1">
                                                        <MapPin className="h-3.5 w-3.5 mr-1 text-slate-400" />
                                                        {listing.location.city}
                                                    </CardDescription>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-sm text-slate-600 mb-3 line-clamp-2">{listing.description}</div>
                                            <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                                                <div className="flex items-center">
                                                    <Wifi className="h-4 w-4 mr-1" />
                                                    {listing.amenities.includes("Wi-Fi") ? "Wi-Fi" : "No Wi-Fi"}
                                                </div>
                                                {listing.amenities.includes("Parking") && (
                                                    <div className="flex items-center">
                                                        <Car className="h-4 w-4 mr-1" />
                                                        Parking
                                                    </div>
                                                )}
                                                {listing.amenities.includes("Air Conditioning") && (
                                                    <div className="flex items-center">
                                                        <Wind className="h-4 w-4 mr-1" />
                                                        AC
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="font-semibold">
                                                    ${listing.price_per_night} <span className="text-sm font-normal text-slate-600">night</span>
                                                </div>
                                                {listing.reviews.length > 0 && (
                                                    <Badge variant="outline" className="text-teal-600 border-teal-200 bg-teal-50">
                                                        {listing.reviews.length} {listing.reviews.length === 1 ? "Review" : "Reviews"}
                                                    </Badge>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Pagination - if needed */}
                    {!loading && displayedListings.length > 0 && (
                        <div className="flex justify-center mt-12">
                            <div className="flex space-x-1">
                                <Button variant="outline" size="sm" disabled>
                                    Previous
                                </Button>
                                <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                                    1
                                </Button>
                                <Button variant="outline" size="sm">
                                    2
                                </Button>
                                <Button variant="outline" size="sm">
                                    3
                                </Button>
                                <Button variant="outline" size="sm">
                                    Next
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    )
}

