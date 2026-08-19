import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  HeartHandshake, 
  Truck, 
  CheckCircle
} from 'lucide-react';
import type { ShopDetails } from '../types/product';
import { useLanguage } from '../context/LanguageContext';

interface ShopInfoProps {
  shopInfo: ShopDetails;
  onExplore: () => void;
}

export const ShopInfo: React.FC<ShopInfoProps> = ({ onExplore }) => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-stone-50 via-rose-50/40 to-white border-y border-rose-100/70 overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 sm:mb-16 w-full">
          
          {/* Visual Column */}
          <div className="lg:col-span-5 relative order-2 lg:order-1 w-full">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white w-full">
              <img
                src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=80"
                alt="Bedhane Cosmetics Boutique Experience"
                className="w-full h-64 sm:h-80 md:h-[380px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white">
                <span className="px-3 py-1 rounded-full bg-rose-600/90 text-[11px] font-semibold tracking-wider uppercase mb-2 inline-block shadow-xs">
                  Bedhane
                </span>
                <p className="font-serif text-base sm:text-xl font-bold">{t.aboutPromiseTitle}</p>
              </div>
            </div>

            {/* Accent badge (Tablet/Desktop) */}
            <div className="absolute top-4 left-4 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-rose-100 hidden sm:block">
              <p className="font-serif text-xl font-bold text-rose-700">Addis Ababa</p>
              <p className="text-xs text-stone-500 font-medium">Bole Boutique</p>
            </div>
          </div>

          {/* Narrative Column */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 order-1 lg:order-2 text-center lg:text-left w-full">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-rose-600" />
              <span>{t.aboutTag}</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
              {t.aboutTitle}
            </h2>

            <p className="text-stone-600 text-xs sm:text-base lg:text-lg font-light leading-relaxed">
              {t.aboutStory}
            </p>

            <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-stone-700 text-left max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" />
                <span>{t.aboutPerk1Desc}</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" />
                <span>{t.aboutPerk2Desc}</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" />
                <span>{t.aboutPerk4Desc}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onExplore}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-stone-900 hover:bg-rose-700 active:scale-95 text-white font-semibold text-xs sm:text-sm shadow-md transition-colors cursor-pointer"
              >
                {t.aboutCtaBtn}
              </button>
            </div>
          </div>

        </div>

        {/* 4 Core Value Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-rose-100 shadow-xs hover:shadow-lg transition-all flex flex-col items-center text-center sm:items-start sm:text-left group">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-rose-50 group-hover:bg-rose-700 text-rose-700 group-hover:text-white flex items-center justify-center transition-colors mb-3 shadow-xs">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="font-serif font-bold text-stone-900 text-base sm:text-lg mb-1">{t.aboutPerk1Title}</h3>
            <p className="text-xs sm:text-sm text-stone-500 leading-relaxed font-light">{t.aboutPerk1Desc}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-rose-100 shadow-xs hover:shadow-lg transition-all flex flex-col items-center text-center sm:items-start sm:text-left group">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-rose-50 group-hover:bg-rose-700 text-rose-700 group-hover:text-white flex items-center justify-center transition-colors mb-3 shadow-xs">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="font-serif font-bold text-stone-900 text-base sm:text-lg mb-1">{t.aboutPerk2Title}</h3>
            <p className="text-xs sm:text-sm text-stone-500 leading-relaxed font-light">{t.aboutPerk2Desc}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-rose-100 shadow-xs hover:shadow-lg transition-all flex flex-col items-center text-center sm:items-start sm:text-left group">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-rose-50 group-hover:bg-rose-700 text-rose-700 group-hover:text-white flex items-center justify-center transition-colors mb-3 shadow-xs">
              <HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="font-serif font-bold text-stone-900 text-base sm:text-lg mb-1">{t.aboutPerk3Title}</h3>
            <p className="text-xs sm:text-sm text-stone-500 leading-relaxed font-light">{t.aboutPerk3Desc}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-rose-100 shadow-xs hover:shadow-lg transition-all flex flex-col items-center text-center sm:items-start sm:text-left group">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-rose-50 group-hover:bg-rose-700 text-rose-700 group-hover:text-white flex items-center justify-center transition-colors mb-3 shadow-xs">
              <Truck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="font-serif font-bold text-stone-900 text-base sm:text-lg mb-1">{t.aboutPerk4Title}</h3>
            <p className="text-xs sm:text-sm text-stone-500 leading-relaxed font-light">{t.aboutPerk4Desc}</p>
          </div>
        </div>

      </div>
    </section>
  );
};
