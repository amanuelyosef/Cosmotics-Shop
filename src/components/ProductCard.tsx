import React from 'react';
import { Star, Eye, Sparkles, Check, AlertCircle, Phone } from 'lucide-react';
import type { Product } from '../types/product';
import { useLanguage } from '../context/LanguageContext';
import { getCategoryLabel } from '../i18n/translations';
import { getOptimizedImageUrl } from '../utils/imageUtils';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  shopPhone: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
  shopPhone
}) => {
  const { t } = useLanguage();
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock === 0;

  const cleanPhone = shopPhone.replace(/\s+/g, '');

  return (
    <div 
      onClick={() => onViewDetails(product)}
      className="group bg-white rounded-2xl border border-rose-100/80 hover:border-rose-300 shadow-xs hover:shadow-xl sm:hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden relative cursor-pointer active:scale-[0.99]"
    >
      
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-stone-100">
        <img
          src={getOptimizedImageUrl(product.images[0], 600)}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
          decoding="async"
        />

        <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-start justify-between gap-1.5 pointer-events-none">
          {/* Category Tag */}
          <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] sm:text-[11px] font-semibold text-stone-800 shadow-xs">
            {getCategoryLabel(product.category, t)}
          </span>

          {/* Actual Stock Badge */}
          {isOutOfStock ? (
            <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-rose-600/90 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-semibold flex items-center gap-1 shadow-xs">
              <AlertCircle className="w-3 h-3" />
              {t.outOfStockBadge}
            </span>
          ) : isLowStock ? (
            <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-amber-500/90 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-semibold flex items-center gap-1 shadow-xs animate-pulse">
              <Sparkles className="w-3 h-3" />
              {t.lowStockBadge} ({product.stock})
            </span>
          ) : (
            <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-emerald-600/90 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-semibold flex items-center gap-1 shadow-xs">
              <Check className="w-3 h-3" />
              {t.inStockBadge} ({product.stock})
            </span>
          )}
        </div>

        {/* Quick View Button Hover Overlay (Desktop) */}
        <div className="hidden sm:flex absolute inset-x-4 bottom-4 justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
            className="w-full py-2.5 rounded-xl bg-white/95 backdrop-blur-md text-stone-900 text-xs font-bold hover:bg-rose-700 hover:text-white shadow-lg flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>{t.quickViewBtn}</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-3.5 sm:p-5 flex flex-col flex-1 justify-between gap-2.5 sm:gap-3">
        <div>
          {/* Brand & Volume */}
          {(product.brand || product.volumeSize) && (
            <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
              {product.brand ? (
                <span className="font-bold text-rose-700 uppercase tracking-wider text-[11px]">{product.brand}</span>
              ) : <span />}
              {product.volumeSize && <span className="text-[11px]">{product.volumeSize}</span>}
            </div>
          )}

          {/* Product Title */}
          <h3 
            className="font-medium text-stone-900 text-sm sm:text-base leading-snug line-clamp-2 hover:text-rose-700 transition-colors"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Rating - rendered only if present in DB */}
          {typeof product.rating === 'number' && product.rating > 0 && (
            <div className="flex items-center gap-1.5 mt-1.5">
              <div className="flex items-center text-amber-400">
                <Star className="w-3.5 h-3.5 fill-current" />
              </div>
              <span className="text-xs font-bold text-stone-800">{product.rating}</span>
              {typeof product.reviewCount === 'number' && product.reviewCount > 0 && (
                <span className="text-xs text-stone-400">({product.reviewCount})</span>
              )}
            </div>
          )}
        </div>

        {/* Price & Call Action Row */}
        <div className="pt-2.5 sm:pt-3 border-t border-rose-100/60 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-baseline gap-1.5 truncate">
              <span className="font-serif text-sm sm:text-lg font-bold text-stone-900">
                {product.price.toLocaleString()} {product.currency}
              </span>
              {product.originalPrice && (
                <span className="text-[10px] sm:text-xs text-stone-400 line-through">
                  {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <p className="text-[10px] sm:text-[11px] text-emerald-700 font-medium truncate">
              {product.stock > 0 ? `${product.stock} ${t.availableInStore}` : t.outOfStockBadge}
            </p>
          </div>

          {/* Call Action Button (Min 44x44px touch target) */}
          <a
            href={`tel:${cleanPhone}`}
            onClick={(e) => e.stopPropagation()}
            title={`${t.cardCallBtn}: ${shopPhone}`}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-rose-50 hover:bg-rose-700 text-rose-700 hover:text-white border border-rose-200 hover:border-rose-700 transition-all duration-200 flex items-center justify-center shrink-0 cursor-pointer shadow-xs active:scale-90"
            aria-label={`${t.cardCallBtn} ${shopPhone}`}
          >
            <Phone className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </a>
        </div>

      </div>
    </div>
  );
};
