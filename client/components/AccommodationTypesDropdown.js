"use client"
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FiChevronDown } from 'react-icons/fi';

const AccommodationTypesDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const accommodationTypes = [
    { name: 'Hotels', path: '/listings/hotels' },
    { name: 'Vacation Rentals', path: '/listings/vacation-rentals' },
    { name: 'Hostels', path: '/listings/hostels' },
    { name: 'Resorts', path: '/listings/resorts' },
    { name: 'Bed & Breakfasts', path: '/listings/bed-and-breakfasts' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  return (
    <div 
      className="relative" 
      ref={dropdownRef}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center cursor-pointer text-gray-500 hover:text-gray-700 px-1 pt-1 font-medium text-sm focus:outline-none"
        onMouseEnter={() => setIsOpen(true)}
      >
        Accommodation Types
        <FiChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div 
          className="absolute left-0 mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 py-1 transition-all duration-150 ease-in-out"
          onMouseLeave={() => setIsOpen(false)}
        >
          {accommodationTypes.map((type) => (
            <Link 
              href={type.path} 
              key={type.name}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-500 transition-colors duration-150"
              onClick={() => setIsOpen(false)}
            >
              {type.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccommodationTypesDropdown;