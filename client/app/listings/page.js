import { Suspense } from "react";
import { ListingsGrid } from "./listings-grid";
import { ListingsFilters } from "./listings-filters";
import { ListingsSkeleton } from "./listings-skeleton";

export default function ListingsPage({ searchParams }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <ListingsFilters />
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Available Accommodations</h1>
          <Suspense fallback={<ListingsSkeleton />}>
            <ListingsGrid searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}