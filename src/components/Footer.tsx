import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  ArrowUp
} from 'lucide-react';
import type { ShopDetails, ProductCategory } from '../types/product';
import { TelegramIcon } from './TelegramIcon';
import { useLanguage } from '../context/LanguageContext';
import { getCategoryLabel } from '../i18n/translations';

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
  const { t } = useLanguage();

  const categories: ProductCategory[] = [
    'Skincare',
    'Makeup',
    'Haircare',
    'Fragrance',
    'Body Care',
    'Sun Care'
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cleanTelegram = (shopInfo.telegram || '@GTlode').replace('@', '');
  const cleanPhone = shopInfo.phone.replace(/\s+/g, '');

  return (
    <footer className="bg-stone-900 text-stone-300 pt-12 sm:pt-16 pb-10 sm:pb-12 border-t border-stone-800 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-10 sm:pb-12 border-b border-stone-800 w-full">
          
          {/* Brand Col */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative shrink-0">
                <img 
                  src="/logo.png" 
                  alt="Faya Qality Cosmetics Logo" 
                  className="w-12 h-12 object-contain rounded-full bg-white p-0.5 ring-2 ring-champagne-400/70 shadow-lg" 
                />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white block">
                  {t.brandTitle}
                </span>
                <span className="text-[10px] tracking-[0.2em] font-semibold text-rose-400 uppercase">
                  {t.brandSubtitle}
                </span>
              </div>
            </div>

            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              {t.footerBio}
            </p>

            <div className="pt-2 text-xs text-rose-300 font-medium">
              <p>{t.footerLiveNotice}</p>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-white font-bold text-base">{t.footerCatTitle}</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat);
                      onNavigate('catalog-results-header');
                    }}
                    className="hover:text-rose-400 transition-colors text-stone-400 cursor-pointer py-0.5 text-left"
                  >
                    {getCategoryLabel(cat, t)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-white font-bold text-base">{t.footerNavTitle}</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-rose-400 transition-colors text-stone-400 cursor-pointer py-0.5"
                >
                  {t.catalogNav}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-rose-400 transition-colors text-stone-400 cursor-pointer py-0.5"
                >
                  {t.aboutNav}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('location')}
                  className="hover:text-rose-400 transition-colors text-stone-400 cursor-pointer py-0.5"
                >
                  {t.locationNav}
                </button>
              </li>
              <li>
                <a
                  href={`https://t.me/${cleanTelegram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-400 transition-colors text-sky-300 inline-flex items-center gap-1.5 py-0.5 font-medium"
                >
                  <TelegramIcon className="w-3.5 h-3.5 text-sky-400" />
                  <span>{t.telegramChannel}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Location & Contact Info */}
          <div className="sm:col-span-2 lg:col-span-3 space-y-3">
            <h4 className="font-serif text-white font-bold text-base">{t.footerVisitTitle}</h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{shopInfo.location.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-rose-400 shrink-0" />
                <a href={`tel:${cleanPhone}`} className="hover:text-white transition-colors">{shopInfo.phone}</a>
              </div>
              <div className="flex items-center gap-2.5">
                <TelegramIcon className="w-4 h-4 text-sky-400 shrink-0" />
                <a 
                  href={`https://t.me/${cleanTelegram}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-sky-300 text-sky-400 font-semibold transition-colors"
                >
                  {shopInfo.telegram}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{shopInfo.email}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400 text-center sm:text-left">
          <p>© {new Date().getFullYear()} {shopInfo.name}. {t.footerCopyright}</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-white transition-colors cursor-pointer group p-1"
          >
            <span>{t.footerBackToTop}</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
};
