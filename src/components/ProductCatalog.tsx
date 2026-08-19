import React, { useState, useMemo } from 'react';
import { 
  Search, 
  CheckCircle2, 
  Sparkles, 
  ArrowUpDown
} from 'lucide-react';
import type { Product, ProductCategory, SortOption } from '../types/product';
import { ProductCard } from './ProductCard';

interface ProductCatalogProps {
  products: Product[];
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onViewProductDetails: (product: Product) => void;
  whatsappNumber: string;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onViewProductDetails,
  whatsappNumber
}) => {
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
    <section id="catalog" className="py-12 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-800 text-xs font-bold tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 text-rose-600" />
          <span>Curated Beauty Catalog</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900">
          Available In-Stock Essentials
        </h2>
        <p className="text-stone-600 text-sm sm:text-base font-light">
          Real-time physical stock tracked from our Addis Ababa boutique. Out-of-stock items are automatically hidden so you only see products available today.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-rose-100/90 shadow-md space-y-5 mb-10">
        
        {/* Row 1: Search Input & Sort Dropdown */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Main search box */}
          <div className="md:col-span-8 relative">
            <input
              type="text"
              placeholder="Search by product name, brand (COSRX, Ordinary, Fenty), ingredients..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-11 pr-10 py-3 bg-stone-50 hover:bg-rose-50/30 focus:bg-white border border-stone-200 focus:border-rose-400 rounded-2xl text-sm placeholder:text-stone-400 focus:outline-hidden focus:ring-3 focus:ring-rose-400/20 transition-all"
            />
            <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 bg-stone-200/60 hover:bg-stone-300 rounded-full w-5 h-5 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort selector */}
          <div className="md:col-span-4 flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-stone-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full py-3 px-3.5 bg-stone-50 border border-stone-200 focus:border-rose-400 rounded-2xl text-sm text-stone-700 focus:outline-hidden focus:ring-3 focus:ring-rose-400/20 font-medium cursor-pointer"
            >
              <option value="featured">Featured / Best Match</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="stock-high">Highest Stock</option>
            </select>
          </div>

        </div>

        {/* Row 2: Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider mr-2 hidden sm:inline">
            Filter:
          </span>
          {categories.map((cat) => {
            const count = products.filter(p => (cat === 'All' || p.category === cat) && p.stock > 0).length;
            const isActive = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-rose-700 text-white shadow-sm scale-102'
                    : 'bg-stone-100/90 hover:bg-rose-50 text-stone-700 hover:text-rose-800'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-rose-900/40 text-rose-100' : 'bg-stone-200/80 text-stone-600'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Row 3: Quick Keyword Pills & Stock Auto-Hide Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs text-stone-500">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-medium text-stone-400 mr-1">Trending Searches:</span>
            {quickTags.map((tag) => (
              <button
                key={tag}
                onClick={() => onSearchChange(tag)}
                className="px-2.5 py-1 rounded-lg bg-rose-50/60 hover:bg-rose-100 text-rose-700 font-medium transition-colors cursor-pointer"
              >
                #{tag}
              </button>
            ))}
          </div>

          {/* Automatic Stock Status Indicator */}
          <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200/60 self-start sm:self-auto">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span className="font-semibold">
              Auto-Hiding {outOfStockCount} Out-of-Stock Products
            </span>
          </div>
        </div>

      </div>

      {/* Catalog Results Header */}
      <div className="flex items-center justify-between mb-6 px-1">
        <div className="text-sm font-medium text-stone-700">
          Showing <span className="font-bold text-stone-900">{filteredProducts.length}</span> in-stock {filteredProducts.length === 1 ? 'product' : 'products'}
          {selectedCategory !== 'All' && <span> in <strong>{selectedCategory}</strong></span>}
          {searchQuery && <span> matching "<strong>{searchQuery}</strong>"</span>}
        </div>

        {/* Reset filter if active */}
        {(selectedCategory !== 'All' || searchQuery !== '') && (
          <button
            onClick={() => {
              onSelectCategory('All');
              onSearchChange('');
            }}
            className="text-xs font-semibold text-rose-700 hover:text-rose-900 underline cursor-pointer"
          >
            Reset All Filters
          </button>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={onViewProductDetails}
              whatsappNumber={whatsappNumber}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 bg-white rounded-3xl border border-dashed border-stone-200 max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-xl font-bold text-stone-900">No In-Stock Matches Found</h3>
          <p className="text-xs sm:text-sm text-stone-500">
            We couldn't find any in-stock items matching your criteria. Try adjusting your search query or category filter.
          </p>
          <button
            onClick={() => {
              onSelectCategory('All');
              onSearchChange('');
            }}
            className="px-6 py-2.5 rounded-full bg-rose-700 hover:bg-rose-800 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
          >
            Clear Search & View All Products
          </button>
        </div>
      )}

    </section>
  );
};
