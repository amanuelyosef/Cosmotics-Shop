import { 
  collection, 
  getDocs, 
  onSnapshot, 
  query 
} from 'firebase/firestore';
import { db } from '../firebase';
import type { Product, ProductCategory, FirestoreProduct } from '../types/product';
import { MOCK_PRODUCTS } from '../data/mockData';

const PRODUCTS_COLLECTION = 'products';

/**
 * Maps Firestore document data to a customer-facing Product model.
 * IMPORTANT: This function deliberately filters out internal/sensitive data
 * like `boughtPrice` so it is NEVER exposed or rendered in the storefront.
 */
export function mapFirestoreDocToProduct(docId: string, data: Partial<FirestoreProduct> & Record<string, any>): Product {
  // Normalize images from either `image` or `images` array
  const rawImages = Array.isArray(data.image) 
    ? data.image 
    : (Array.isArray(data.images) ? data.images : []);

  const fallbackImage = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80';
  const images = rawImages.length > 0 ? rawImages : [fallbackImage];

  // Map category safely to supported ProductCategory
  const validCategories: ProductCategory[] = [
    'Skincare', 
    'Makeup', 
    'Haircare', 
    'Fragrance', 
    'Body Care', 
    'Sun Care'
  ];
  
  const category: ProductCategory = validCategories.includes(data.category as ProductCategory) 
    ? (data.category as ProductCategory) 
    : 'Skincare';

  return {
    id: docId || data.id || '',
    name: data.name || 'Untitled Product',
    brand: data.brand || (data.name ? data.name.split(' ')[0] : 'Faya Qality'),
    category,
    subcategory: data.subcategory || undefined,
    // Use sellingPrice as the customer retail price
    price: typeof data.sellingPrice === 'number' ? data.sellingPrice : (data.price || 0),
    originalPrice: data.originalPrice,
    currency: data.currency || 'ETB',
    // Use quantity as current in-store stock
    stock: typeof data.quantity === 'number' ? data.quantity : (data.stock ?? 0),
    rating: data.rating || 4.9,
    reviewCount: data.reviewCount || 100,
    description: data.description || '',
    keyBenefits: Array.isArray(data.keyBenefits) ? data.keyBenefits : [],
    ingredients: Array.isArray(data.ingredients) ? data.ingredients : [],
    usageInstructions: data.usageInstructions || '',
    volumeSize: data.volumeSize || '',
    skinTypes: Array.isArray(data.skinTypes) ? data.skinTypes : [],
    tags: Array.isArray(data.tags) ? data.tags : [],
    images,
    featured: Boolean(data.featured)
    // NOTE: `boughtPrice`, `createdAt`, `updatedAt` are deliberately not included here!
  };
}

/**
 * Fetch all products once from Firestore with fallback to mock data.
 */
export async function getProducts(): Promise<Product[]> {
  try {
    const productsRef = collection(db, PRODUCTS_COLLECTION);
    const q = query(productsRef);
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.warn('No products found in Firestore. Falling back to local mock data.');
      return MOCK_PRODUCTS;
    }

    return snapshot.docs.map(doc => mapFirestoreDocToProduct(doc.id, doc.data()));
  } catch (error) {
    console.error('Error fetching products from Firestore:', error);
    return MOCK_PRODUCTS;
  }
}

/**
 * Real-time listener for Firestore products collection.
 * Automatically synchronizes changes and falls back to mock data on error.
 */
export function subscribeToProducts(
  onUpdate: (products: Product[]) => void,
  onError?: (error: Error) => void
): () => void {
  try {
    const productsRef = collection(db, PRODUCTS_COLLECTION);
    
    return onSnapshot(
      productsRef,
      (snapshot) => {
        if (snapshot.empty) {
          console.warn('Firestore products collection is empty. Using mock data fallback.');
          onUpdate(MOCK_PRODUCTS);
          return;
        }

        const products: Product[] = snapshot.docs.map((doc) => 
          mapFirestoreDocToProduct(doc.id, doc.data())
        );

        onUpdate(products);
      },
      (error) => {
        console.error('Firestore real-time subscription error:', error);
        if (onError) onError(error);
        // Provide fallback so UI remains functional
        onUpdate(MOCK_PRODUCTS);
      }
    );
  } catch (err) {
    console.error('Failed to setup Firestore subscription:', err);
    onUpdate(MOCK_PRODUCTS);
    return () => {};
  }
}
