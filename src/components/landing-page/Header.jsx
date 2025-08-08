// src/components/landing-page/Header.jsx
import { Hotel, Moon, User, Menu, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Header = ({ showMobileMenu, setShowMobileMenu }) => (
  <header className="bg-[#1e3a8a] text-white sticky top-0 z-50">
    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold flex items-center">
        <Hotel className="mr-2" />
        HMS Portal
      </div>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-6 items-center">
        <a href="#features" className="hover:underline">Features</a>
        <a href="#rooms" className="hover:underline">Rooms</a>
        <a href="#services" className="hover:underline">Services</a>
        <a href="#testimonials" className="hover:underline">Testimonials</a>
        <button className="text-sm hover:underline flex items-center">
          <Moon className="w-4 h-4 mr-1" />
          Dark Mode
        </button>
        <Link to="/login" className="flex items-center text-sm space-x-1 hover:underline">
          <User className="w-4 h-4" />
          <span>Log in</span>
        </Link>
      </div>
      
      {/* Mobile Menu Button */}
      <button 
        className="md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        <Menu className="w-6 h-6" />
      </button>
    </div>
    
    {/* Mobile Menu */}
    {showMobileMenu && (
      <div className="md:hidden bg-[#1a337a] px-4 py-3 space-y-3">
        <a href="#features" className="block hover:underline">Features</a>
        <a href="#rooms" className="block hover:underline">Rooms</a>
        <a href="#services" className="block hover:underline">Services</a>
        <a href="#testimonials" className="block hover:underline">Testimonials</a>
        <div className="flex items-center justify-between pt-2 border-t border-[#2d4a9a]">
          <button className="text-sm hover:underline flex items-center">
            <Moon className="w-4 h-4 mr-1" />
            Dark Mode
          </button>
          <Link to="/login" className="flex items-center text-sm space-x-1 hover:underline">
            <User className="w-4 h-4" />
            <span>Log in</span>
          </Link>
        </div>
      </div>
    )}
  </header>
);