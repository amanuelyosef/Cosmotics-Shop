import { Sparkles, ShieldCheck, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import type { ShopDetails } from '../types/product';
import { useLanguage } from '../context/LanguageContext';

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
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative overflow-hidden w-full max-w-full bg-gradient-to-b from-rose-50/60 via-amber-50/30 to-stone-50 pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-14 lg:pb-24 border-b border-rose-100/60">
      {/* Decorative background blurs contained inside overflow-hidden */}
      <div className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-rose-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-60 sm:w-80 h-60 sm:h-80 bg-amber-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left w-full min-w-0">
            
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-rose-100/80 border border-rose-200/80 text-rose-900 text-[11px] sm:text-xs font-semibold tracking-wide shadow-xs max-w-full">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-600 shrink-0" />
              <span className="truncate">{t.heroTrustPill}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-stone-900 leading-[1.25]">
              {t.heroHeading1}
              <span className="text-rose-700 italic">{t.heroHeadingAccent}</span>
              {t.heroHeading2}
            </h1>

            {/* Subheading */}
            <p className="text-xs sm:text-base lg:text-lg text-stone-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              {t.heroSubtext}
            </p>

            {/* Real-time stock guarantee banner */}
            <div className="bg-white/85 backdrop-blur-sm border border-emerald-200/80 rounded-2xl p-3.5 sm:p-4 shadow-xs flex items-center gap-3 max-w-lg mx-auto lg:mx-0 text-left w-full">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-700 font-bold">
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
              </div>
              <div className="text-xs sm:text-sm min-w-0">
                <p className="font-bold text-stone-900">{t.heroLiveStockTitle}</p>
                <p className="text-stone-500 text-[11px] sm:text-xs leading-snug">
                  {t.heroLiveStockDesc}
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1 w-full">
              <button
                onClick={onExplore}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-rose-700 hover:bg-rose-800 active:scale-95 text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>{t.heroBrowseBtn} ({inStockCount})</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onViewLocation}
                className="w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-white hover:bg-rose-50/80 active:scale-95 text-stone-800 font-semibold text-xs sm:text-sm border border-stone-200 hover:border-rose-300 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <MapPin className="w-4 h-4 text-rose-600" />
                <span>{t.heroLocationBtn}</span>
              </button>
            </div>

            {/* Highlights Statistics Bar */}
            <div className="pt-4 sm:pt-6 border-t border-rose-200/60 grid grid-cols-3 gap-2 sm:gap-4 max-w-lg mx-auto lg:mx-0 text-stone-700 w-full">
              <div className="text-center sm:text-left">
                <p className="font-serif text-lg sm:text-2xl font-bold text-stone-900">{t.heroStat1}</p>
                <p className="text-[10px] sm:text-xs text-stone-500 font-medium">{t.heroStat1Label}</p>
              </div>
              <div className="text-center sm:text-left">
                <p className="font-serif text-lg sm:text-2xl font-bold text-stone-900">{t.heroStat2}</p>
                <p className="text-[10px] sm:text-xs text-stone-500 font-medium">{t.heroStat2Label}</p>
              </div>
              <div className="text-center sm:text-left">
                <p className="font-serif text-lg sm:text-2xl font-bold text-stone-900">{t.heroStat3}</p>
                <p className="text-[10px] sm:text-xs text-stone-500 font-medium">{t.heroStat3Label}</p>
              </div>
            </div>

          </div>

          {/* Right Visual Showcase Frame */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0 w-full">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none w-full">
              
              {/* Main Image Frame */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white group w-full">
                <img
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80"
                  alt="Bedhane Cosmetics Showcase"
                  className="w-full h-72 sm:h-96 lg:h-[460px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />

                {/* Floating In-Store Badge */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/90 backdrop-blur-md border border-white/40 shadow-lg text-stone-900">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[9px] sm:text-[10px] font-bold tracking-widest text-rose-700 uppercase">{t.heroBadgeFeatured}</span>
                      <h3 className="font-serif font-bold text-stone-900 text-sm sm:text-base">Bedhane Cosmetics</h3>
                    </div>
                    <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] sm:text-xs font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-ping" />
                      {t.heroBadgeLive}
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Pill Top Right (Tablet/Desktop only) */}
              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl shadow-xl border border-rose-100 hidden sm:flex items-center gap-2.5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold shrink-0">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="text-xs text-left">
                  <p className="font-bold text-stone-900">{t.heroDermPill}</p>
                  <p className="text-stone-500 text-[10px]">{t.heroDermSub}</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
