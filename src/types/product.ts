export type ProductCategory = 
  | 'All'
  | 'Skincare'
  | 'Makeup'
  | 'Haircare'
  | 'Fragrance'
  | 'Body Care'
  | 'Sun Care';

export interface FirestoreProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string[];
  boughtPrice: number; // Internal store cost price - kept secure and NOT revealed in frontend UI
  sellingPrice: number;
  quantity: number;
  keyBenefits: string[];
  featured: boolean;
  createdAt?: any;
  updatedAt?: any;
}

export interface Product {
  id: string;
  name: string;
  brand?: string;
  category: ProductCategory;
  subcategory?: string;
  price: number;
  originalPrice?: number;
  currency: string;
  stock: number; // Actual stock level (quantity)
  rating?: number;
  reviewCount?: number;
  description: string;
  keyBenefits: string[];
  ingredients?: string[];
  usageInstructions?: string;
  volumeSize?: string;
  skinTypes?: string[];
  tags?: string[];
  images: string[];
  featured?: boolean;
}

export interface StoreLocation {
  city: string;
  area: string;
  address: string;
  landmark: string;
  mallFloor?: string;
  mapEmbedUrl: string;
  googleMapsUrl: string;
}

export interface BusinessHours {
  days: string;
  hours: string;
}

export interface ShopDetails {
  name: string;
  tagline: string;
  shortBio: string;
  fullStory: string;
  phone: string;
  whatsapp: string;
  email: string;
  telegram?: string;
  location: StoreLocation;
  hours: BusinessHours[];
  perks: {
    icon: string;
    title: string;
    description: string;
  }[];
}

export type SortOption = 'featured' | 'price-low' | 'price-high' | 'rating' | 'stock-high' | 'newest';
