"use client"
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FiSearch, FiUser, FiMapPin, FiCalendar, FiUsers } from 'react-icons/fi';
import AccommodationTypesDropdown from './AccommodationTypesDropdown';

const Navbar = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="ml-2 text-teal-500 font-bold text-xl">AccommoFind</span>
            </Link>

            <nav className="hidden md:ml-6 md:flex md:space-x-8">
              <Link href="/" className="text-gray-900 border-b-2 border-teal-500 px-1 pt-1 font-medium text-sm">
                Home
              </Link>
              <div className="relative">
                <Link href="/listings" className="text-gray-500 hover:text-gray-700 px-1 pt-1 font-medium text-sm flex items-center">
                  Listings
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
              </div>
              {/* Add Accommodation Types Dropdown here */}
              <AccommodationTypesDropdown />
              <Link href="/how-it-works" className="text-gray-500 hover:text-gray-700 px-1 pt-1 font-medium text-sm">
                How it works
              </Link>
            </nav>
          </div>

          {/* Rest of the Navbar component remains the same */}
          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-3xl mx-4 justify-center">
            <div className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center px-4 py-2 border-r border-gray-300">
                <FiMapPin className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="w-full bg-transparent border-none outline-none text-sm text-gray-600"
                />
              </div>
              <div className="flex items-center px-4 py-2 border-r border-gray-300">
                <FiCalendar className="text-gray-400 mr-2" />
                <span className="text-sm text-gray-500">Select dates</span>
              </div>
              <div className="flex items-center px-4 py-2">
                <FiUsers className="text-gray-400 mr-2" />
                <span className="text-sm text-gray-500">2 guests</span>
              </div>
              <button className="bg-teal-500 hover:bg-teal-600 transition-colors m-1 p-2 rounded-full">
                <FiSearch className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>

          {/* Mobile Search Button */}
          <div className="flex lg:hidden">
            <button className="bg-gray-100 p-2 rounded-full">
              <FiSearch className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* Profile */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center space-x-2 border border-gray-300 rounded-full p-1 hover:shadow-md transition-shadow"
            >
              <div className="p-1">
                <FiUser className="h-5 w-5 text-gray-600" />
              </div>
            </button>
            
            {/* Profile Dropdown */}
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                <Link href="/signin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Sign In
                </Link>
                <Link href="/signup" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Sign Up
                </Link>
                <div className="border-t border-gray-100 my-1"></div>
                <Link href="/help" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Help
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="block lg:hidden border-t border-gray-200 py-4 px-4">
        <div className="flex items-center justify-between space-x-2 text-sm">
          <div className="flex-1 border border-gray-300 rounded-lg p-2">
            <div className="flex items-center">
              <FiMapPin className="text-gray-400 mr-2" />
              <span className="text-gray-500">Location</span>
            </div>
          </div>
          <div className="flex-1 border border-gray-300 rounded-lg p-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FiCalendar className="text-gray-400 mr-2" />
                <span className="text-gray-500">Check-in / Check-out</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex-1 border border-gray-300 rounded-lg p-2">
            <div className="flex items-center">
              <FiUsers className="text-gray-400 mr-2" />
              <span className="text-gray-500">Guests</span>
            </div>
          </div>
          <button className="ml-2 bg-teal-500 hover:bg-teal-600 transition-colors text-white p-2 rounded-lg flex items-center">
            <FiSearch className="h-5 w-5 mr-1" />
            <span>Search</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;