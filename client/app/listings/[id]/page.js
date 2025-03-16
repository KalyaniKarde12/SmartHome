import Image from "next/image";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoginDialog } from "./login-dialog";

// This would typically come from your database
const MOCK_LISTING = {
  id: "1",
  title: "Luxury Beachfront Villa",
  location: "Malibu, CA",
  price: 599,
  rating: 4.9,
  description: "A beautiful beachfront villa with stunning ocean views...",
  images: Array(4).fill("/placeholder.svg?height=600&width=800"),
  amenities: ["Pool", "WiFi", "Kitchen", "Parking"],
  reviews: [
    {
      id: "1",
      author: "John Doe",
      rating: 5,
      comment: "Amazing stay! The views were incredible.",
      date: "2024-02-15",
    },
    // Add more reviews...
  ],
};

export default function ListingPage({ params }) {
  if (!MOCK_LISTING) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        {/* Images */}
        <div className="grid gap-4 lg:grid-cols-2">
          {MOCK_LISTING.images.map((image, i) => (
            <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src={image || "/placeholder.svg"}
                alt={`${MOCK_LISTING.title} - Image ${i + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">{MOCK_LISTING.title}</h1>
            <p className="text-muted-foreground">{MOCK_LISTING.location}</p>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <div className="mb-4 flex items-baseline justify-between">
              <div className="text-2xl font-bold">${MOCK_LISTING.price}</div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span>{MOCK_LISTING.rating}</span>
              </div>
            </div>
            <LoginDialog>
              <Button className="w-full">Book Now</Button>
            </LoginDialog>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Description</h2>
            <p className="text-muted-foreground">{MOCK_LISTING.description}</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Amenities</h2>
            <ul className="grid grid-cols-2 gap-2">
              {MOCK_LISTING.amenities.map((amenity) => (
                <li key={amenity} className="text-muted-foreground">
                  {amenity}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Reviews</h2>
            <div className="space-y-4">
              {MOCK_LISTING.reviews.map((review) => (
                <div key={review.id} className="space-y-2 rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{review.author}</div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span>{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                  <p className="text-sm text-muted-foreground">{review.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}