"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Building, Menu, X, ChevronDown, Search } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"

export const Navbar = ({ onLoginClick }) => {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Check if a link is active
  const isActive = (path) => {
    return pathname === path
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b backdrop-blur transition-all duration-200 ${
        isScrolled
          ? "bg-white/95 supports-[backdrop-filter]:bg-white/80 shadow-md"
          : "bg-white/80 supports-[backdrop-filter]:bg-white/60 shadow-sm"
      }`}
    >
      <div className="container mx-auto px-4 flex h-20 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <Building className="h-6 w-6 text-teal-600" />
          <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
            AccommoFind
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className={`text-medium font-medium transition-colors hover:text-teal-600 relative ${
              isActive("/") ? "text-teal-600" : "text-slate-700"
            }`}
          >
            Home
            {isActive("/") && <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-teal-600 rounded-full" />}
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 border-0 text-medium font-medium transition-colors hover:text-teal-600">
              <span className={isActive("/listings") ? "text-teal-600 border-0" : "text-slate-700 border-0"}>Listings</span>
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-48 bg-white">
              <DropdownMenuItem asChild>
                <Link href="/listings/apartments" className="cursor-pointer">
                  Apartments
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/listings/houses" className="cursor-pointer">
                  Houses
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/listings/villas" className="cursor-pointer">
                  Villas
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/listings" className="cursor-pointer font-medium">
                  View All
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href="/how-it-works"
            className={`text-medium font-medium transition-colors hover:text-teal-600 relative ${
              isActive("/how-it-works") ? "text-teal-600" : "text-slate-700"
            }`}
          >
            How it works
            {isActive("/how-it-works") && (
              <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-teal-600 rounded-full" />
            )}
          </Link>

          <Link
            href="/about"
            className={`text-medium font-medium transition-colors hover:text-teal-600 relative ${
              isActive("/about") ? "text-teal-600" : "text-slate-700"
            }`}
          >
            About
            {isActive("/about") && (
              <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-teal-600 rounded-full" />
            )}
          </Link>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onLoginClick}
            className="text-slate-700 hover:text-teal-600 hover:bg-teal-50 border-slate-200"
          >
            Sign in
          </Button>
          <Button
            size="sm"
            onClick={onLoginClick}
            className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white"
          >
            Sign up
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="flex md:hidden items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search"
            className="text-slate-700 hover:text-teal-600 hover:bg-teal-50"
          >
            <Search className="h-5 w-5" />
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Menu"
                className="text-slate-700 hover:text-teal-600 hover:bg-teal-50"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between py-4 border-b">
                  <div className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-teal-600" />
                    <span className="text-lg font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                      AccommoFind
                    </span>
                  </div>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" aria-label="Close">
                      <X className="h-5 w-5" />
                    </Button>
                  </SheetClose>
                </div>

                <nav className="flex flex-col gap-1 py-6">
                  <SheetClose asChild>
                    <Link
                      href="/"
                      className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                        isActive("/") ? "bg-teal-50 text-teal-600" : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      Home
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link
                      href="/listings"
                      className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                        isActive("/listings") ? "bg-teal-50 text-teal-600" : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      Listings
                    </Link>
                  </SheetClose>

                  <div className="px-4 py-1">
                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Property Types</div>
                  </div>

                  <SheetClose asChild>
                    <Link
                      href="/listings/apartments"
                      className="flex items-center px-8 py-2 text-sm text-slate-600 hover:text-teal-600"
                    >
                      Apartments
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link
                      href="/listings/houses"
                      className="flex items-center px-8 py-2 text-sm text-slate-600 hover:text-teal-600"
                    >
                      Houses
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link
                      href="/listings/villas"
                      className="flex items-center px-8 py-2 text-sm text-slate-600 hover:text-teal-600"
                    >
                      Villas
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link
                      href="/how-it-works"
                      className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                        isActive("/how-it-works") ? "bg-teal-50 text-teal-600" : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      How it works
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link
                      href="/about"
                      className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                        isActive("/about") ? "bg-teal-50 text-teal-600" : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      About
                    </Link>
                  </SheetClose>
                </nav>

                <div className="mt-auto border-t py-6 space-y-4">
                  <SheetClose asChild>
                    <Button variant="outline" className="w-full text-slate-700 border-slate-200" onClick={onLoginClick}>
                      Sign in
                    </Button>
                  </SheetClose>

                  <SheetClose asChild>
                    <Button
                      className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white"
                      onClick={onLoginClick}
                    >
                      Sign up
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export default Navbar

