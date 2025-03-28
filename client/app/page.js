"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Building, HomeIcon, Hotel, Star, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { accommodationsData } from "@/lib/data"
import { AccommodationCard } from "@/components/AccommodationCard"
import { useRouter } from "next/navigation"
import { getAccommodationById, getAccommodations } from "@/lib/actions/accomodationActions"
import Footer from "@/components/footer"

export default function HomePage() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [selectedAccommodation, setSelectedAccommodation] = useState(null)
  const router = useRouter()
  const [accommodations, setAccommodations] = useState([])

  const handleBooking = (accommodationId) => {
    setSelectedAccommodation(accommodationId)
    setShowLoginModal(true)
  }

  const handleFavorite = (accommodationId, status) => {
    console.log(`Accommodation ${accommodationId} favorite status: ${status}`)
    // In a real app, you would update this in your state management or database
  }

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const data = await getAccommodations();
        setAccommodations(data); 
      } catch (error) {
        console.error("Error fetching accommodations:", error);
      }
    }; fetchAccommodations();
  }, []);

  console.log("accommodations:", accommodations);
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-sky-50 to-indigo-50 text-slate-800 w-full overflow-x-hidden">
      {/* Navbar */}

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="relative h-[500px] w-full">
            {/* Lighter gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/30 to-sky-500/30 z-10" />

            {/* Banner Image */}
            <Image
              src="https://res.cloudinary.com/ddlynwvob/image/upload/v1742036937/file-P7Ngqz7jWTRy2PqozNfii4_omcqwz.webp"
              alt="Beautiful accommodations"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="container mx-auto px-4 absolute inset-0 z-20 flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-md">
              Find Your Perfect Stay
            </h1>
            <p className="mt-4 max-w-[700px] text-lg text-white md:text-xl drop-shadow-sm">
              Discover the best accommodations across multiple platforms in one place.
            </p>
          </div>
        </section>

        {/* Featured Accommodations */}
        <section className="container mx-auto px-5 py-7">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">
              Featured Accommodations
            </h2>
            <Button
              variant="outline"
              className="border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300"
            >
              View all
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {accommodations.map((accommodation) => (
              <AccommodationCard
                key={accommodation._id}
                accommodation={accommodation}
                onBooking={handleBooking}
                onFavorite={handleFavorite}
              />
            ))}
          </div>
        </section>

        {/* Popular Destinations */}
        <section className="bg-gradient-to-br from-indigo-50 to-sky-100 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold tracking-tight mb-8 bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">
              Popular Destinations
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["New York", "Paris", "Tokyo", "London"].map((city) => (
                <div
                  key={city}
                  className="relative h-40 rounded-xl overflow-hidden group shadow-md transition-all duration-300 hover:shadow-xl"
                >
                  <Image
                    src={`/placeholder.svg?height=160&width=300&text=${city}`}
                    alt={city}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 to-sky-700/30 flex items-end p-4">
                    <h3 className="text-white font-bold text-xl">{city}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12 bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">
            What Our Users Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                location: "New York, USA",
                text: "AccommoFind made it so easy to compare prices across different platforms. I saved over $200 on my last vacation!",
              },
              {
                name: "David Chen",
                location: "Toronto, Canada",
                text: "The AI recommendations were spot on! Found a perfect boutique hotel that wasn't even on my radar.",
              },
              {
                name: "Emma Williams",
                location: "London, UK",
                text: "I love how I can apply specific filters across all platforms at once. Such a time saver!",
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="text-center p-6 shadow-sm border-0 bg-white rounded-xl hover:shadow-md transition-all"
              >
                <div className="flex justify-center mb-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-indigo-100 ring-offset-2">
                    <Image
                      src={`/placeholder.svg?height=64&width=64&text=${testimonial.name.charAt(0)}`}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex justify-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 mb-4 italic">"{testimonial.text}"</p>
                <p className="font-semibold text-slate-800">{testimonial.name}</p>
                <p className="text-sm text-slate-500">{testimonial.location}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-indigo-600 to-sky-500 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-white">Ready to Find Your Perfect Stay?</h2>
            <p className="max-w-2xl mx-auto mb-8 text-white/90">
              Join thousands of travelers who save time and money by using AccommoFind to discover the best
              accommodations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => setShowLoginModal(true)}
                className="bg-white text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 shadow-md"
              >
                Sign Up Now
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                Explore Listings
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12 bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">
            How AccommoFind Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Search Across Platforms",
                description:
                  "We aggregate listings from multiple booking sites so you don't have to check them individually.",
              },
              {
                title: "Compare & Filter",
                description: "Apply detailed filters across all results and compare prices to find the best deals.",
              },
              {
                title: "Book with Confidence",
                description: "Get AI-powered recommendations and book directly through the original platform.",
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-r from-indigo-500 to-sky-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md shadow-indigo-500/20">
                  <span className="text-2xl font-bold text-white">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-800">{step.title}</h3>
                <p className="text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer/>

      {/* Login/Signup Modal */}
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-slate-800">Authentication Required</DialogTitle>
            <DialogDescription className="text-slate-600">
              {selectedAccommodation
                ? "Please log in or sign up to proceed with booking."
                : "Please log in or sign up to access your account."}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <Button onClick={() => setShowLoginModal(false)} className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Log In
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowLoginModal(false)}
              className="border-slate-200 text-slate-800 hover:bg-slate-50 hover:text-indigo-600"
            >
              Sign Up
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}