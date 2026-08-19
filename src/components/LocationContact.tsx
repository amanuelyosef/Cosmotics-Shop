import React from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  ExternalLink,
  Navigation
} from 'lucide-react';
import type { ShopDetails } from '../types/product';
import { TelegramIcon } from './TelegramIcon';
import { useLanguage } from '../context/LanguageContext';

interface LocationContactProps {
  shopInfo: ShopDetails;
}

export const LocationContact: React.FC<LocationContactProps> = ({ shopInfo }) => {
  const { t } = useLanguage();
  const cleanTelegram = (shopInfo.telegram || '@GTlode').replace('@', '');
  const cleanPhone = shopInfo.phone.replace(/\s+/g, '');

  return (
    <section id="location" className="py-12 sm:py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full overflow-hidden">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-2 sm:space-y-3 px-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-800 text-xs font-bold tracking-widest uppercase">
          <MapPin className="w-3.5 h-3.5 text-rose-600" />
          <span>{t.locationTag}</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
          {t.locationTitle}
        </h2>
        <p className="text-stone-600 text-xs sm:text-base font-light">
          {t.locationSubtext}
        </p>
      </div>

      {/* Balanced 2-Column Store Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch w-full">
        
        {/* Left Column: Location details, Operating Hours & Contact Actions */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-5 sm:space-y-6 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-rose-100 shadow-md w-full">
          
          {/* Location Info */}
          <div className="flex items-start gap-3.5 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 shadow-xs">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <span className="text-[10px] sm:text-xs font-bold text-rose-700 uppercase tracking-wider">{t.locationCardTitle}</span>
              <h3 className="font-serif text-base sm:text-xl font-bold text-stone-900 mt-0.5">{shopInfo.location.landmark}</h3>
              <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">{t.locationCardDesc}</p>
              <p className="text-stone-500 text-xs mt-1 font-medium">{t.locationFloor} • {shopInfo.location.city}</p>
            </div>
          </div>

          {/* Operating Hours Table */}
          <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-3">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-xs sm:text-sm">
              <Clock className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{t.hoursTitle}</span>
            </div>
            
            <div className="space-y-2 text-xs sm:text-sm text-stone-600">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-200/60 pb-1.5 gap-0.5 sm:gap-2">
                <span className="font-medium text-stone-700">{t.hoursWeekdaysLabel}</span>
                <span className="font-bold text-stone-900">{t.hoursWeekdaysTime}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-200/60 pb-1.5 gap-0.5 sm:gap-2">
                <span className="font-medium text-stone-700">{t.hoursSaturdayLabel}</span>
                <span className="font-bold text-stone-900">{t.hoursSaturdayTime}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-0.5 gap-0.5 sm:gap-2">
                <span className="font-medium text-stone-700">{t.hoursSundayLabel}</span>
                <span className="font-bold text-stone-900">{t.hoursSundayTime}</span>
              </div>
            </div>
          </div>

          {/* Contact Channels Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1 w-full">
            <a
              href={`tel:${cleanPhone}`}
              className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-rose-50/80 hover:bg-rose-100 border border-rose-200/70 text-stone-800 transition-all flex items-center gap-3 cursor-pointer group shadow-xs active:scale-98"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-rose-100 group-hover:bg-rose-600 group-hover:text-white text-rose-700 flex items-center justify-center transition-colors shrink-0">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="text-left min-w-0">
                <span className="text-[10px] uppercase font-bold text-stone-500 block">{t.phoneCallBtn}</span>
                <span className="text-xs font-bold text-stone-900 truncate">{shopInfo.phone}</span>
              </div>
            </a>

            <a
              href={`https://t.me/${cleanTelegram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-sky-50 hover:bg-sky-100 border border-sky-200/80 text-stone-800 transition-all flex items-center gap-3 cursor-pointer group shadow-xs active:scale-98"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sky-100 group-hover:bg-sky-600 group-hover:text-white text-sky-700 flex items-center justify-center transition-colors shrink-0">
                <TelegramIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="text-left min-w-0">
                <span className="text-[10px] uppercase font-bold text-sky-700 block">{t.telegramChatBtn}</span>
                <span className="text-xs font-bold text-sky-900 truncate">{shopInfo.telegram}</span>
              </div>
            </a>
          </div>

          {/* Google Maps Directions Action */}
          <a
            href={shopInfo.location.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 sm:py-4 px-4 rounded-xl sm:rounded-2xl bg-stone-900 hover:bg-rose-700 active:scale-98 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
          >
            <Navigation className="w-4 h-4 text-rose-300" />
            <span>{t.openMapBtn}</span>
            <ExternalLink className="w-3.5 h-3.5 text-stone-400 ml-1" />
          </a>

        </div>

        {/* Right Column: Interactive Embedded Map */}
        <div className="lg:col-span-6 rounded-2xl sm:rounded-3xl overflow-hidden border border-rose-100 shadow-md bg-stone-100 min-h-[300px] sm:min-h-[380px] lg:min-h-[460px] relative w-full">
          <iframe
            src={shopInfo.location.mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Bedhane Cosmetics Store Location Map"
            className="w-full h-full min-h-[300px] sm:min-h-[380px] lg:min-h-[460px]"
          />
        </div>

      </div>

    </section>
  );
};
