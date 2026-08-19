import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  MapPin, 
  Phone, 
  Clock, 
  Menu, 
  X, 
  MessageCircle
} from 'lucide-react';
import type { ProductCategory, ShopDetails } from '../types/product';

interface NavbarProps {
  shopInfo: ShopDetails;
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  inStockCount: number;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  shopInfo,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  inStockCount,
  onNavigate
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const categories: ProductCategory[] = [
    'All',
    'Skincare',
    'Makeup',
    'Haircare',
    'Fragrance',
    'Body Care',
    'Sun Care'
  ];

  const handleCategoryClick = (cat: ProductCategory) => {
    onSelectCategory(cat);
    setMobileMenuOpen(false);
    onNavigate('catalog');
  };

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-rose-100/80 shadow-xs transition-all duration-200">
      {/* Top Notification / Store Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-rose-950 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center">
            <span className="inline-flex items-center justify-center p-0.5 rounded-full bg-rose-500/20 text-rose-300">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            </span>
            <span className="font-medium tracking-wide">
              100% Authentic Cosmetics & Skincare • Real-time In-Stock Catalog ({inStockCount} Items Ready to Deliver)
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-stone-300 text-xs">
            <span className="flex items-center gap-1 hover:text-white transition-colors">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              Bole Medhanialem, Addis Ababa
            </span>
            <span className="text-stone-600">•</span>
            <a 
              href={`tel:${shopInfo.phone}`} 
              className="flex items-center gap-1 hover:text-rose-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-rose-400" />
              {shopInfo.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo */}
          <button 
            onClick={() => handleNavClick('hero')} 
            className="flex items-center gap-3 text-left group focus:outline-hidden cursor-pointer"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-500 via-rose-400 to-amber-300 flex items-center justify-center shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-stone-900 group-hover:text-rose-900 transition-colors">
                Bedhane
              </span>
              <span className="block text-[10px] tracking-[0.25em] font-semibold text-rose-700 uppercase -mt-1">
                Cosmetics
              </span>
            </div>
          </button>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search sunscreen, serums, perfumes, lipstick..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-8 py-2.5 bg-stone-50 hover:bg-rose-50/40 focus:bg-white border border-stone-200 focus:border-rose-400 rounded-full text-sm placeholder:text-stone-400 focus:outline-hidden focus:ring-3 focus:ring-rose-400/20 transition-all"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 bg-stone-200/60 hover:bg-stone-300 rounded-full w-4 h-4 flex items-center justify-center cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-700">
            <button 
              onClick={() => handleNavClick('catalog')} 
              className="hover:text-rose-600 transition-colors cursor-pointer"
            >
              Shop Catalog
            </button>
            <button 
              onClick={() => handleNavClick('about')} 
              className="hover:text-rose-600 transition-colors cursor-pointer"
            >
              About Us
            </button>
            <button 
              onClick={() => handleNavClick('location')} 
              className="hover:text-rose-600 transition-colors cursor-pointer"
            >
              Location & Hours
            </button>
            <button 
              onClick={() => handleNavClick('contact')} 
              className="hover:text-rose-600 transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* WhatsApp Quick Order Inquiry */}
            <a
              href={`https://wa.me/${shopInfo.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Bedhane%20Cosmetics,%20I%20would%20like%20to%20inquire%20about%20your%20in-stock%20products.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">WhatsApp Us</span>
            </a>

            {/* Mobile search toggle */}
            <button
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              className="md:hidden p-2 rounded-xl text-stone-600 hover:bg-rose-50 transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-stone-700 hover:bg-rose-50 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Search Bar (Expandable) */}
        {isSearchExpanded && (
          <div className="md:hidden pb-4 pt-1">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products, brands, skin concerns..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                autoFocus
                className="w-full pl-10 pr-10 py-2.5 bg-stone-50 border border-stone-200 focus:border-rose-400 rounded-full text-sm focus:outline-hidden focus:ring-2 focus:ring-rose-400/20"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        )}

        {/* Category Filter Pills (Horizontal Scroll) */}
        <div className="border-t border-rose-100/60 py-2.5 overflow-x-auto no-scrollbar flex items-center gap-2">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider pl-1 pr-2 whitespace-nowrap hidden sm:inline">
            Categories:
          </span>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-rose-700 text-white shadow-xs'
                    : 'bg-stone-100/80 hover:bg-rose-50 text-stone-700 hover:text-rose-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[110px] bg-white border-b border-rose-200 shadow-xl p-6 z-50 animate-fadeIn">
          <div className="flex flex-col gap-4 text-stone-800 font-medium">
            <button
              onClick={() => handleNavClick('catalog')}
              className="text-left py-2 px-3 rounded-lg hover:bg-rose-50 hover:text-rose-700 transition-colors"
            >
              Browse In-Stock Products ({inStockCount})
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="text-left py-2 px-3 rounded-lg hover:bg-rose-50 hover:text-rose-700 transition-colors"
            >
              About Bedhane Cosmetics
            </button>
            <button
              onClick={() => handleNavClick('location')}
              className="text-left py-2 px-3 rounded-lg hover:bg-rose-50 hover:text-rose-700 transition-colors"
            >
              Store Location & Map
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-left py-2 px-3 rounded-lg hover:bg-rose-50 hover:text-rose-700 transition-colors"
            >
              Contact & Inquiries
            </button>

            <div className="pt-4 mt-2 border-t border-stone-200 text-xs text-stone-500 space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-500" />
                <span>{shopInfo.location.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-rose-500" />
                <span>Mon-Sat: 9:00 AM - 8:30 PM | Sun: 10:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
