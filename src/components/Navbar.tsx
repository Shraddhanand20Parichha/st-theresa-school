
'use client';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Academics', path: '/academics' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'Gallery', path: '/gallery' },
  ];

  return (
    <nav className="bg-white shadow-md border-b-4 border-accent relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center" onClick={closeMobileMenu}>
              <span className="font-extrabold text-xl sm:text-2xl text-primary tracking-tight">St. Theresa School</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.path} 
                className={`${pathname === link.path ? 'text-primary font-bold border-b-2 border-primary' : 'text-gray-700 hover:text-primary'} px-1 py-2 text-sm font-medium transition-all duration-200 mt-1`}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/cbse-disclosure" 
              className="bg-primary hover:bg-primary-light text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              CBSE Mandatory Disclosure
            </Link>
          </div>

          {/* Mobile menu button (Hamburger) */}
          <div className="flex items-center lg:hidden">
            <button 
              type="button" 
              className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-primary-light hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors"
              aria-expanded="false"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed. */}
              <svg className={`h-6 w-6 ${isMobileMenuOpen ? 'hidden' : 'block'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Icon when menu is open. */}
              <svg className={`h-6 w-6 ${isMobileMenuOpen ? 'block' : 'hidden'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div className={`lg:hidden absolute w-full bg-white shadow-xl transition-all duration-300 ease-in-out origin-top border-b border-gray-200 ${isMobileMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}>
        <div className="px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.path} 
              className={`block px-3 py-3 rounded-md text-base font-medium transition-colors ${pathname === link.path ? 'bg-blue-50 text-primary font-bold' : 'text-gray-900 hover:bg-gray-50 hover:text-primary'}`}
              onClick={closeMobileMenu}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 mt-2 border-t border-gray-100">
             <Link 
                href="/cbse-disclosure" 
                className="w-full text-center block bg-accent hover:bg-accent-light text-primary border border-transparent px-3 py-3 rounded-md text-base font-bold shadow-sm transition-colors"
                onClick={closeMobileMenu}
              >
                CBSE Mandatory Disclosure
              </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
