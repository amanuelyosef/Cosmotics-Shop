import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Search, 
  MapPin, 
  Phone, 
  Clock, 
  Menu, 
  X, 
  Globe
} from 'lucide-react';
import type { ProductCategory, ShopDetails } from '../types/product';
import { TelegramIcon } from './TelegramIcon';
import { useLanguage } from '../context/LanguageContext';
import { getCategoryLabel } from '../i18n/translations';

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
  const { language, setLanguage, t, languageOptions } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  // Close mobile drawer on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const telegramUsername = (shopInfo.telegram || '@GTlode').replace('@', '');
  const cleanPhone = shopInfo.phone.replace(/\s+/g, '');

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-rose-100/80 shadow-xs transition-all">
      {/* Top Notification / Store Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-rose-950 text-white text-[11px] sm:text-xs py-1.5 sm:py-2 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 truncate mx-auto sm:mx-0">
            <span className="inline-flex items-center justify-center p-0.5 rounded-full bg-rose-500/20 text-rose-300 shrink-0">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-pulse" />
            </span>
            <span className="font-medium tracking-wide truncate">
              {t.topBanner} ({inStockCount} {t.productsUnit})
            </span>
          </div>

          <div className="hidden md:flex items-center gap-3 sm:gap-4 text-stone-300 text-xs shrink-0">
            <span className="flex items-center gap-1 hover:text-white transition-colors">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              {t.locationTop}
            </span>
            <span className="text-stone-600">•</span>
            <a 
              href={`tel:${cleanPhone}`} 
              className="flex items-center gap-1 hover:text-rose-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-rose-400" />
              {shopInfo.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          
          {/* Brand Logo & Name */}
          <button 
            onClick={() => handleNavClick('hero')} 
            className="flex items-center gap-2 sm:gap-3 text-left group focus:outline-hidden cursor-pointer shrink-0"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-rose-500 via-rose-400 to-amber-300 flex items-center justify-center shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <span className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-stone-900 group-hover:text-rose-900 transition-colors leading-none block">
                {t.brandTitle}
              </span>
              <span className="block text-[9px] sm:text-[10px] tracking-[0.2em] font-semibold text-rose-700 uppercase mt-0.5">
                {t.brandSubtitle}
              </span>
            </div>
          </button>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xs lg:max-w-md mx-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onNavigate('catalog-results-header');
              }}
              className="relative w-full"
            >
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    onNavigate('catalog-results-header');
                  }
                }}
                className="w-full pl-9 pr-8 py-2 bg-stone-50 hover:bg-rose-50/40 focus:bg-white border border-stone-200 focus:border-rose-400 rounded-full text-xs sm:text-sm placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-rose-400/20 transition-all"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
              >
                <Search className="w-4 h-4" />
              </button>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 bg-stone-200/60 hover:bg-stone-300 rounded-full w-4 h-4 flex items-center justify-center cursor-pointer"
                >
                  ✕
                </button>
              )}
            </form>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-5 text-sm font-medium text-stone-700">
            <button 
              onClick={() => handleNavClick('catalog')} 
              className="hover:text-rose-600 transition-colors cursor-pointer py-1"
            >
              {t.catalogNav}
            </button>
            <button 
              onClick={() => handleNavClick('about')} 
              className="hover:text-rose-600 transition-colors cursor-pointer py-1"
            >
              {t.aboutNav}
            </button>
            <button 
              onClick={() => handleNavClick('location')} 
              className="hover:text-rose-600 transition-colors cursor-pointer py-1"
            >
              {t.locationNav}
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            
            {/* Language Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full bg-stone-100 hover:bg-rose-50 border border-stone-200 hover:border-rose-300 text-[11px] sm:text-xs font-semibold text-stone-800 transition-all cursor-pointer shadow-xs min-h-[36px]"
                title="Select language"
              >
                <Globe className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                <span className="max-w-[70px] sm:max-w-none truncate">{languageOptions.find(o => o.code === language)?.nativeLabel}</span>
              </button>

              {/* Language Dropdown Menu */}
              {isLangDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsLangDropdownOpen(false)} />
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-50 animate-fadeIn">
                    <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                      {t.languageLabel}
                    </div>
                    {languageOptions.map((opt) => (
                      <button
                        key={opt.code}
                        onClick={() => {
                          setLanguage(opt.code);
                          setIsLangDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between gap-2 hover:bg-rose-50 transition-colors cursor-pointer ${
                          language === opt.code ? 'font-bold text-rose-700 bg-rose-50/60' : 'text-stone-700'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{opt.flag}</span>
                          <span>{opt.nativeLabel}</span>
                        </span>
                        {language === opt.code && <span className="text-rose-600 font-bold">✓</span>}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Telegram Order Button */}
            <a
              href={`https://t.me/${telegramUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-sky-600 hover:bg-sky-700 active:scale-95 text-white text-xs sm:text-sm font-semibold shadow-xs transition-all min-h-[36px] min-w-[36px]"
              title={t.telegramOrderNav}
            >
              <TelegramIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0" />
              <span className="hidden sm:inline">{t.telegramOrderNav}</span>
            </a>

            {/* Mobile search toggle */}
            <button
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              className="md:hidden p-2 rounded-xl text-stone-700 hover:bg-rose-50 transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-stone-800 hover:bg-rose-50 transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-rose-700" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Search Bar (Expandable) */}
        {isSearchExpanded && (
          <div className="md:hidden pb-3 pt-1">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onNavigate('catalog-results-header');
              }}
              className="relative w-full"
            >
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    onNavigate('catalog-results-header');
                  }
                }}
                autoFocus
                className="w-full pl-9 pr-9 py-2.5 bg-stone-50 border border-stone-200 focus:border-rose-400 rounded-full text-sm focus:outline-hidden focus:ring-2 focus:ring-rose-400/20"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
              >
                <Search className="w-4 h-4" />
              </button>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
                >
                  ✕
                </button>
              )}
            </form>
          </div>
        )}

        {/* Category Filter Pills (Touch Momentum Horizontal Scroll) */}
        <div className="border-t border-rose-100/60 py-2 overflow-x-auto no-scrollbar flex items-center gap-1.5 sm:gap-2 -mx-3 px-3 sm:mx-0 sm:px-0">
          <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider pl-1 pr-1.5 whitespace-nowrap hidden sm:inline">
            {t.categoriesLabel}
          </span>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer shrink-0 active:scale-95 ${
                  isActive
                    ? 'bg-rose-700 text-white shadow-xs font-semibold'
                    : 'bg-stone-100/90 hover:bg-rose-50 text-stone-700 hover:text-rose-800'
                }`}
              >
                {getCategoryLabel(cat, t)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-x-0 top-[105px] sm:top-[125px] bg-white border-b border-rose-200 shadow-2xl p-5 z-50 animate-fadeIn max-h-[82vh] overflow-y-auto">
          <div className="flex flex-col gap-3 text-stone-800 font-medium">
            
            {/* Language selector in drawer */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">{t.languageLabel}</span>
              <div className="flex items-center gap-1.5">
                {languageOptions.map((opt) => (
                  <button
                    key={opt.code}
                    onClick={() => setLanguage(opt.code)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      language === opt.code
                        ? 'bg-rose-700 text-white shadow-xs'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {opt.nativeLabel}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleNavClick('catalog')}
              className="text-left py-2.5 px-3 rounded-xl hover:bg-rose-50 hover:text-rose-700 transition-colors text-sm font-semibold"
            >
              {t.catalogNav} ({inStockCount})
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="text-left py-2.5 px-3 rounded-xl hover:bg-rose-50 hover:text-rose-700 transition-colors text-sm font-semibold"
            >
              {t.aboutNav}
            </button>
            <button
              onClick={() => handleNavClick('location')}
              className="text-left py-2.5 px-3 rounded-xl hover:bg-rose-50 hover:text-rose-700 transition-colors text-sm font-semibold"
            >
              {t.locationNav}
            </button>

            <a
              href={`https://t.me/${telegramUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
            >
              <TelegramIcon className="w-4 h-4 text-white" />
              <span>{t.telegramOrderNav} (@{telegramUsername})</span>
            </a>

            <div className="pt-3 mt-1 border-t border-stone-200 text-xs text-stone-500 space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span className="leading-snug">{shopInfo.location.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{t.hoursWeekdaysLabel}: {t.hoursWeekdaysTime}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
