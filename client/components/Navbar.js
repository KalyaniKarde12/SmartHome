"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Building } from "lucide-react"
import Link from "next/link"

export const Navbar = ({ onLoginClick }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container mx-auto px-4 flex h-20 items-center justify-between">
        <div className="flex items-center gap-2">
          <Building className="h-6 w-6 text-indigo-600" />
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">
            AccommoFind
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="#" className="text-med font-medium transition-colors hover:text-indigo-600">
            Home
          </Link>
          <Link href="#" className="text-med font-medium transition-colors hover:text-indigo-600">
            Listings
          </Link>
          <Link href="#" className="text-med font-medium transition-colors hover:text-indigo-600">
            How it works
          </Link>
          <Link href="#" className="text-med font-medium transition-colors hover:text-indigo-600">
            About
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onLoginClick}
            className="text-slate-700 hover:text-indigo-600 hover:bg-indigo-50"
          >
            Sign in
          </Button>
          <Button
            size="sm"
            onClick={onLoginClick}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Sign up
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Navbar