import { 
  collection, 
  getDocs, 
  onSnapshot, 
  query 
} from 'firebase/firestore';
import { db } from '../firebase';
import type { Product, ProductCategory, FirestoreProduct } from '../types/product';

const PRODUCTS_COLLECTION = 'products';

/**
 * Maps Firestore document data to a customer-facing Product model.
 * IMPORTANT: This function deliberately filters out internal/sensitive data
 * like `boughtPrice` so it is NEVER exposed or rendered in the storefront.
 */
export function mapFirestoreDocToProduct(docId: string, data: Partial<FirestoreProduct> & Record<string, any>): Product {
  // Normalize images from either `image` (string or array) or `images` array
  const rawImageVal = (data as any).image;
  const rawImagesVal = (data as any).images;
  let rawImages: string[] = [];
  if (Array.isArray(rawImageVal)) {
    rawImages = rawImageVal.filter(Boolean);
  } else if (typeof rawImageVal === 'string' && rawImageVal.trim()) {
    rawImages = [rawImageVal.trim()];
  } else if (Array.isArray(rawImagesVal)) {
    rawImages = rawImagesVal.filter(Boolean);
  }

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
    brand: data.brand || '',
    category,
    subcategory: data.subcategory || undefined,
    // Use sellingPrice as the customer retail price
    price: typeof data.sellingPrice === 'number' ? data.sellingPrice : (typeof data.price === 'number' ? data.price : 0),
    originalPrice: typeof data.originalPrice === 'number' ? data.originalPrice : undefined,
    currency: data.currency || 'ETB',
    // Use quantity as current in-store stock
    stock: typeof data.quantity === 'number' ? data.quantity : (typeof data.stock === 'number' ? data.stock : 0),
    rating: typeof data.rating === 'number' ? data.rating : undefined,
    reviewCount: typeof data.reviewCount === 'number' ? data.reviewCount : undefined,
    description: data.description || '',
    keyBenefits: Array.isArray(data.keyBenefits) ? data.keyBenefits.filter(Boolean) : [],
    ingredients: Array.isArray(data.ingredients) ? data.ingredients.filter(Boolean) : undefined,
    usageInstructions: data.usageInstructions || undefined,
    volumeSize: data.volumeSize || undefined,
    skinTypes: Array.isArray(data.skinTypes) ? data.skinTypes.filter(Boolean) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.filter(Boolean) : undefined,
    images,
    featured: Boolean(data.featured)
    // NOTE: `boughtPrice`, `createdAt`, `updatedAt` are deliberately not included here!
  };
}

/**
 * Fetch all products once from Firestore.
 */
export async function getProducts(): Promise<Product[]> {
  try {
    const productsRef = collection(db, PRODUCTS_COLLECTION);
    const q = query(productsRef);
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return [];
    }

    return snapshot.docs.map(doc => mapFirestoreDocToProduct(doc.id, doc.data()));
  } catch (error) {
    console.error('Error fetching products from Firestore:', error);
    return [];
  }
}

/**
 * Real-time listener for Firestore products collection.
 * Automatically synchronizes changes directly from Firestore DB.
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
        const products: Product[] = snapshot.docs.map((doc) => 
          mapFirestoreDocToProduct(doc.id, doc.data())
        );

        onUpdate(products);
      },
      (error) => {
        console.error('Firestore real-time subscription error:', error);
        if (onError) onError(error);
        onUpdate([]);
      }
    );
  } catch (err) {
    console.error('Failed to setup Firestore subscription:', err);
    onUpdate([]);
    return () => {};
  }
}
