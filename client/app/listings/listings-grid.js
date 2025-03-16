import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

// This would typically come from your database
const MOCK_LISTINGS = [
  {
    id: "1",
    title: "Luxury Beachfront Villa",
    location: "Malibu, CA",
    price: 599,
    rating: 4.9,
    image: "/placeholder.svg?height=300&width=400",
    type: "Villa",
  },
  // Add more mock listings...
];

export function ListingsGrid({ searchParams }) {
  const page = Number(searchParams.page) || 1;
  const itemsPerPage = 12;
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const listings = MOCK_LISTINGS.slice(start, end);
  
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {listings.map((listing) => (
        <Link
          key={listing.id}
          href={`/listings/${listing.id}`}
          className="group rounded-lg border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="aspect-video relative overflow-hidden rounded-t-lg">
            <Image
              src={listing.image || "/placeholder.svg"}
              alt={listing.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold">{listing.title}</p>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="text-sm">{listing.rating}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{listing.location}</p>
            <p className="mt-2 font-semibold">
              ${listing.price} <span className="text-sm font-normal">/ night</span>
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}