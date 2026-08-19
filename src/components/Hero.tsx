import React from 'react';
import { Sparkles, ShieldCheck, Clock, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import type { ShopDetails } from '../types/product';

interface HeroProps {
  shopInfo?: ShopDetails;
  inStockCount: number;
  onExplore: () => void;
  onViewLocation: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  inStockCount,
  onExplore,
  onViewLocation
}) => {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-rose-50/60 via-amber-50/30 to-stone-50 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-rose-100/60">
      {/* Decorative background blurs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100/80 border border-rose-200/80 text-rose-900 text-xs font-semibold tracking-wide shadow-xs">
              <ShieldCheck className="w-4 h-4 text-rose-600" />
              <span>100% Guaranteed Authentic Global & Artisan Brands</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-[1.15]">
              Elevate Your Glow with <span className="text-rose-700 italic">Pure Elegance</span> & Care.
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              Welcome to <strong>Bedhane Cosmetics</strong> — your premier beauty sanctuary in Addis Ababa. Browse verified in-stock skincare, designer fragrances, viral makeup, and haircare essentials.
            </p>

            {/* Real-time stock guarantee banner */}
            <div className="bg-white/80 backdrop-blur-sm border border-emerald-200/80 rounded-2xl p-4 shadow-xs flex items-center gap-3.5 max-w-lg mx-auto lg:mx-0">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-700 font-bold">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="text-left text-xs sm:text-sm">
                <p className="font-semibold text-stone-900">Live Inventory Guarantee</p>
                <p className="text-stone-500 text-xs">
                  Out-of-stock items are automatically hidden so you only see what is ready for immediate store pickup or delivery.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onExplore}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-rose-700 hover:bg-rose-800 text-white font-semibold text-sm shadow-md hover:shadow-rose-700/25 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Browse {inStockCount} In-Stock Products</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onViewLocation}
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-white hover:bg-rose-50/80 text-stone-800 font-semibold text-sm border border-stone-200 hover:border-rose-300 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <MapPin className="w-4 h-4 text-rose-600" />
                <span>Visit Bole Boutique</span>
              </button>
            </div>

            {/* Highlights Bar */}
            <div className="pt-6 border-t border-rose-200/60 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-stone-700">
              <div>
                <p className="font-serif text-2xl font-bold text-stone-900">100%</p>
                <p className="text-xs text-stone-500 font-medium">Genuine Products</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-stone-900">Same Day</p>
                <p className="text-xs text-stone-500 font-medium">Addis Delivery</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-stone-900">Bole Area</p>
                <p className="text-xs text-stone-500 font-medium">Central Boutique</p>
              </div>
            </div>

          </div>

          {/* Right Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Image Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group">
                <img
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80"
                  alt="Bedhane Cosmetics Showcase"
                  className="w-full h-[440px] sm:h-[480px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />

                {/* Floating In-Store Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/40 shadow-lg text-stone-900">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold tracking-widest text-rose-700 uppercase">Featured Brand</span>
                      <h3 className="font-serif font-bold text-stone-900 text-base sm:text-lg">Curated Global Beauty</h3>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      Live In Stock
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Pill Top Right */}
              <div className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-rose-100 hidden sm:flex items-center gap-3 animate-bounce duration-1000">
                <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-xs text-left">
                  <p className="font-bold text-stone-900">Dermatologist Tested</p>
                  <p className="text-stone-500">Pure & gentle formulas</p>
                </div>
              </div>

              {/* Floating Pill Bottom Left */}
              <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-rose-100 hidden sm:flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-xs text-left">
                  <p className="font-bold text-stone-900">Open Daily</p>
                  <p className="text-stone-500">9:00 AM – 8:30 PM</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
