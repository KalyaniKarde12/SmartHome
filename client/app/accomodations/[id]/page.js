"use client"

import { useState, useEffect } from "react"
// Remove react-router-dom import
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Wifi,
  Tv,
  Car,
  UtensilsCrossed,
  Wind,
  WashingMachine,
  Star,
  MapPin,
  Users,
  Bed,
  Bath,
  ChevronLeft,
  ChevronRight,
  Mountain,
  Snowflake,
  Home,
  X,
} from "lucide-react"
import { getAccommodationById } from "@/lib/actions/dbActions"
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

// Map amenity strings to icons
const amenityIcons = {
  "Wi-Fi": Wifi,
  Parking: Car,
  "Air Conditioning": Wind,
  Kitchen: UtensilsCrossed,
  "Swimming Pool": Wind,
  Gym: Wind,
  Balcony: Wind,
  TV: Tv,
  Washer: WashingMachine,
}

// Default image if none provided
const DEFAULT_IMAGE = "/placeholder.svg?height=500&width=800"

// In Next.js App Router, we use props to get dynamic parameters
export default function AccommodationDetails({ params }) {
  const [selectedDates, setSelectedDates] = useState()
  const [guestCount, setGuestCount] = useState("2")
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  // Get id from params instead of useParams
  const id = params.id
  const [accommodation, setAccommodation] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showAllPhotos, setShowAllPhotos] = useState(false)
  const [showDescriptionModal, setShowDescriptionModal] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [activeSection, setActiveSection] = useState("photos")

  const handleBookNow = () => {
    if (!accommodation) return

    console.log("Booking request:", {
      accommodationId: accommodation._id,
      selectedDates,
      guestCount,
    })
    // In a real app, you would submit this to an API
    alert("Booking request submitted!")
  }

  const nextImage = () => {
    if (!accommodation) return
    const images =
      accommodation.images && accommodation.images.length > 0
        ? accommodation.images.filter((img) => img && img.trim() !== "")
        : [DEFAULT_IMAGE]
    setActiveImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    if (!accommodation) return
    const images =
      accommodation.images && accommodation.images.length > 0
        ? accommodation.images.filter((img) => img && img.trim() !== "")
        : [DEFAULT_IMAGE]
    setActiveImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  useEffect(() => {
    const fetchAccommodation = async () => {
      setIsLoading(true)
      try {
        const result = await getAccommodationById(id)

        if (result?.success) {
          setAccommodation(result?.data)
        } else {
          console.error("Failed to fetch accommodation or no data returned")
        }
      } catch (error) {
        console.error("Error fetching accommodation:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchAccommodation()
    }
  }, [id])

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY
      setScrollPosition(position)

      // Determine active section based on scroll position
      const sections = document.querySelectorAll("section[id]")
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100
        const sectionHeight = section.offsetHeight
        if (position >= sectionTop && position < sectionTop + sectionHeight) {
          setActiveSection(section.id)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 70,
        behavior: "smooth",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-medium text-slate-700">Loading...</div>
      </div>
    )
  }

  if (!accommodation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-medium text-slate-700">Accommodation not found</div>
      </div>
    )
  }

  // Prepare images array with placeholders if needed
  const displayImages =
    accommodation.images && accommodation.images.length > 0
      ? accommodation.images.filter((img) => img && img.trim() !== "")
      : [DEFAULT_IMAGE]

  // If all images are empty strings, use default
  const imagesForDisplay = displayImages.length === 0 ? [DEFAULT_IMAGE] : displayImages

  // Calculate price breakdown if dates are selected
  const getPriceBreakdown = () => {
    if (!selectedDates || !selectedDates.from || !selectedDates.to) return null

    const from = new Date(selectedDates.from)
    const to = new Date(selectedDates.to)
    const nights = Math.round((to - from) / (1000 * 60 * 60 * 24))
    const subtotal = accommodation.price_per_night * nights
    const cleaningFee = 50
    const serviceFee = Math.round(subtotal * 0.12)
    const total = subtotal + cleaningFee + serviceFee

    return {
      nights,
      subtotal,
      cleaningFee,
      serviceFee,
      total,
    }
  }

  const priceBreakdown = getPriceBreakdown()

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Navigation Bar */}
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-30 bg-white shadow-md transition-transform duration-300 flex items-center justify-center py-4",
          scrollPosition > 300 ? "translate-y-0" : "-translate-y-full",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex justify-between items-center">
            <div className="text-lg font-bold text-gray-900 truncate max-w-xs">{accommodation.title}</div>
            <div className="flex space-x-6">
              <button
                onClick={() => scrollToSection("photos")}
                className={cn(
                  "text-sm font-medium",
                  activeSection === "photos"
                    ? "text-rose-500 border-b-2 border-rose-500"
                    : "text-gray-600 hover:text-gray-900",
                )}
              >
                Photos
              </button>
              <button
                onClick={() => scrollToSection("amenities")}
                className={cn(
                  "text-sm font-medium",
                  activeSection === "amenities"
                    ? "text-rose-500 border-b-2 border-rose-500"
                    : "text-gray-600 hover:text-gray-900",
                )}
              >
                Amenities
              </button>
              <button
                onClick={() => scrollToSection("reviews")}
                className={cn(
                  "text-sm font-medium",
                  activeSection === "reviews"
                    ? "text-rose-500 border-b-2 border-rose-500"
                    : "text-gray-600 hover:text-gray-900",
                )}
              >
                Reviews
              </button>
              <button
                onClick={() => scrollToSection("location")}
                className={cn(
                  "text-sm font-medium",
                  activeSection === "location"
                    ? "text-rose-500 border-b-2 border-rose-500"
                    : "text-gray-600 hover:text-gray-900",
                )}
              >
                Location
              </button>
            </div>
          </div>
        </div>
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Property Title */}
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl mb-1">{accommodation.title}</h1>

        <div className="flex flex-wrap items-center gap-2 mb-6">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-rose-500 fill-rose-500" />
            <span className="ml-1 font-medium">{accommodation.rating}</span>
            <span className="mx-1">·</span>
            <span className="underline font-medium">
              {accommodation.reviews ? accommodation.reviews.length : 0} reviews
            </span>
          </div>
          <span className="mx-1">·</span>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span className="ml-1 underline font-medium">
              {accommodation.location.city}, {accommodation.location.address}
            </span>
          </div>
        </div>

        {/* Image Gallery */}
        <div id="photos" className="relative mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-xl overflow-hidden">
            <div className="md:col-span-2 md:row-span-2 relative aspect-[4/3]">
              <img
                src={imagesForDisplay[0] || DEFAULT_IMAGE}
                alt="Main property view"
                className="object-cover w-full h-full"
              />
            </div>

            {imagesForDisplay.slice(1, 5).map((image, index) => (
              <div key={index} className="hidden md:block relative aspect-square">
                <img
                  src={image || DEFAULT_IMAGE}
                  alt={`Property view ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}

            {/* Mobile image carousel */}
            <div className="relative aspect-[4/3] md:hidden">
              <img
                src={imagesForDisplay[activeImageIndex] || DEFAULT_IMAGE}
                alt={`Property view ${activeImageIndex + 1}`}
                className="object-cover w-full h-full"
              />
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <button
            onClick={() => setShowAllPhotos(true)}
            className="absolute bottom-4 right-4 bg-white text-black px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-shadow"
          >
            Show all photos
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Property Details */}
          <div className="md:col-span-2">
            <div className="flex flex-col md:flex-row justify-between items-start border-b pb-6 mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {accommodation.property_type} hosted by {accommodation.host.name}
                </h2>
                <div className="flex items-center gap-2 text-gray-600 mt-1">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-1" />
                    <span>{accommodation.max_guests || 2} guests</span>
                  </div>
                  <span>·</span>
                  <div className="flex items-center">
                    <Bed className="h-5 w-5 mr-1" />
                    <span>
                      {accommodation.bedrooms || 1} bedroom{accommodation.bedrooms !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <span>·</span>
                  <div className="flex items-center">
                    <Bed className="h-5 w-5 mr-1" />
                    <span>
                      {accommodation.beds || 1} bed{accommodation.beds !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <span>·</span>
                  <div className="flex items-center">
                    <Bath className="h-5 w-5 mr-1" />
                    <span>
                      {accommodation.bathrooms || 1} bath{accommodation.bathrooms !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 md:mt-0 flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-medium text-gray-700">
                  {accommodation.host.name.charAt(0)}
                </div>
              </div>
            </div>

            {/* Property Highlights */}
            <div className="border-b pb-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start gap-4">
                  <Mountain className="h-8 w-8 text-gray-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900">Mountain and valley views</h3>
                    <p className="text-gray-500 text-sm">Soak up the views during your stay.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Snowflake className="h-8 w-8 text-gray-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900">Designed for staying cool</h3>
                    <p className="text-gray-500 text-sm">Beat the heat with the A/C and ceiling fan.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Home className="h-8 w-8 text-gray-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900">Beautiful area</h3>
                    <p className="text-gray-500 text-sm">This home is in a scenic location.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="border-b pb-6 mb-6">
              <p className="text-gray-700 whitespace-pre-line">{accommodation.description}</p>
              <Button variant="outline" className="mt-4" onClick={() => setShowDescriptionModal(true)}>
                Show more
              </Button>
            </div>

            {/* Amenities */}
            <div id="amenities" className="border-b pb-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">What this place offers</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {accommodation.amenities.map((amenity, index) => {
                  const IconComponent = amenityIcons[amenity] || Wifi
                  return (
                    <div key={index} className="flex items-center gap-4">
                      <IconComponent className="h-6 w-6 text-gray-500" />
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Reviews Section */}
            {accommodation.reviews && accommodation.reviews.length > 0 && (
              <div id="reviews">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="h-5 w-5 text-rose-500 fill-rose-500" />
                  <span className="text-xl font-bold">{accommodation.rating}</span>
                  <span className="mx-1">·</span>
                  <span className="text-xl font-bold">
                    {accommodation.reviews.length} review{accommodation.reviews.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {accommodation.reviews.slice(0, 6).map((review, index) => (
                    <div key={index} className="border-b pb-4 md:border-b-0 md:pb-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-medium text-gray-700">
                          {review.user.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{review.user}</p>
                          <p className="text-gray-500 text-sm">
                            {new Date(review.date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>

                {accommodation.reviews.length > 6 && (
                  <Button variant="outline" className="mt-6">
                    Show all {accommodation.reviews.length} reviews
                  </Button>
                )}
              </div>
            )}

            {/* Location Section */}
            <div id="location" className="mt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Location</h2>
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                <p className="text-gray-500">
                  Map view of {accommodation.location.city}, {accommodation.location.address}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div>
            <div className="sticky top-8">
              <Card className="rounded-xl shadow-lg overflow-hidden border border-gray-200">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex items-baseline justify-between mb-4">
                      <div className="text-2xl font-bold">
                        ${accommodation.price_per_night}{" "}
                        <span className="text-base font-normal text-gray-500">night</span>
                      </div>

                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-rose-500 fill-rose-500" />
                        <span className="ml-1 font-medium">{accommodation.rating}</span>
                        <span className="mx-1 text-gray-500">·</span>
                        <span className="text-gray-500 font-medium">
                          {accommodation.reviews ? accommodation.reviews.length : 0} reviews
                        </span>
                      </div>
                    </div>

                    <div className="border border-gray-300 rounded-lg overflow-hidden mb-4">
                      <div className="grid grid-cols-2 divide-x divide-gray-300">
                        <div className="p-3">
                          <div className="text-xs font-bold uppercase text-gray-500">CHECK-IN</div>
                          <div className="font-medium">
                            {selectedDates?.from ? selectedDates.from.toLocaleDateString() : "Add date"}
                          </div>
                        </div>
                        <div className="p-3">
                          <div className="text-xs font-bold uppercase text-gray-500">CHECKOUT</div>
                          <div className="font-medium">
                            {selectedDates?.to ? selectedDates.to.toLocaleDateString() : "Add date"}
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-300 p-3">
                        <div className="text-xs font-bold uppercase text-gray-500">GUESTS</div>
                        <Select value={guestCount} onValueChange={setGuestCount}>
                          <SelectTrigger className="w-full border-0 p-0 h-auto shadow-none focus:ring-0">
                            <SelectValue placeholder="Select number of guests" />
                          </SelectTrigger>
                          <SelectContent>
                            {[...Array(accommodation.max_guests || 4)].map((_, i) => (
                              <SelectItem key={i} value={(i + 1).toString()}>
                                {i + 1} guest{i !== 0 ? "s" : ""}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button
                      className="w-full h-12 text-lg bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white rounded-lg"
                      onClick={handleBookNow}
                    >
                      Reserve
                    </Button>

                    <p className="text-center text-sm text-gray-500 mt-2">You won't be charged yet</p>

                    {priceBreakdown && (
                      <div className="mt-4 space-y-3">
                        <div className="flex justify-between">
                          <span className="underline">
                            ${accommodation.price_per_night} x {priceBreakdown.nights} night
                            {priceBreakdown.nights !== 1 ? "s" : ""}
                          </span>
                          <span>${priceBreakdown.subtotal}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="underline">Cleaning fee</span>
                          <span>${priceBreakdown.cleaningFee}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="underline">Service fee</span>
                          <span>${priceBreakdown.serviceFee}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-bold">
                          <span>Total before taxes</span>
                          <span>${priceBreakdown.total}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-6 bg-gray-50 mt-4 border-t border-gray-200">
                    <Calendar
                      mode="range"
                      selected={selectedDates}
                      onSelect={setSelectedDates}
                      className="rounded-xl border-none"
                      classNames={{
                        day_selected: "bg-rose-500 text-white hover:bg-rose-600",
                        day_today: "bg-gray-100 text-gray-900 font-bold",
                        day_range_middle: "bg-rose-100 text-rose-900",
                        day_range_end: "bg-rose-500 text-white hover:bg-rose-600",
                      }}
                      disabled={(date) => {
                        if (!accommodation.availability) return false
                        const from = new Date(accommodation.availability.from)
                        const to = new Date(accommodation.availability.to)
                        return date < from || date > to
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Full Photo Gallery Modal */}
      {showAllPhotos && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
          <div className="p-4">
            <button onClick={() => setShowAllPhotos(false)} className="flex items-center gap-1 font-medium mb-4">
              <ChevronLeft className="h-5 w-5" />
              Back to listing
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto">
              {imagesForDisplay.map((image, index) => (
                <div key={index} className="relative aspect-square">
                  <img
                    src={image || DEFAULT_IMAGE}
                    alt={`Property view ${index + 1}`}
                    className="object-cover rounded-lg w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Description Modal */}
      <Dialog open={showDescriptionModal} onOpenChange={setShowDescriptionModal}>
        <DialogContent className="sm:max-w-2xl">
          <DialogTitle className="text-xl font-bold">About this space</DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>

          <div className="max-h-[70vh] overflow-y-auto pr-2">
            <h3 className="font-semibold text-lg mb-2">The space</h3>
            <p className="text-gray-700 mb-4 whitespace-pre-line">{accommodation.description}</p>

            <h3 className="font-semibold text-lg mb-2">The neighborhood</h3>
            <p className="text-gray-700 mb-4">
              Located in the beautiful area of {accommodation.location.city}, this {accommodation.property_type} offers
              a perfect blend of comfort and convenience. The neighborhood is known for its scenic views and proximity
              to local attractions.
            </p>

            <h3 className="font-semibold text-lg mb-2">Getting around</h3>
            <p className="text-gray-700 mb-4">
              The property is easily accessible and located near major transportation routes. Public transportation is
              available within walking distance, and there are plenty of parking options for those traveling by car.
            </p>

            <h3 className="font-semibold text-lg mb-2">House rules</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Check-in: After 3:00 PM</li>
              <li>Checkout: Before 11:00 AM</li>
              <li>No smoking</li>
              <li>No pets</li>
              <li>No parties or events</li>
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}