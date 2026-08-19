import React, { useState, useMemo } from 'react';
import { 
  Search, 
  CheckCircle2, 
  Sparkles, 
  ArrowUpDown
} from 'lucide-react';
import type { Product, ProductCategory, SortOption } from '../types/product';
import { ProductCard } from './ProductCard';
import { useLanguage } from '../context/LanguageContext';
import { getCategoryLabel } from '../i18n/translations';

interface ProductCatalogProps {
  products: Product[];
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onViewProductDetails: (product: Product) => void;
  shopPhone: string;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onViewProductDetails,
  shopPhone
}) => {
  const { t } = useLanguage();
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const categories: ProductCategory[] = [
    'All',
    'Skincare',
    'Makeup',
    'Haircare',
    'Fragrance',
    'Body Care',
    'Sun Care'
  ];

  // Quick popular search tags
  const quickTags = ['Sunscreen', 'COSRX', 'Serum', 'Lipstick', 'Perfume', 'Ceramides', 'Olaplex'];

  // Filter and sort logic - AUTOMATICALLY HIDES OUT OF STOCK PRODUCTS
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // 1. AUTOMATIC STOCK FILTER: Automatically hide out of stock items
      if (item.stock <= 0) {
        return false;
      }

      // 2. Category Filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      // 3. Search Query Filter (Title, Brand, Category, Description, Ingredients, Skin Types)
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesBrand = item.brand.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        const matchesSubcategory = item.subcategory ? item.subcategory.toLowerCase().includes(query) : false;
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesIngredients = item.ingredients.some(ing => ing.toLowerCase().includes(query));
        const matchesTags = item.tags.some(tag => tag.toLowerCase().includes(query));

        if (!matchesName && !matchesBrand && !matchesCategory && !matchesSubcategory && !matchesDesc && !matchesIngredients && !matchesTags) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'stock-high') return b.stock - a.stock;
      if (sortBy === 'newest') return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, selectedCategory, searchQuery, sortBy]);

  const outOfStockCount = products.filter(p => p.stock === 0).length;

  return (
    <section id="catalog" className="py-8 sm:py-14 lg:py-20 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full max-w-full overflow-hidden">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10 space-y-2 sm:space-y-3 px-2">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-rose-100 text-rose-800 text-[11px] sm:text-xs font-bold tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 text-rose-600" />
          <span>{t.catalogTag}</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
          {t.catalogTitle}
        </h2>
        <p className="text-stone-600 text-xs sm:text-base font-light">
          {t.catalogSubtext}
        </p>
      </div>

      {/* Search and Filters Bar (Contained width) */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 border border-rose-100/90 shadow-md space-y-3.5 sm:space-y-5 mb-8 w-full overflow-hidden">
        
        {/* Row 1: Search Input & Sort Dropdown */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 sm:gap-4 items-center w-full">
          
          {/* Main search box (16px base font prevents iOS zoom on focus) */}
          <div className="md:col-span-8 relative w-full">
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 sm:py-3 bg-stone-50 hover:bg-rose-50/30 focus:bg-white border border-stone-200 focus:border-rose-400 rounded-xl sm:rounded-2xl text-base md:text-sm placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-rose-400/20 transition-all min-h-[44px]"
            />
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 bg-stone-200/70 hover:bg-stone-300 rounded-full w-5 h-5 flex items-center justify-center cursor-pointer"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort selector */}
          <div className="md:col-span-4 flex items-center gap-2 w-full">
            <ArrowUpDown className="w-4 h-4 text-stone-400 shrink-0 hidden sm:inline" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full py-2.5 sm:py-3 px-3.5 bg-stone-50 border border-stone-200 focus:border-rose-400 rounded-xl sm:rounded-2xl text-xs sm:text-sm text-stone-700 focus:outline-hidden focus:ring-2 focus:ring-rose-400/20 font-medium cursor-pointer min-h-[44px]"
            >
              <option value="featured">{t.sortFeatured}</option>
              <option value="price-low">{t.sortPriceLow}</option>
              <option value="price-high">{t.sortPriceHigh}</option>
              <option value="rating">{t.sortRating}</option>
              <option value="stock-high">{t.sortStock}</option>
            </select>
          </div>

        </div>

        {/* Row 2: Category Filter Tabs (Touch scrollable, contained inside box) */}
        <div className="pt-2 border-t border-stone-100 w-full overflow-hidden">
          <div className="overflow-x-auto no-scrollbar flex items-center gap-1.5 sm:gap-2 py-0.5 w-full">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mr-1 hidden lg:inline shrink-0">
              {t.categoriesLabel}
            </span>
            {categories.map((cat) => {
              const count = products.filter(p => (cat === 'All' || p.category === cat) && p.stock > 0).length;
              const isActive = selectedCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 active:scale-95 min-h-[36px] ${
                    isActive
                      ? 'bg-rose-700 text-white shadow-xs'
                      : 'bg-stone-100/90 hover:bg-rose-50 text-stone-700 hover:text-rose-800'
                  }`}
                >
                  <span>{getCategoryLabel(cat, t)}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${isActive ? 'bg-rose-900/40 text-rose-100' : 'bg-stone-200/80 text-stone-600'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 3: Quick Keyword Pills & Stock Auto-Hide Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1 text-xs text-stone-500 w-full">
          <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
            <span className="font-medium text-stone-400 mr-0.5 text-[11px] sm:text-xs">{t.trendingSearches}</span>
            {quickTags.map((tag) => (
              <button
                key={tag}
                onClick={() => onSearchChange(tag)}
                className="px-2 sm:px-2.5 py-1 rounded-lg bg-rose-50/70 hover:bg-rose-100 text-rose-700 font-medium transition-colors cursor-pointer text-[11px] sm:text-xs active:scale-95"
              >
                #{tag}
              </button>
            ))}
          </div>

          {/* Automatic Stock Status Indicator */}
          <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg sm:rounded-xl border border-emerald-200/60 self-start sm:self-auto shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
            <span className="font-semibold text-[11px] sm:text-xs">
              {t.autoHidingPill} ({outOfStockCount})
            </span>
          </div>
        </div>

      </div>

      {/* Catalog Results Counter Bar */}
      <div className="flex items-center justify-between mb-4 sm:mb-6 px-1 w-full">
        <div className="text-xs sm:text-sm font-medium text-stone-700 truncate pr-2">
          {t.showingCount} <span className="font-bold text-stone-900">{filteredProducts.length}</span> {t.productsUnit}
          {selectedCategory !== 'All' && <span> {t.inCategory} <strong>{getCategoryLabel(selectedCategory, t)}</strong></span>}
          {searchQuery && <span> {t.matching} "<strong>{searchQuery}</strong>"</span>}
        </div>

        {/* Reset filter if active */}
        {(selectedCategory !== 'All' || searchQuery !== '') && (
          <button
            onClick={() => {
              onSelectCategory('All');
              onSearchChange('');
            }}
            className="text-xs font-semibold text-rose-700 hover:text-rose-900 underline cursor-pointer p-1 shrink-0"
          >
            {t.resetFilters}
          </button>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 w-full">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={onViewProductDetails}
              shopPhone={shopPhone}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-12 sm:py-16 px-4 bg-white rounded-2xl sm:rounded-3xl border border-dashed border-stone-200 max-w-md mx-auto space-y-4 w-full">
          <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
            <Search className="w-7 h-7" />
          </div>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900">{t.noMatchesTitle}</h3>
          <p className="text-xs sm:text-sm text-stone-500">
            {t.noMatchesDesc}
          </p>
          <button
            onClick={() => {
              onSelectCategory('All');
              onSearchChange('');
            }}
            className="px-6 py-2.5 rounded-full bg-rose-700 hover:bg-rose-800 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
          >
            {t.clearSearchBtn}
          </button>
        </div>
      )}

    </section>
  );
};
