import React from 'react';
import { Star, Eye, MessageCircle, Sparkles, Check, AlertCircle } from 'lucide-react';
import type { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  whatsappNumber: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
  whatsappNumber
}) => {
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock === 0;

  const whatsappMessage = encodeURIComponent(
    `Hello Bedhane Cosmetics! I would like to inquire about/order:

*Product:* ${product.name}
*Brand:* ${product.brand}
*Price:* ${product.price.toLocaleString()} ${product.currency}
*Stock Status:* ${product.stock} units available

Is this ready for pickup/delivery?`
  );

  return (
    <div className="group bg-white rounded-2xl border border-rose-100/80 hover:border-rose-300 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden relative">
      
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-stone-100 cursor-pointer" onClick={() => onViewDetails(product)}>
        <img
          src={product.images[0] || 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 pointer-events-none">
          {/* Category Tag */}
          <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-semibold text-stone-800 shadow-xs">
            {product.category}
          </span>

          {/* Actual Stock Badge */}
          {isOutOfStock ? (
            <span className="px-2.5 py-1 rounded-full bg-rose-600/90 backdrop-blur-md text-white text-[11px] font-semibold flex items-center gap-1 shadow-xs">
              <AlertCircle className="w-3 h-3" />
              Out of Stock
            </span>
          ) : isLowStock ? (
            <span className="px-2.5 py-1 rounded-full bg-amber-500/90 backdrop-blur-md text-white text-[11px] font-semibold flex items-center gap-1 shadow-xs animate-pulse">
              <Sparkles className="w-3 h-3" />
              Only {product.stock} left!
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-full bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-semibold flex items-center gap-1 shadow-xs">
              <Check className="w-3 h-3" />
              In Stock ({product.stock})
            </span>
          )}
        </div>

        {/* Quick View Button Hover Overlay */}
        <div className="absolute inset-x-4 bottom-4 flex justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
            className="w-full py-2.5 rounded-xl bg-white/95 backdrop-blur-md text-stone-900 text-xs font-bold hover:bg-rose-700 hover:text-white shadow-lg flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>Quick View & Details</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Brand & Volume */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
            <span className="font-semibold text-rose-700 uppercase tracking-wider">{product.brand}</span>
            <span>{product.volumeSize}</span>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onViewDetails(product)}
            className="font-medium text-stone-900 text-sm sm:text-base leading-snug line-clamp-2 hover:text-rose-700 cursor-pointer transition-colors"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-bold text-stone-800">{product.rating}</span>
            <span className="text-xs text-stone-400">({product.reviewCount})</span>
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-rose-100/60 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-lg sm:text-xl font-bold text-stone-900">
                {product.price.toLocaleString()} {product.currency}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-stone-400 line-through">
                  {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <p className="text-[11px] text-emerald-700 font-medium">
              {product.stock > 0 ? `${product.stock} available in Bole` : 'Currently unavailable'}
            </p>
          </div>

          {/* Direct WhatsApp Order CTA */}
          <a
            href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            title="Order or inquire on WhatsApp"
            className="p-2.5 rounded-xl bg-rose-50 hover:bg-emerald-600 text-rose-700 hover:text-white border border-rose-200 hover:border-emerald-600 transition-all duration-200 flex items-center justify-center shrink-0 cursor-pointer group/btn"
          >
            <MessageCircle className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
          </a>
        </div>

      </div>
    </div>
  );
};
