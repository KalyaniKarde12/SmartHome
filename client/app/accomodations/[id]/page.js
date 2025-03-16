"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Wifi, Tv, Car, UtensilsCrossed, Wind, WashingMachine } from "lucide-react"
import { getAccommodationById } from "@/lib/actions/dbActions"

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

export default function AccommodationDetails() {
  const [selectedDates, setSelectedDates] = useState()
  const [guestCount, setGuestCount] = useState("2")
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const { id } = useParams()
  const [accommodation, setAccommodation] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

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

  useEffect(() => {
    const fetchAccommodation = async () => {
      setIsLoading(true)
      try {
        const result = await getAccommodationById(id)
      
        if (result?.success) {
          setAccommodation(result?.data)
          console.log(result?.data)
        } else {
          console.error("Failed to fetch accommodation or no data returned")
        }
      } catch (error) {
        console.error("Error fetching accommodation:", error)
      } finally {
        setIsLoading(false)
      }
    }
    console.log("Accomodation",accommodation)

    fetchAccommodation()
  }, [id])

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <main className="container mx-auto px-6 py-12">
        {/* Property Header */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
            {accommodation.title}
          </h1>
          <div className="flex items-center gap-4 text-slate-600">
            <Badge variant="secondary" className="bg-teal-100 text-teal-700 hover:bg-teal-200">
              ★ {accommodation.rating}
            </Badge>
            <span>({accommodation.reviews ? accommodation.reviews.length : 0} reviews)</span>
            <span>•</span>
            <span>
              {accommodation.location.city}, {accommodation.location.address}
            </span>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-12 rounded-2xl overflow-hidden shadow-xl">
          <div className="relative h-[500px] w-full overflow-hidden">
            <Image
              src={imagesForDisplay[activeImageIndex] || DEFAULT_IMAGE}
              alt="Property view"
              fill
              className="object-cover"
              priority
            />
          </div>
          {imagesForDisplay.length > 1 && (
            <ScrollArea className="w-full whitespace-nowrap bg-white/80 backdrop-blur-sm">
              <div className="flex p-6 gap-4">
                {imagesForDisplay.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`relative h-24 w-40 flex-shrink-0 rounded-lg overflow-hidden transition-all duration-200 ${
                      activeImageIndex === index
                        ? "ring-4 ring-teal-500 ring-offset-2"
                        : "hover:ring-2 hover:ring-teal-300"
                    }`}
                  >
                    <Image src={image || DEFAULT_IMAGE} alt={`View ${index + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Property Details */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="rounded-xl shadow-lg overflow-hidden bg-white/50 backdrop-blur-sm">
              <CardHeader className="px-8 pt-8">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl text-slate-800 mb-2">
                      {accommodation.property_type} in {accommodation.location.city}
                    </CardTitle>
                    <CardDescription className="text-lg text-slate-500">
                      Hosted by {accommodation.host.name}
                    </CardDescription>
                  </div>
                  <div className="p-4 bg-teal-100 rounded-full">
                    <span className="font-semibold text-teal-700">{accommodation.host.name.charAt(0)}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <p className="text-lg leading-relaxed text-slate-600">{accommodation.description}</p>
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-lg overflow-hidden bg-white/50 backdrop-blur-sm">
              <CardHeader className="px-8 pt-8">
                <CardTitle className="text-2xl text-slate-800">Amenities</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {accommodation.amenities.map((amenity, index) => {
                    // Get the icon component for this amenity, or use a default
                    const IconComponent = amenityIcons[amenity] || Wifi

                    return (
                      <TooltipProvider key={index}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/80 hover:bg-teal-50 transition-colors duration-200 cursor-pointer">
                              <IconComponent className="h-6 w-6 text-teal-600" />
                              <span className="text-slate-700 font-medium">{amenity}</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="bg-slate-800 text-white">
                            <p>{amenity}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Reviews Section */}
            {accommodation.reviews && accommodation.reviews.length > 0 && (
              <Card className="rounded-xl shadow-lg overflow-hidden bg-white/50 backdrop-blur-sm">
                <CardHeader className="px-8 pt-8">
                  <CardTitle className="text-2xl text-slate-800">Reviews</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <div className="space-y-6">
                    {accommodation.reviews.map((review, index) => (
                      <div key={index} className="p-4 bg-white rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-slate-800">{review.user}</span>
                          <span className="text-sm text-slate-500">{new Date(review.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-${i < review.rating ? "yellow" : "gray"}-500`}>
                              ★
                            </span>
                          ))}
                        </div>
                        <p className="text-slate-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Booking Section */}
          <div>
            <Card className="sticky top-24 rounded-xl shadow-xl overflow-hidden bg-white">
              <CardHeader className="bg-gradient-to-r from-teal-600 to-blue-600 p-8">
                <CardTitle className="text-3xl text-white">
                  ${accommodation.price_per_night} <span className="text-xl font-normal text-teal-100">per night</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8 p-8">
                <Calendar
                  mode="range"
                  selected={selectedDates}
                  onSelect={setSelectedDates}
                  className="rounded-xl border-none shadow-md"
                  classNames={{
                    day_selected:
                      "bg-gradient-to-r from-teal-600 to-blue-600 text-white hover:from-teal-700 hover:to-blue-700",
                    day_today: "bg-teal-50 text-teal-900 font-bold",
                  }}
                  disabled={(date) => {
                    const from = new Date(accommodation.availability.from)
                    const to = new Date(accommodation.availability.to)
                    return date < from || date > to
                  }}
                />

                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-700">Number of Guests</label>
                  <Select value={guestCount} onValueChange={setGuestCount}>
                    <SelectTrigger className="w-full rounded-lg border-slate-200 focus:ring-teal-500">
                      <SelectValue placeholder="Select number of guests" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {[...Array(4)].map((_, i) => (
                        <SelectItem key={i} value={(i + 1).toString()} className="focus:bg-teal-50">
                          {i + 1} guest{i !== 0 ? "s" : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  className="w-full h-12 text-lg bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white shadow-lg rounded-lg"
                  onClick={handleBookNow}
                >
                  Book Now
                </Button>

                <p className="text-center text-sm text-slate-500">You won't be charged yet</p>

                {selectedDates && selectedDates.from && selectedDates.to && (
                  <>
                    <Separator className="bg-slate-100" />
                    <div className="space-y-4">
                      {(() => {
                        const from = new Date(selectedDates.from)
                        const to = new Date(selectedDates.to)
                        const nights = Math.round((to - from) / (1000 * 60 * 60 * 24))
                        const subtotal = accommodation.price_per_night * nights
                        const cleaningFee = 50
                        const serviceFee = Math.round(subtotal * 0.12)
                        const total = subtotal + cleaningFee + serviceFee

                        return (
                          <>
                            <div className="flex justify-between text-slate-700">
                              <span>
                                ${accommodation.price_per_night} x {nights} night{nights !== 1 ? "s" : ""}
                              </span>
                              <span>${subtotal}</span>
                            </div>
                            <div className="flex justify-between text-slate-700">
                              <span>Cleaning fee</span>
                              <span>${cleaningFee}</span>
                            </div>
                            <div className="flex justify-between text-slate-700">
                              <span>Service fee</span>
                              <span>${serviceFee}</span>
                            </div>
                            <Separator className="bg-slate-100" />
                            <div className="flex justify-between text-xl font-bold text-slate-800">
                              <span>Total</span>
                              <span>${total}</span>
                            </div>
                          </>
                        )
                      })()}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

