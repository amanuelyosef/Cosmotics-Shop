import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  Star, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  Phone, 
  AlertCircle,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  ZoomIn
} from 'lucide-react';
import type { Product, ShopDetails } from '../types/product';
import { TelegramIcon } from './TelegramIcon';
import { useLanguage } from '../context/LanguageContext';
import { getCategoryLabel } from '../i18n/translations';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  shopInfo: ShopDetails;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  shopInfo
}) => {
  const { t } = useLanguage();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Reset active image on product change
  useEffect(() => {
    setActiveImageIndex(0);
    setIsFullScreen(false);
  }, [product]);

  // Lock body scroll when modal or full-screen is open
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [product]);

  // Handle keyboard events (Escape to close, Left/Right for fullscreen gallery)
  useEffect(() => {
    if (!product) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullScreen) {
          setIsFullScreen(false);
        } else {
          onClose();
        }
      } else if (isFullScreen) {
        if (e.key === 'ArrowRight' && product.images.length > 1) {
          setActiveImageIndex((prev) => (prev + 1) % product.images.length);
        } else if (e.key === 'ArrowLeft' && product.images.length > 1) {
          setActiveImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, isFullScreen, onClose]);

  if (!product) return null;

  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock === 0;
  const cleanTelegram = (shopInfo.telegram || '@GTlode').replace('@', '');
  const cleanPhone = shopInfo.phone.replace(/\s+/g, '');

  const nextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <>
      {/* Main Product Modal Dialog */}
      <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 animate-fadeIn">
        
        {/* Background dismissal */}
        <div className="fixed inset-0" onClick={onClose} />

        {/* Modal Card */}
        <div className="relative bg-white rounded-t-3xl sm:rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden border border-rose-100 z-10 max-h-[92vh] sm:max-h-[88vh] flex flex-col my-0 sm:my-auto">
          
          {/* Top Bar with Close Button */}
          <div className="flex items-center justify-between p-3.5 sm:p-4 border-b border-stone-100 sm:border-0 absolute top-0 inset-x-0 z-30 bg-white/95 sm:bg-transparent backdrop-blur-xs">
            <div className="sm:hidden flex items-center gap-2">
              <span className="w-8 h-1 bg-stone-300 rounded-full mx-auto" />
            </div>
            <button
              onClick={onClose}
              className="ml-auto w-10 h-10 rounded-full bg-stone-100 hover:bg-rose-100 text-stone-700 hover:text-rose-700 flex items-center justify-center transition-colors cursor-pointer shadow-xs active:scale-95"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="overflow-y-auto p-4 sm:p-8 pt-12 sm:pt-8 overscroll-contain">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-8">
              
              {/* Left Column: Product Images & Fullscreen trigger */}
              <div className="md:col-span-5 space-y-3 sm:space-y-4">
                
                {/* Main Image Frame (Clickable for full-screen) */}
                <div 
                  className="aspect-square max-h-[320px] sm:max-h-none mx-auto sm:mx-0 w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 relative group cursor-pointer select-none shadow-xs"
                  onClick={() => setIsFullScreen(true)}
                  title={t.modalFullScreenHint}
                >
                  <img
                    src={product.images[activeImageIndex] || product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Stock Badge Overlay */}
                  <div className="absolute top-2.5 left-2.5 pointer-events-none">
                    {isOutOfStock ? (
                      <span className="px-2.5 py-1 rounded-full bg-rose-600 text-white text-[11px] sm:text-xs font-semibold flex items-center gap-1 shadow-md">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {t.outOfStockBadge}
                      </span>
                    ) : isLowStock ? (
                      <span className="px-2.5 py-1 rounded-full bg-amber-500 text-white text-[11px] sm:text-xs font-semibold flex items-center gap-1 shadow-md animate-pulse">
                        <Sparkles className="w-3.5 h-3.5" />
                        {t.lowStockBadge} ({product.stock})
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[11px] sm:text-xs font-semibold flex items-center gap-1 shadow-md">
                        <Check className="w-3.5 h-3.5" />
                        {t.inStockBadge} ({product.stock})
                      </span>
                    )}
                  </div>

                  {/* Full Screen Action Pill */}
                  <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900/85 hover:bg-rose-700 text-white text-xs backdrop-blur-md shadow-lg transition-all cursor-pointer">
                    <Maximize2 className="w-3.5 h-3.5 text-rose-300" />
                    <span className="font-semibold text-[11px] sm:text-xs">{t.modalFullScreenBtn}</span>
                  </div>
                </div>

                {/* Thumbnails Strip */}
                {product.images.length > 1 && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                          activeImageIndex === idx ? 'border-rose-600 scale-95 shadow-md' : 'border-stone-200 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Trust Box */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-rose-50/50 border border-rose-100 text-xs text-stone-600 space-y-1.5">
                  <div className="flex items-center gap-2 text-stone-900 font-semibold text-xs">
                    <ShieldCheck className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{t.modalAuthBoxTitle}</span>
                  </div>
                  <p className="text-stone-500 text-[11px] sm:text-xs leading-relaxed">
                    {t.modalAuthBoxDesc}
                  </p>
                </div>

              </div>

              {/* Right Column: Product Info & Actions */}
              <div className="md:col-span-7 flex flex-col justify-between space-y-5">
                
                <div className="space-y-3.5 sm:space-y-4">
                  
                  {/* Category & Brand */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-[11px] sm:text-xs font-semibold uppercase tracking-wider">
                      {product.brand}
                    </span>
                    <span className="text-[11px] sm:text-xs text-stone-500 font-medium">
                      {getCategoryLabel(product.category, t)} {product.subcategory && `• ${product.subcategory}`}
                    </span>
                  </div>

                  {/* Name */}
                  <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-stone-900 leading-snug">
                    {product.name}
                  </h2>

                  {/* Rating & Volume */}
                  <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
                    <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 text-amber-800 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
                      <span>{product.rating}</span>
                      <span className="text-amber-600 text-[11px]">({product.reviewCount} {t.reviewsCount})</span>
                    </div>

                    <span className="text-stone-300">•</span>

                    <span className="text-stone-600 font-medium text-xs sm:text-sm">
                      {product.volumeSize}
                    </span>
                  </div>

                  {/* Price & Stock Display Box */}
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] sm:text-xs text-stone-500 font-medium uppercase tracking-wider block">{t.modalStorePrice}</span>
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif text-xl sm:text-3xl font-bold text-stone-900">
                          {product.price.toLocaleString()} {product.currency}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs sm:text-sm text-stone-400 line-through">
                            {product.originalPrice.toLocaleString()} {product.currency}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Stock counter */}
                    <div className="text-right">
                      <span className="text-[10px] sm:text-xs text-stone-500 block font-medium">{t.modalCurrentStock}</span>
                      <span className={`font-bold text-xs sm:text-sm ${isOutOfStock ? 'text-rose-600' : isLowStock ? 'text-amber-600' : 'text-emerald-700'}`}>
                        {product.stock > 0 ? `${product.stock} ${t.inStockBadge}` : t.outOfStockBadge}
                      </span>
                    </div>
                  </div>

                  {/* Clean Product Overview / Description */}
                  <div className="space-y-3 pt-1">
                    <h3 className="text-[11px] sm:text-xs uppercase font-bold text-stone-400 tracking-wider">
                      {t.modalProductOverview}
                    </h3>
                    <p className="leading-relaxed text-stone-600 text-xs sm:text-sm">{product.description}</p>
                    
                    {/* Key Benefits */}
                    {product.keyBenefits && product.keyBenefits.length > 0 && (
                      <div className="pt-1">
                        <h4 className="font-semibold text-stone-900 mb-2 flex items-center gap-1.5 text-xs sm:text-sm">
                          <Sparkles className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                          {t.modalKeyBenefits}
                        </h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                          {product.keyBenefits.map((benefit, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-stone-600">
                              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Suitable Skin types */}
                    {product.skinTypes && product.skinTypes.length > 0 && (
                      <div className="pt-1 flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] sm:text-xs font-semibold text-stone-500 mr-1">{t.modalBestFor}</span>
                        {product.skinTypes.map((type, i) => (
                          <span key={i} className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-stone-100 text-stone-700 text-[11px] sm:text-xs font-medium">
                            {type}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                </div>

                {/* Order Actions CTA */}
                <div className="space-y-2.5 pt-4 border-t border-stone-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                    
                    {/* Telegram Direct Order */}
                    <a
                      href={`https://t.me/${cleanTelegram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 px-4 rounded-xl sm:rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-center active:scale-98 min-h-[46px]"
                    >
                      <TelegramIcon className="w-4 h-4 text-white" />
                      <span>{t.modalOrderTelegram}</span>
                    </a>

                    {/* Direct Phone Call */}
                    <a
                      href={`tel:${cleanPhone}`}
                      className="w-full py-3.5 px-4 rounded-xl sm:rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-center active:scale-98 min-h-[46px]"
                    >
                      <Phone className="w-4 h-4 text-rose-400" />
                      <span>{t.modalCallDirect}</span>
                    </a>

                  </div>

                  <p className="text-center text-[10px] sm:text-[11px] text-stone-400">
                    {t.modalPickupNote}
                  </p>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

      {/* FULL-SCREEN IMMERSIVE LIGHTBOX VIEWER (Using React Portal directly into body) */}
      {isFullScreen && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[100] bg-stone-950/95 backdrop-blur-lg flex flex-col items-center justify-between p-3 sm:p-6 animate-fadeIn select-none"
          onClick={() => setIsFullScreen(false)}
        >
          
          {/* Top Bar: Title & Close Button */}
          <div 
            className="w-full max-w-6xl flex items-center justify-between text-white z-20 shrink-0 pb-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-0.5 max-w-[65%] sm:max-w-[75%]">
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-rose-400 font-bold">{product.brand}</span>
              <h3 className="font-serif text-sm sm:text-xl font-bold truncate text-white">{product.name}</h3>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {product.images.length > 1 && (
                <span className="text-[11px] sm:text-xs text-stone-300 bg-stone-800/90 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full font-medium border border-stone-700">
                  {activeImageIndex + 1} / {product.images.length}
                </span>
              )}
              <button
                onClick={() => setIsFullScreen(false)}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-stone-800/90 hover:bg-rose-600 text-white flex items-center justify-center transition-colors cursor-pointer border border-stone-700 shadow-xl"
                aria-label={t.modalCloseFullScreen}
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>

          {/* Central Image with Left/Right Navigation */}
          <div 
            className="relative w-full max-w-5xl flex-1 flex items-center justify-center p-1 sm:p-2 min-h-0"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Left Prev Arrow */}
            {product.images.length > 1 && (
              <button
                onClick={prevImage}
                className="absolute left-1 sm:left-4 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-stone-900/90 hover:bg-rose-600 text-white flex items-center justify-center transition-all shadow-2xl hover:scale-110 cursor-pointer border border-stone-700"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>
            )}

            {/* High-res Image Container */}
            <div className="w-full h-full flex items-center justify-center p-1">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="max-h-[70vh] sm:max-h-[75vh] max-w-[92vw] sm:max-w-[90vw] object-contain rounded-2xl shadow-2xl"
              />
            </div>

            {/* Right Next Arrow */}
            {product.images.length > 1 && (
              <button
                onClick={nextImage}
                className="absolute right-1 sm:right-4 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-stone-900/90 hover:bg-rose-600 text-white flex items-center justify-center transition-all shadow-2xl hover:scale-110 cursor-pointer border border-stone-700"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>
            )}

          </div>

          {/* Bottom Thumbnails Strip / Footer */}
          <div 
            className="w-full max-w-md shrink-0 flex items-center justify-center pt-2"
            onClick={(e) => e.stopPropagation()}
          >
            {product.images.length > 1 ? (
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto p-1.5 sm:p-2 bg-stone-900/80 border border-stone-800 rounded-2xl backdrop-blur-md no-scrollbar">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      activeImageIndex === idx ? 'border-rose-500 scale-105 shadow-lg' : 'border-stone-700 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-stone-400 text-xs flex items-center gap-1.5 bg-stone-900/80 px-3.5 py-1.5 rounded-full border border-stone-800">
                <ZoomIn className="w-4 h-4 text-rose-400" />
                <span className="text-[11px] sm:text-xs">{t.modalFullScreenBtn}</span>
              </div>
            )}
          </div>

        </div>,
        document.body
      )}
    </>
  );
};
