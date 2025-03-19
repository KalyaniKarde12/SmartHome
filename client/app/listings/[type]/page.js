import { notFound } from "next/navigation"
import Footer from "@/components/footer"
import ListingsGrid from "@/components/listings-grid"
import { getListingsByType } from "@/lib/actions/accomodationActions"

export async function generateMetadata({ params }) {
  const type = params.type

  // Capitalize and format the type for the title
  const formattedType = type.charAt(0).toUpperCase() + type.slice(1)

  return {
    title: `${formattedType} | AccommoFind`,
    description: `Browse our selection of ${type} for your next stay.`,
  }
}

export default async function ListingTypePage({ params }) {
  const validTypes = ["apartments", "houses", "villas", "cabins"]
  const type = params.type.toLowerCase()

  if (!validTypes.includes(type)) {
    notFound()
  }

  const listings = await getListingsByType(type)

  // Format the type name for display (e.g., "apartments" -> "Apartments")
  const formattedType = type.charAt(0).toUpperCase() + type.slice(1)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onLoginClick={() => {}} />

      <main className="flex-1 bg-slate-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-6">{formattedType}</h1>
          <p className="text-slate-600 mb-8">
            Browse our selection of {listings.length} {type} for your next stay.
          </p>

          <ListingsGrid listings={listings} />
        </div>
      </main>

      <Footer />
    </div>
  )
}

