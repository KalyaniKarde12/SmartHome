"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Star, Users, Bed, Bath } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ListingsGrid({ listings = [] }) {
  const [visibleListings, setVisibleListings] = useState(6)

  const loadMore = () => {
    setVisibleListings((prev) => prev + 6)
  }

  if (listings.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-slate-800 mb-2">No listings found</h3>
        <p className="text-slate-600">Try adjusting your search or check back later.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {listings.slice(0, visibleListings).map((listing) => (
          <Link href={`/accommodations/${listing._id}`} key={listing._id}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
              <div className="relative h-64 w-full">
                <Image
                  src={listing.images[0] || "/placeholder.svg?height=400&width=600"}
                  alt={listing.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-sm font-medium text-teal-700 flex items-center">
                  <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                  {listing.rating}
                </div>
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className="text-xl">{listing.title}</CardTitle>
                  <span className="font-bold text-teal-600">${listing.price_per_night}/night</span>
                </div>
                <CardDescription className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" /> {listing.location.city}, {listing.location.address}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-4 flex-1">
                <p className="text-slate-600 text-sm line-clamp-2 mb-3">{listing.description}</p>
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" /> {listing.max_guests} guests
                  </div>
                  <div className="flex items-center">
                    <Bed className="h-4 w-4 mr-1" /> {listing.bedrooms} beds
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-4 w-4 mr-1" /> {listing.bathrooms} baths
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {visibleListings < listings.length && (
        <div className="text-center">
          <Button variant="outline" onClick={loadMore} className="border-teal-600 text-teal-600 hover:bg-teal-50">
            Load More
          </Button>
        </div>
      )}
    </div>
  )
}

