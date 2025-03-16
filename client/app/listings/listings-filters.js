"use client"

import { useSearch } from "@/contexts/search-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function ListingsFilters() {
  const { priceRange, setPriceRange, propertyType, setPropertyType, amenities, setAmenities } = useSearch();
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Price Range</Label>
        <div className="px-2">
          <Slider
            defaultValue={[priceRange.min, priceRange.max]}
            max={1000}
            step={10}
            onValueChange={(value) => setPriceRange({ min: value[0], max: value[1] })}
          />
        </div>
        <div className="flex items-center justify-between text-sm">
          <span>${priceRange.min}</span>
          <span>${priceRange.max}</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Property Type</Label>
        <Select value={propertyType} onValueChange={setPropertyType}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Properties</SelectItem>
            <SelectItem value="house">House</SelectItem>
            <SelectItem value="apartment">Apartment</SelectItem>
            <SelectItem value="villa">Villa</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label>Amenities</Label>
        <div className="space-y-2">
          {["WiFi", "Pool", "Kitchen", "Parking"].map((item) => (
            <label key={item} className="flex items-center gap-2">
              <Input
                type="checkbox"
                checked={amenities.includes(item)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setAmenities([...amenities, item])
                  } else {
                    setAmenities(amenities.filter((a) => a !== item))
                  }
                }}
              />
              {item}
            </label>
          ))}
        </div>
      </div>
      
      <Button className="w-full">Apply Filters</Button>
    </div>
  );
}