import React from 'react';
import { Sparkles, MapPin, Phone, Mail, ArrowUp } from 'lucide-react';
import type { ShopDetails, ProductCategory } from '../types/product';

interface FooterProps {
  shopInfo: ShopDetails;
  onSelectCategory: (category: ProductCategory) => void;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  shopInfo,
  onSelectCategory,
  onNavigate
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 via-rose-400 to-amber-300 flex items-center justify-center shadow-md">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white">
                  Bedhane
                </span>
                <span className="block text-[10px] tracking-[0.25em] font-semibold text-rose-400 uppercase -mt-1">
                  Cosmetics
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-light">
              {shopInfo.shortBio}
            </p>
            <p className="text-xs text-rose-300/80 font-medium">
              ✨ Only physically available products are listed in our live catalog.
            </p>
          </div>

          {/* Quick Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-white font-bold text-base">Beauty Categories</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {(['Skincare', 'Sun Care', 'Makeup', 'Fragrance', 'Haircare', 'Body Care'] as ProductCategory[]).map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat);
                      onNavigate('catalog');
                    }}
                    className="hover:text-rose-300 transition-colors cursor-pointer text-left"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-white font-bold text-base">Navigation</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button onClick={() => onNavigate('hero')} className="hover:text-rose-300 transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-rose-300 transition-colors cursor-pointer">
                  Shop In-Stock
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-rose-300 transition-colors cursor-pointer">
                  About Bedhane
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('location')} className="hover:text-rose-300 transition-colors cursor-pointer">
                  Store Location
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-rose-300 transition-colors cursor-pointer">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Location & Contact Summary */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-white font-bold text-base">Visit Our Boutique</h4>
            <div className="space-y-2 text-xs text-stone-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{shopInfo.location.landmark}, {shopInfo.location.address}, {shopInfo.location.city}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{shopInfo.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{shopInfo.email}</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Bedhane Cosmetics. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-rose-300 transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
