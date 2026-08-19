import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductModal } from './components/ProductModal';
import { ShopInfo } from './components/ShopInfo';
import { LocationContact } from './components/LocationContact';
import { Footer } from './components/Footer';
import { MOCK_PRODUCTS, SHOP_INFO } from './data/mockData';
import type { Product, ProductCategory } from './types/product';

export function App() {
  const [products] = useState<Product[]>(MOCK_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const inStockCount = products.filter(p => p.stock > 0).length;

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50/40 text-stone-800">
      
      {/* Navigation Header */}
      <Navbar
        shopInfo={SHOP_INFO}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        inStockCount={inStockCount}
        onNavigate={scrollToSection}
      />

      {/* Hero Showcase Banner */}
      <Hero
        shopInfo={SHOP_INFO}
        inStockCount={inStockCount}
        onExplore={() => scrollToSection('catalog')}
        onViewLocation={() => scrollToSection('location')}
      />

      {/* Main Catalog & Stock Tracking */}
      <ProductCatalog
        products={products}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onViewProductDetails={setSelectedProduct}
        whatsappNumber={SHOP_INFO.whatsapp}
      />

      {/* Shop Information & Trust Story */}
      <ShopInfo
        shopInfo={SHOP_INFO}
        onExplore={() => scrollToSection('catalog')}
      />

      {/* Store Location & Interactive Contact Form */}
      <LocationContact
        shopInfo={SHOP_INFO}
      />

      {/* Footer */}
      <Footer
        shopInfo={SHOP_INFO}
        onSelectCategory={setSelectedCategory}
        onNavigate={scrollToSection}
      />

      {/* Product Details Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        shopInfo={SHOP_INFO}
      />

    </div>
  );
}

export default App;
