"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, MapPin, Star } from "lucide-react"
import { useState } from "react"

export function AccommodationCard({ accommodation, onBooking, onFavorite }) {
  const router = useRouter()
  const [isFavorite, setIsFavorite] = useState(false)

  const handleCardClick = () => {
    router.push(`/AccommodationDetails/${accommodation.id}`) // Navigate to dynamic route
  }

  const handleFavoriteClick = (e) => {
    e.stopPropagation() 
    const newStatus = !isFavorite
    setIsFavorite(newStatus)
    onFavorite(accommodation.id, newStatus)
  }

  return (
    <Card 
      className="overflow-hidden w-full max-w-sm transition-shadow duration-200 hover:shadow-lg border-indigo-100 bg-gradient-to-br from-sky-50 to-indigo-50 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative">
        <Image 
          src={accommodation.image || "/api/placeholder/800/500"} 
          alt={accommodation.title}
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
        <h3 className="text-lg font-semibold line-clamp-1 text-indigo-700">{accommodation.title}</h3>
        <div className="flex items-center gap-1 text-indigo-600 mb-4">
          <MapPin size={16} />
          <span className="text-sm truncate">{accommodation.location}</span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full bg-gradient-to-r from-indigo-600 to-sky-500 hover:from-indigo-700 hover:to-sky-600 text-white" 
          onClick={(e) => {
            e.stopPropagation() // Prevents navigation when clicking the button
            onBooking(accommodation.id)
          }}
        >
          Book now
        </Button>
      </CardFooter>
    </Card>
  )
}
