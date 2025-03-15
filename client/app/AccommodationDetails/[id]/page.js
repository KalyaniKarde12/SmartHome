"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { School as Pool, Wifi, Tv, Car, UtensilsCrossed, Wind, Eye, WashingMachine, Building } from "lucide-react";

// Mock data - in a real application, this would come from an API
const accommodationData = {
  id: "luxury-beach-villa",
  name: "Luxury Beach Villa",
  location: "Malibu, California",
  price: 350,
  rating: 4.9,
  reviewCount: 127,
  description: "Experience luxury living in this stunning beachfront villa with panoramic ocean views. This spacious 3-bedroom property features modern amenities, a private pool, and direct beach access.",
  longDescription: "Nestled on the pristine shores of Malibu, this luxury beach villa offers an unparalleled vacation experience. Wake up to the sound of waves and enjoy breathtaking sunsets from your private terrace. The open-concept living space seamlessly blends indoor and outdoor living, with floor-to-ceiling windows that frame the Pacific Ocean. Recently renovated with high-end finishes, this property combines coastal charm with modern luxury.",
  bedrooms: 3,
  bathrooms: 2.5,
  maxGuests: 6,
  amenities: [
    { name: "Private Pool", icon: Pool },
    { name: "Ocean View", icon: Eye },
    { name: "Free WiFi", icon: Wifi },
    { name: "Air Conditioning", icon: Wind },
    { name: "Full Kitchen", icon: UtensilsCrossed },
    { name: "Smart TV", icon: Tv },
    { name: "Washer/Dryer", icon: WashingMachine },
    { name: "Free Parking", icon: Car },
  ],
  images: [
    "https://res.cloudinary.com/ddlynwvob/image/upload/v1742036415/photo-1590381105924-c72589b9ef3f_rbuzlh.jpg",
    "https://res.cloudinary.com/ddlynwvob/image/upload/v1742036678/modern-multi-condos-building-blocks_k2qkja.jpg",
    "https://res.cloudinary.com/ddlynwvob/image/upload/v1742036595/premium_photo-1678297270408-c759a1eb6010_vafdzq.jpg",
    "https://res.cloudinary.com/ddlynwvob/image/upload/v1742036670/photo-1574362848149-11496d93a7c7_e7hlah.jpg",
  
    
  ],
  host: {
    name: "Sarah Johnson",
    superhost: true,
    responseRate: 99,
    responseTime: "within an hour",
    joinedDate: "January 2018",
    profileImage: "https://res.cloudinary.com/kunalstorage/image/upload/v1742048236/ai-generated-portrait-of-successful-and-happy-businesswoman-office-worker-smiling-and-looking-at-camera-with-crossed-arms-working-inside-modern-office-photo_th8a4a.jpg"
  },
  availability: [
    { date: "2025-03-20", available: true },
    { date: "2025-03-21", available: true },
    { date: "2025-03-22", available: true },
    { date: "2025-03-23", available: false },
    { date: "2025-03-24", available: false },
    { date: "2025-03-25", available: true },
    { date: "2025-03-26", available: true },
  ]
};

export default function AccommodationDetails() {
  const router = useRouter();
  const [selectedDates, setSelectedDates] = useState();
  const [guestCount, setGuestCount] = useState("2");
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // In a real app, you would fetch data based on the ID
  const accommodation = accommodationData;

  const handleBookNow = () => {
    console.log("Booking request:", {
      accommodationId: accommodation.id,
      selectedDates,
      guestCount
    });
    // In a real app, you would submit this to an API
    alert("Booking request submitted!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
        <div className="container mx-auto px-6 flex h-16 items-center">
          <div className="mr-4 flex">
            <a className="mr-6 flex items-center space-x-2" href="/">
            <Building className="h-6 w-6 text-indigo-600" />
              <span className="font-bold text-2xl bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">AccommoFind</span>
            </a>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <Button variant="ghost" className="text-slate-600 hover:text-teal-600 hover:bg-teal-50">Sign In</Button>
            <Button className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white shadow-md">Sign Up</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {/* Property Header */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">{accommodation.name}</h1>
          <div className="flex items-center gap-4 text-slate-600">
            <Badge variant="secondary" className="bg-teal-100 text-teal-700 hover:bg-teal-200">
              ★ {accommodation.rating}
            </Badge>
            <span>({accommodation.reviewCount} reviews)</span>
            <span>•</span>
            <span>{accommodation.location}</span>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-12 rounded-2xl overflow-hidden shadow-xl">
          <div className="relative h-[600px] w-full overflow-hidden">
            <Image
              src={accommodation.images[activeImageIndex]}
              alt="Property view"
              fill
              className="object-cover"
              priority
            />
          </div>
          <ScrollArea className="w-full whitespace-nowrap bg-white/80 backdrop-blur-sm">
            <div className="flex p-6 gap-4">
              {accommodation.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative h-24 w-40 flex-shrink-0 rounded-lg overflow-hidden transition-all duration-200 ${
                    activeImageIndex === index ? "ring-4 ring-teal-500 ring-offset-2" : "hover:ring-2 hover:ring-teal-300"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`View ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Property Details */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="rounded-xl shadow-lg overflow-hidden bg-white/50 backdrop-blur-sm">
              <CardHeader className="px-8 pt-8">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl text-slate-800 mb-2">
                      {accommodation.bedrooms} bedroom villa hosted by {accommodation.host.name}
                    </CardTitle>
                    <CardDescription className="text-lg text-slate-500">
                      {accommodation.maxGuests} guests • {accommodation.bedrooms} bedrooms • {accommodation.bathrooms} bathrooms
                    </CardDescription>
                  </div>
                  <div className="relative h-16 w-16">
                    <Image
                      src={accommodation.host.profileImage}
                      alt={accommodation.host.name}
                      fill
                      className="rounded-full object-cover ring-4 ring-teal-100"
                    />
                    {accommodation.host.superhost && (
                      <Badge
                        variant="destructive"
                        className="absolute -bottom-2 -right-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
                      >
                        S
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <p className="text-lg leading-relaxed text-slate-600">{accommodation.longDescription}</p>
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-lg overflow-hidden bg-white/50 backdrop-blur-sm">
              <CardHeader className="px-8 pt-8">
                <CardTitle className="text-2xl text-slate-800">Amenities</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {accommodation.amenities.map((amenity, index) => (
                    <TooltipProvider key={index}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-3 p-4 rounded-xl bg-white/80 hover:bg-teal-50 transition-colors duration-200 cursor-pointer">
                            <amenity.icon className="h-6 w-6 text-teal-600" />
                            <span className="text-slate-700 font-medium">{amenity.name}</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="bg-slate-800 text-white">
                          <p>{amenity.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Section */}
          <div>
            <Card className="sticky top-24 rounded-xl shadow-xl overflow-hidden bg-white">
              <CardHeader className="bg-gradient-to-r from-teal-600 to-blue-600 p-8">
                <CardTitle className="text-3xl text-white">${accommodation.price} <span className="text-xl font-normal text-teal-100">per night</span></CardTitle>
              </CardHeader>
              <CardContent className="space-y-8 p-8">
                <Calendar
                  mode="single"
                  selected={selectedDates}
                  onSelect={setSelectedDates}
                  className="rounded-xl border-none shadow-md"
                  classNames={{
                    day_selected: "bg-gradient-to-r from-teal-600 to-blue-600 text-white hover:from-teal-700 hover:to-blue-700",
                    day_today: "bg-teal-50 text-teal-900 font-bold",
                  }}
                />

                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-700">Number of Guests</label>
                  <Select value={guestCount} onValueChange={setGuestCount}>
                    <SelectTrigger className="w-full rounded-lg border-slate-200 focus:ring-teal-500">
                      <SelectValue placeholder="Select number of guests" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {[...Array(accommodation.maxGuests)].map((_, i) => (
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

                <p className="text-center text-sm text-slate-500">
                  You won't be charged yet
                </p>

                {selectedDates && (
                  <>
                    <Separator className="bg-slate-100" />
                    <div className="space-y-4">
                      <div className="flex justify-between text-slate-700">
                        <span>${accommodation.price} x 3 nights</span>
                        <span>${accommodation.price * 3}</span>
                      </div>
                      <div className="flex justify-between text-slate-700">
                        <span>Cleaning fee</span>
                        <span>$75</span>
                      </div>
                      <div className="flex justify-between text-slate-700">
                        <span>Service fee</span>
                        <span>$50</span>
                      </div>
                      <Separator className="bg-slate-100" />
                      <div className="flex justify-between text-xl font-bold text-slate-800">
                        <span>Total</span>
                        <span>${(accommodation.price * 3) + 75 + 50}</span>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="bg-slate-50 mt-24">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h4 className="font-semibold text-xl mb-6 text-slate-800">About StayLuxe</h4>
              <ul className="space-y-4">
                <li><Button variant="link" className="text-teal-600 hover:text-teal-700 p-0">How it works</Button></li>
                <li><Button variant="link" className="text-teal-600 hover:text-teal-700 p-0">Careers</Button></li>
                <li><Button variant="link" className="text-teal-600 hover:text-teal-700 p-0">Press</Button></li>
                <li><Button variant="link" className="text-teal-600 hover:text-teal-700 p-0">Policies</Button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-xl mb-6 text-slate-800">Support</h4>
              <ul className="space-y-4">
                <li><Button variant="link" className="text-teal-600 hover:text-teal-700 p-0">Help Center</Button></li>
                <li><Button variant="link" className="text-teal-600 hover:text-teal-700 p-0">Safety information</Button></li>
                <li><Button variant="link" className="text-teal-600 hover:text-teal-700 p-0">Cancellation options</Button></li>
                <li><Button variant="link" className="text-teal-600 hover:text-teal-700 p-0">Report a concern</Button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-xl mb-6 text-slate-800">Connect</h4>
              <div className="flex gap-4">
                <Button variant="ghost" className="bg-white hover:bg-teal-50 text-slate-600 hover:text-teal-600">Facebook</Button>
                <Button variant="ghost" className="bg-white hover:bg-teal-50 text-slate-600 hover:text-teal-600">Twitter</Button>
                <Button variant="ghost" className="bg-white hover:bg-teal-50 text-slate-600 hover:text-teal-600">Instagram</Button>
              </div>
            </div>
          </div>
          <Separator className="my-12 bg-slate-200" />
          <p className="text-center text-sm text-slate-500">
            © 2025 StayLuxe, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}