import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  HeartHandshake, 
  Truck, 
  CheckCircle
} from 'lucide-react';
import type { ShopDetails } from '../types/product';

interface ShopInfoProps {
  shopInfo: ShopDetails;
  onExplore: () => void;
}

export const ShopInfo: React.FC<ShopInfoProps> = ({ shopInfo, onExplore }) => {
  return (
    <section id="about" className="py-16 lg:py-24 bg-gradient-to-b from-stone-50 via-rose-50/40 to-white border-y border-rose-100/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Visual Column */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=80"
                alt="Bedhane Cosmetics Boutique Experience"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="px-3 py-1 rounded-full bg-rose-600/90 text-[11px] font-semibold tracking-wider uppercase mb-2 inline-block">
                  Our Promise
                </span>
                <p className="font-serif text-xl font-bold">100% Genuine Certified Skincare & Beauty</p>
              </div>
            </div>

            {/* Accent badge */}
            <div className="absolute -top-4 -left-4 p-4 rounded-2xl bg-white shadow-xl border border-rose-100 max-w-[200px] hidden sm:block">
              <p className="font-serif text-2xl font-bold text-rose-700">Addis Ababa</p>
              <p className="text-xs text-stone-500 font-medium">Bole Boutique & Fast City-Wide Delivery</p>
            </div>
          </div>

          {/* Narrative Column */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-rose-600" />
              <span>About Bedhane Cosmetics</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
              Where True Radiance Meets <span className="text-rose-700 italic">Authentic Care</span>.
            </h2>

            <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed">
              {shopInfo.fullStory}
            </p>

            <div className="space-y-3 text-sm text-stone-700 text-left max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Direct authorized import batches with verifiable manufacturer verification.</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Climate-controlled storage to maintain maximum ingredient potency.</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Real-time in-store stock tracking with zero guesswork.</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onExplore}
                className="px-7 py-3.5 rounded-full bg-stone-900 hover:bg-rose-700 text-white font-semibold text-sm shadow-md transition-colors cursor-pointer"
              >
                Explore Current In-Stock Selection
              </button>
            </div>
          </div>

        </div>

        {/* 4 Core Value Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {shopInfo.perks.map((perk, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 border border-rose-100 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center sm:items-start sm:text-left group"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-50 group-hover:bg-rose-700 text-rose-700 group-hover:text-white flex items-center justify-center transition-colors duration-300 mb-4 shadow-xs">
                {index === 0 && <ShieldCheck className="w-6 h-6" />}
                {index === 1 && <Sparkles className="w-6 h-6" />}
                {index === 2 && <HeartHandshake className="w-6 h-6" />}
                {index === 3 && <Truck className="w-6 h-6" />}
              </div>
              <h3 className="font-serif font-bold text-stone-900 text-lg mb-1">{perk.title}</h3>
              <p className="text-xs sm:text-sm text-stone-500 leading-relaxed font-light">{perk.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
