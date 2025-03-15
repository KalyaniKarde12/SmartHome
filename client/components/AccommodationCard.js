"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, Star } from "lucide-react"

export function AccommodationCard({ accommodation, onBooking, onFavorite }) {
  const [isFavorite, setIsFavorite] = useState(false)
  
  const handleFavoriteClick = () => {
    const newStatus = !isFavorite
    setIsFavorite(newStatus)
    onFavorite(accommodation.id, newStatus)
  }
  
  return (
    <Card className="overflow-hidden w-full max-w-sm transition-shadow duration-200 hover:shadow-lg border-indigo-100 bg-gradient-to-br from-sky-50 to-indigo-50">
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
          <span className="sr-only">Add to favorites</span>
        </Button>
        
        {accommodation.discount && (
          <Badge className="absolute top-2 left-2 bg-gradient-to-r from-indigo-500 to-sky-500 text-white border-0 hover:from-indigo-600 hover:to-sky-600">
            {accommodation.discount}% OFF
          </Badge>
        )}
        
        {accommodation.platform && (
          <Badge variant="outline" className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm text-indigo-700 border-indigo-200">
            {accommodation.platform}
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold line-clamp-1 bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-sky-600">{accommodation.title}</h3>
          <div className="flex items-center gap-1 text-sm">
            <Star className="text-amber-500 fill-amber-500" size={16} />
            <span className="font-medium">{accommodation.rating}</span>
            <span className="text-gray-500">({accommodation.reviews})</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-indigo-600 mb-4">
          <MapPin size={16} />
          <span className="text-sm truncate">{accommodation.location}</span>
        </div>
        
        <div className="text-right">
          <span className="text-xl font-bold text-sky-700">${accommodation.price}</span>
          <span className="text-indigo-400 text-sm"> /night</span>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full bg-gradient-to-r from-indigo-600 to-sky-500 hover:from-indigo-700 hover:to-sky-600 border-0 text-white" 
          onClick={() => onBooking(accommodation.id)}
        >
          Book now
        </Button>
      </CardFooter>
    </Card>
  )
}