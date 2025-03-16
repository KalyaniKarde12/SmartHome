import Link from "next/link"
import { Building, Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Building className="h-6 w-6 text-teal-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
                AccommoFind
              </span>
            </Link>
            <p className="text-slate-400">
              Find your perfect accommodation with ease. From cozy apartments to luxury villas, we've got you covered.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-slate-400 hover:text-teal-400">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-slate-400 hover:text-teal-400">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-slate-400 hover:text-teal-400">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-slate-400 hover:text-teal-400">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-slate-400 hover:text-teal-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/listings" className="text-slate-400 hover:text-teal-400">
                  Browse Listings
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-slate-400 hover:text-teal-400">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-teal-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-teal-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Property Types</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/listings/apartments" className="text-slate-400 hover:text-teal-400">
                  Apartments
                </Link>
              </li>
              <li>
                <Link href="/listings/houses" className="text-slate-400 hover:text-teal-400">
                  Houses
                </Link>
              </li>
              <li>
                <Link href="/listings/villas" className="text-slate-400 hover:text-teal-400">
                  Villas
                </Link>
              </li>
              <li>
                <Link href="/listings/cabins" className="text-slate-400 hover:text-teal-400">
                  Cabins
                </Link>
              </li>
              <li>
                <Link href="/listings" className="text-slate-400 hover:text-teal-400">
                  View All
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-teal-400 mr-2 mt-0.5" />
                <span className="text-slate-400">support@accommofind.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-teal-400 mr-2 mt-0.5" />
                <span className="text-slate-400">+1 (555) 123-4567</span>
              </li>
              <li className="text-slate-400">
                123 Booking Street
                <br />
                Suite 101
                <br />
                San Francisco, CA 94103
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">&copy; {new Date().getFullYear()} AccommoFind. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/terms" className="text-slate-400 hover:text-teal-400 text-sm">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-slate-400 hover:text-teal-400 text-sm">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="text-slate-400 hover:text-teal-400 text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

