import { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductModal } from './components/ProductModal';
import { ShopInfo } from './components/ShopInfo';
import { LocationContact } from './components/LocationContact';
import { Footer } from './components/Footer';
import { SHOP_INFO } from './data/mockData';
import type { Product, ProductCategory } from './types/product';
import { subscribeToProducts } from './services/productService';

function StorefrontContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Real-time synchronization with Firestore DB
    const unsubscribe = subscribeToProducts(
      (firestoreProducts) => {
        setProducts(firestoreProducts);
      },
      (error) => {
        console.warn('Firestore connection event:', error);
      }
    );

    return () => unsubscribe();
  }, []);

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
    <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-stone-50/40 text-stone-800 relative">
      
      {/* Navigation Header with Language Switcher */}
      <Navbar
        shopInfo={SHOP_INFO}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        inStockCount={inStockCount}
        onNavigate={scrollToSection}
      />

      <main className="w-full max-w-full overflow-x-hidden flex-1">
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
          shopPhone={SHOP_INFO.phone}
        />

        {/* Shop Information & Trust Story */}
        <ShopInfo
          shopInfo={SHOP_INFO}
          onExplore={() => scrollToSection('catalog')}
        />

        {/* Store Location & Interactive Map */}
        <LocationContact
          shopInfo={SHOP_INFO}
        />
      </main>

      {/* Footer */}
      <Footer
        shopInfo={SHOP_INFO}
        onSelectCategory={setSelectedCategory}
        onNavigate={scrollToSection}
      />

      {/* Product Details Modal with Fullscreen Viewer */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        shopInfo={SHOP_INFO}
      />

    </div>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <StorefrontContent />
    </LanguageProvider>
  );
}

export default App;
