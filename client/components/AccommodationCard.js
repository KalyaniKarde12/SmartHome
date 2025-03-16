"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, MapPin, Star } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export function AccommodationCard({ accommodation, onBooking, onFavorite }) {
  const router = useRouter()
  const [isFavorite, setIsFavorite] = useState(false)
  
  const handleFavoriteClick = (e) => {
    e.stopPropagation()
    
    const newStatus = !isFavorite
    setIsFavorite(newStatus)
    onFavorite(accommodation._id, newStatus)
  }
  
  const handleCardClick = () => {
    router.push(`/accomodations/${accommodation._id}`)
  }

  return (
    <Card
      className="overflow-hidden w-full max-w-sm transition-shadow duration-200 hover:shadow-lg border-gray-200 bg-white cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative">
        <Image
          src={accommodation?.images[0] || "/placeholder.jpg"}
          alt={accommodation.title || "Accommodation"}
          width={800}
          height={500}
          className="w-full h-52 object-cover"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white/90"
          onClick={handleFavoriteClick}
        >
          <Heart className={isFavorite ? "text-rose-500 fill-rose-500" : "text-gray-500"} size={20} />
        </Button>
      </div>
      
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold line-clamp-1 text-gray-900">{accommodation.title}</h3>
        <div className="flex items-center gap-1 text-gray-600 mb-2">
          <MapPin size={16} />
          <span className="text-sm truncate">{accommodation.location?.city}, </span>
          <span className="text-sm truncate">{accommodation.location?.country}</span>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-700">
          <span className="font-bold text-lg text-indigo-600">₹{accommodation?.price_per_night || "N/A"}</span>
          <div className="flex items-center gap-1">
            <Star size={16} className="text-yellow-500" />
            <span>{accommodation.rating || "No rating"}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          onClick={(e) => {
            e.stopPropagation()
            onBooking(accommodation._id)
          }}
        >
          Book Now
        </Button>
      </CardFooter>
    </Card>
  )
}