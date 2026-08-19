import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  MessageCircle, 
  Phone, 
  AlertCircle, 
  Droplets,
  HelpCircle
} from 'lucide-react';
import type { Product, ShopDetails } from '../types/product';

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
  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'details' | 'ingredients' | 'usage'>('details');

  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock === 0;

  const whatsappMessage = encodeURIComponent(
    `Hello Bedhane Cosmetics! I would like to order/inquire about this in-stock product:

*Product:* ${product.name}
*Brand:* ${product.brand}
*Price:* ${product.price.toLocaleString()} ${product.currency}
*Stock:* ${product.stock} units available

Please let me know how to arrange pickup at Bole or delivery.`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      
      {/* Background dismissal */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden border border-rose-100 z-10 max-h-[92vh] flex flex-col my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-stone-100 hover:bg-rose-100 text-stone-700 hover:text-rose-700 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-4 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Left: Product Images */}
            <div className="md:col-span-5 space-y-4">
              {/* Main Image */}
              <div className="aspect-square rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 relative group">
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
                
                {/* Stock Badge Overlay */}
                <div className="absolute top-3 left-3">
                  {isOutOfStock ? (
                    <span className="px-3 py-1 rounded-full bg-rose-600 text-white text-xs font-semibold flex items-center gap-1 shadow-md">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Out of Stock
                    </span>
                  ) : isLowStock ? (
                    <span className="px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-semibold flex items-center gap-1 shadow-md animate-pulse">
                      <Sparkles className="w-3.5 h-3.5" />
                      Low Stock: {product.stock} units left
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1 shadow-md">
                      <Check className="w-3.5 h-3.5" />
                      In Stock ({product.stock} units)
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        activeImageIndex === idx ? 'border-rose-600 scale-95 shadow-md' : 'border-stone-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust Box */}
              <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 text-xs text-stone-600 space-y-2">
                <div className="flex items-center gap-2 text-stone-900 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-rose-600" />
                  <span>Bedhane Authenticity Guarantee</span>
                </div>
                <p className="text-stone-500">
                  100% verified genuine batch code. Stored in climate-controlled conditions at our Bole store.
                </p>
              </div>

            </div>

            {/* Right: Product Info & Actions */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                
                {/* Category & Brand */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-semibold uppercase tracking-wider">
                    {product.brand}
                  </span>
                  <span className="text-xs text-stone-500 font-medium">
                    Category: <strong>{product.category}</strong> {product.subcategory && `• ${product.subcategory}`}
                  </span>
                </div>

                {/* Name */}
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                  {product.name}
                </h2>

                {/* Rating & Volume */}
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 text-amber-800 font-semibold">
                    <Star className="w-4 h-4 fill-current text-amber-500" />
                    <span>{product.rating}</span>
                    <span className="text-amber-600 text-xs">({product.reviewCount} customer reviews)</span>
                  </div>

                  <span className="text-stone-300">•</span>

                  <span className="text-stone-600 font-medium">
                    Size: <strong>{product.volumeSize}</strong>
                  </span>
                </div>

                {/* Price Display */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-stone-500 font-medium uppercase tracking-wider block">Price in Store</span>
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-serif text-3xl font-bold text-stone-900">
                        {product.price.toLocaleString()} {product.currency}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-stone-400 line-through">
                          {product.originalPrice.toLocaleString()} {product.currency}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stock counter */}
                  <div className="text-right">
                    <span className="text-xs text-stone-500 block font-medium">Current Stock</span>
                    <span className={`font-bold text-sm ${isOutOfStock ? 'text-rose-600' : isLowStock ? 'text-amber-600' : 'text-emerald-700'}`}>
                      {product.stock > 0 ? `${product.stock} Units In Stock` : 'Out of Stock'}
                    </span>
                  </div>
                </div>

                {/* Navigation Tabs */}
                <div className="flex items-center border-b border-stone-200 gap-6 text-sm font-semibold pt-2">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`pb-2.5 transition-colors border-b-2 cursor-pointer ${
                      activeTab === 'details' ? 'border-rose-600 text-rose-700' : 'border-transparent text-stone-500 hover:text-stone-900'
                    }`}
                  >
                    Overview & Benefits
                  </button>
                  <button
                    onClick={() => setActiveTab('ingredients')}
                    className={`pb-2.5 transition-colors border-b-2 cursor-pointer ${
                      activeTab === 'ingredients' ? 'border-rose-600 text-rose-700' : 'border-transparent text-stone-500 hover:text-stone-900'
                    }`}
                  >
                    Active Ingredients
                  </button>
                  <button
                    onClick={() => setActiveTab('usage')}
                    className={`pb-2.5 transition-colors border-b-2 cursor-pointer ${
                      activeTab === 'usage' ? 'border-rose-600 text-rose-700' : 'border-transparent text-stone-500 hover:text-stone-900'
                    }`}
                  >
                    How to Use
                  </button>
                </div>

                {/* Tab Contents */}
                <div className="min-h-[140px] text-sm text-stone-700">
                  {activeTab === 'details' && (
                    <div className="space-y-4 animate-fadeIn">
                      <p className="leading-relaxed text-stone-600">{product.description}</p>
                      
                      {/* Key Benefits */}
                      <div>
                        <h4 className="font-semibold text-stone-900 mb-2 flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-rose-600" />
                          Key Benefits
                        </h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {product.keyBenefits.map((benefit, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-stone-600">
                              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Suitable Skin types */}
                      {product.skinTypes && product.skinTypes.length > 0 && (
                        <div className="pt-2 flex flex-wrap items-center gap-1.5">
                          <span className="text-xs font-semibold text-stone-500 mr-1">Best For:</span>
                          {product.skinTypes.map((type, i) => (
                            <span key={i} className="px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 text-xs font-medium">
                              {type}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'ingredients' && (
                    <div className="space-y-3 animate-fadeIn">
                      <p className="text-xs text-stone-500">Carefully formulated with key dermatological actives:</p>
                      <div className="flex flex-wrap gap-2">
                        {product.ingredients.map((ing, i) => (
                          <span key={i} className="px-3 py-1.5 rounded-xl bg-rose-50/80 border border-rose-100 text-rose-900 text-xs font-medium flex items-center gap-1.5">
                            <Droplets className="w-3.5 h-3.5 text-rose-500" />
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'usage' && (
                    <div className="space-y-3 animate-fadeIn p-4 rounded-2xl bg-amber-50/40 border border-amber-100">
                      <h4 className="font-semibold text-stone-900 text-sm flex items-center gap-1.5">
                        <HelpCircle className="w-4 h-4 text-amber-700" />
                        Application & Routine Guide
                      </h4>
                      <p className="text-stone-700 text-sm leading-relaxed">{product.usageInstructions}</p>
                    </div>
                  )}
                </div>

              </div>

              {/* Order Actions CTA */}
              <div className="space-y-3 pt-4 border-t border-stone-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* WhatsApp Direct Order */}
                  <a
                    href={`https://wa.me/${shopInfo.whatsapp.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer text-center"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Order via WhatsApp</span>
                  </a>

                  {/* Direct Phone Call */}
                  <a
                    href={`tel:${shopInfo.phone}`}
                    className="w-full py-3.5 px-4 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer text-center"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Boutique ({shopInfo.phone})</span>
                  </a>

                </div>

                <p className="text-center text-[11px] text-stone-400">
                  Pick up at <strong>{shopInfo.location.landmark}</strong> or request same-day Addis Ababa delivery.
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
