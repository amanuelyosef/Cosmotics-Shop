import type { Product, ShopDetails } from '../types/product';

export const SHOP_INFO: ShopDetails = {
  name: "Bedhane Cosmetics",
  tagline: "Pure Radiance & Luxury Beauty Essentials",
  shortBio: "Your premier destination for 100% authentic international and artisan skincare, makeup, fragrances, and haircare in Addis Ababa.",
  fullStory: "Founded with an unwavering passion for authentic self-care, Bedhane Cosmetics curates dermatologically tested, premium beauty products sourced directly from verified global brands. We believe true beauty is about confidence, nourishment, and healthy skin. Every product in our catalog is physically inspected, stored in temperature-regulated facilities, and tracked live in our inventory.",
  phone: "+251 91 123 4567",
  whatsapp: "+251 91 123 4567",
  telegram: "@GTlode",
  email: "contact@bedhanecosmetics.com",
  location: {
    city: "Addis Ababa, Ethiopia",
    area: "Bole Subcity",
    address: "Cameroon Street, Next to Edna Mall / Medhanialem Area",
    landmark: "Behind Bole Medhanialem Cathedral, Ground Floor",
    mallFloor: "Ground Floor, Shop G-14",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.548408992019!2d38.78440937589311!3d9.013627089228836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85a7304f479d%3A0xe541c88102a76f2f!2sBole%20Medhane%20Alem%20Cathedral!5e0!3m2!1sen!2set!4v1700000000000!5m2!1sen!2set",
    googleMapsUrl: "https://maps.google.com/?q=Bole+Medhane+Alem+Cathedral+Addis+Ababa"
  },
  hours: [
    { days: "Monday - Friday", hours: "9:00 AM – 8:00 PM" },
    { days: "Saturday", hours: "9:30 AM – 8:30 PM" },
    { days: "Sunday", hours: "10:00 AM – 6:00 PM" }
  ],
  perks: [
    {
      icon: "ShieldCheck",
      title: "100% Genuine & Authentic",
      description: "Directly imported from verified authorized brand distributors with certified batches."
    },
    {
      icon: "Sparkles",
      title: "Live In-Store Stock",
      description: "Only products currently in stock on our shelves are displayed to ensure instant availability."
    },
    {
      icon: "HeartHandshake",
      title: "Complimentary Beauty Advice",
      description: "Get personalized skin analysis and routine recommendations from our in-store specialists."
    },
    {
      icon: "Truck",
      title: "Fast City-Wide Delivery",
      description: "Same-day delivery across Addis Ababa or convenient pickup at our Bole boutique."
    }
  ]
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod-01",
    name: "Advanced Snail 96 Mucin Power Essence",
    brand: "COSRX",
    category: "Skincare",
    subcategory: "Essence & Serum",
    price: 2450,
    originalPrice: 2800,
    currency: "ETB",
    stock: 14,
    rating: 4.9,
    reviewCount: 184,
    description: "Formulated with 96.3% Snail Secretion Filtrate, this lightweight essence quickly absorbs into skin to hydrate deeply, repair damaged skin barriers, and deliver a radiant natural glow without heavy stickiness.",
    keyBenefits: [
      "Deeply hydrates and locks in moisture all day",
      "Soothes redness, irritation, and blemishes",
      "Enhances skin elasticity and collagen vitality",
      "Non-comedogenic and hypoallergenic"
    ],
    ingredients: [
      "96.3% Snail Secretion Filtrate",
      "Sodium Hyaluronate (Hyaluronic Acid)",
      "Betaine",
      "Allantoin",
      "Panthenol (Vitamin B5)"
    ],
    usageInstructions: "After cleansing and toning, gently pump 2-3 drops onto the palm of your hand and pat evenly across face and neck until fully absorbed.",
    volumeSize: "100 ml / 3.38 fl. oz.",
    skinTypes: ["All Skin Types", "Sensitive", "Dry", "Acne-Prone"],
    tags: ["Best Seller", "K-Beauty", "Restorative"],
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608248597359-bb5e71465e3b?auto=format&fit=crop&w=800&q=80"
    ],
    featured: true
  },
  {
    id: "prod-02",
    name: "Hyalu-Cica Water-Fit Sun Serum SPF50+ PA++++",
    brand: "SKIN1004",
    category: "Sun Care",
    subcategory: "Chemical Sunscreen",
    price: 2600,
    originalPrice: 2950,
    currency: "ETB",
    stock: 9,
    rating: 4.95,
    reviewCount: 220,
    description: "An ultra-lightweight, non-greasy chemical sunscreen that leaves zero white cast. Blended with Madagascar Centella Asiatica and multiple molecular weights of Hyaluronic Acid to soothe while providing maximum UV shielding.",
    keyBenefits: [
      "Broad Spectrum SPF 50+ PA++++ UV protection",
      "Serum-like dewy finish with zero white cast",
      "Calms sensitive and sun-irritated skin",
      "Reef-safe and non-sticky under makeup"
    ],
    ingredients: [
      "Madagascar Centella Asiatica Extract",
      "Hyaluronic Acid Complex",
      "Niacinamide (Vitamin B3)",
      "Green Tea Leaf Extract",
      "Adenosine"
    ],
    usageInstructions: "Apply liberally as the final step of your daytime skincare routine, at least 15 minutes before sun exposure. Reapply every 2 hours.",
    volumeSize: "50 ml / 1.69 fl. oz.",
    skinTypes: ["All Skin Types", "Sensitive", "Oily/Combination"],
    tags: ["Cult Favorite", "Zero White Cast", "Sun Protection"],
    images: [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
    ],
    featured: true
  },
  {
    id: "prod-03",
    name: "Niacinamide 10% + Zinc 1% Blemish Formula",
    brand: "The Ordinary",
    category: "Skincare",
    subcategory: "Face Serum",
    price: 1850,
    currency: "ETB",
    stock: 22,
    rating: 4.7,
    reviewCount: 312,
    description: "High-strength vitamin and mineral blemish formula. Niacinamide (Vitamin B3) visibly balances oil sebum production, refines pores, and evens skin tone while Zinc PCA calms inflammation.",
    keyBenefits: [
      "Regulates excessive sebum and controls shine",
      "Minimizes enlarged pores and uneven texture",
      "Brightens post-inflammatory hyperpigmentation",
      "Lightweight water-based serum"
    ],
    ingredients: [
      "10% Niacinamide",
      "1% Zinc PCA",
      "Tamarindus Indica Seed Gum",
      "Ethoxydiglycol"
    ],
    usageInstructions: "Apply a few drops to entire face in morning and evening before heavier creams. Do not combine with pure Vitamin C in the same routine.",
    volumeSize: "30 ml / 1.0 fl. oz.",
    skinTypes: ["Oily", "Combination", "Blemish-Prone"],
    tags: ["Pore Control", "Oil Control"],
    images: [
      "https://images.unsplash.com/photo-1608248597359-bb5e71465e3b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80"
    ],
    featured: true
  },
  {
    id: "prod-04",
    name: "Rouge Velvet Matte Long-Wear Lipstick",
    brand: "Fenty Beauty",
    category: "Makeup",
    subcategory: "Lipstick",
    price: 3400,
    originalPrice: 3800,
    currency: "ETB",
    stock: 7,
    rating: 4.85,
    reviewCount: 96,
    description: "A show-stopping red matte lipstick that delivers hyper-pigmented color in a single stroke with a weightless, cushiony feel that stays comfortable all day.",
    keyBenefits: [
      "Up to 12-hour transfer-resistant wear",
      "Richly pigmented velvety finish without drying",
      "Precision bullet applicator for crisp lines",
      "Universal shade flattering across diverse skin tones"
    ],
    ingredients: [
      "Jojoba Seed Oil",
      "Vitamin E",
      "Candelilla Wax",
      "Shea Butter"
    ],
    usageInstructions: "Define lip contour with the pointed tip and fill in smoothly across top and bottom lips.",
    volumeSize: "3.5 g / 0.12 oz.",
    skinTypes: ["All Skin Tones"],
    tags: ["Luxury", "Velvet Finish", "Long Wear"],
    images: [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80"
    ],
    featured: true
  },
  {
    id: "prod-05",
    name: "Baccarat Rouge 540 Eau de Parfum",
    brand: "Maison Francis Kurkdjian",
    category: "Fragrance",
    subcategory: "Luxury Perfume",
    price: 16500,
    originalPrice: 18000,
    currency: "ETB",
    stock: 4,
    rating: 5.0,
    reviewCount: 78,
    description: "An iconic luminous and intense oriental floral fragrance with an alchemy of breezy jasmine facets, radiant saffron, ambergris notes, and cedarwood base tones.",
    keyBenefits: [
      "Extraordinary longevity and intoxicating sillage",
      "Rich warm amber floral profile with saffron & cedar",
      "Mastercrafted in France with authentic batch code verified",
      "Unisex signature fragrance"
    ],
    ingredients: [
      "Grandiflorum Jasmine from Egypt",
      "Saffron Accord",
      "Moroccan Bitter Almond",
      "Cedarwood",
      "Ambergris Musky Accord"
    ],
    usageInstructions: "Spray onto pulse points such as wrists, inner elbows, and base of neck for lingering all-day projection.",
    volumeSize: "70 ml / 2.4 fl. oz.",
    skinTypes: ["Unisex"],
    tags: ["Signature Scent", "Niche Luxury", "Limited Stock"],
    images: [
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80"
    ],
    featured: true
  },
  {
    id: "prod-06",
    name: "Brazilian Bum Bum Ultra-Nourishing Body Cream",
    brand: "Sol de Janeiro",
    category: "Body Care",
    subcategory: "Body Moisturizer",
    price: 4200,
    currency: "ETB",
    stock: 6,
    rating: 4.9,
    reviewCount: 145,
    description: "Award-winning fast-absorbing body cream with caffeine-rich Guaraná extract to visibly tighten and firm skin while infusing body with irresistible Pistachio and Salted Caramel fragrance.",
    keyBenefits: [
      "Visibly tightens and smooths skin texture",
      "Deeply hydrates with Cupuaçu butter and Açaí oil",
      "Irresistible Cheirosa 62 gourmand aroma",
      "Fast-absorbing with subtle radiant shimmer"
    ],
    ingredients: [
      "Guaraná Extract (5x more caffeine than coffee)",
      "Cupuaçu Butter",
      "Açaí Oil",
      "Coconut Oil"
    ],
    usageInstructions: "Massage into legs, tummy, arms, and everywhere in circular motions to create warmth for better absorption and circulation.",
    volumeSize: "240 ml / 8.1 fl. oz.",
    skinTypes: ["All Skin Types", "Dry Body"],
    tags: ["Gourmand", "Firming", "Award Winner"],
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-07",
    name: "No. 7 Bonding Hair Treatment Oil",
    brand: "Olaplex",
    category: "Haircare",
    subcategory: "Hair Oil & Serum",
    price: 3600,
    currency: "ETB",
    stock: 11,
    rating: 4.88,
    reviewCount: 167,
    description: "A highly-concentrated, weightless reparative styling oil that dramatically increases shine, softness, and color vibrancy while minimizing flyaways and protecting from heat up to 450°F.",
    keyBenefits: [
      "Repairs damaged and compromised hair bonds",
      "Heat protection up to 232°C / 450°F",
      "Reduces frizz and tames flyaways instantly",
      "Ultra-lightweight formula that will not weigh down curls or fine hair"
    ],
    ingredients: [
      "Bis-Aminopropyl Diglycol Dimaleate",
      "Fermented Green Tea Oil",
      "Sunflower Seed Oil",
      "Pomegranate Seed Oil"
    ],
    usageInstructions: "Turn bottle upside down and tap index finger on the bottom to dispense a metered drop. Work through wet or dry styled hair.",
    volumeSize: "30 ml / 1.0 fl. oz.",
    skinTypes: ["All Hair Types", "Color-Treated", "Damaged"],
    tags: ["Bond Builder", "Heat Protection", "Silky Shine"],
    images: [
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-08",
    name: "Soft Pinch Liquid Blush (Shade: Hope)",
    brand: "Rare Beauty",
    category: "Makeup",
    subcategory: "Blush",
    price: 3100,
    currency: "ETB",
    stock: 8,
    rating: 4.95,
    reviewCount: 260,
    description: "An airy, lightweight liquid blush that blends seamlessly for a soft, healthy flush. Infused with long-lasting color pigments for all-day radiance without fading.",
    keyBenefits: [
      "Featherweight dewy formula that layers effortlessly",
      "Intense pigment: 1 dot is enough for both cheeks",
      "Botanical blend of Lotus, Gardenia, and Water Lily",
      "Dermatologist tested and cruelty-free"
    ],
    ingredients: [
      "White Water Lily Extract",
      "Gardenia Fruit Extract",
      "Nelumbo Nucifera (Lotus) Flower Extract",
      "Vitamin E"
    ],
    usageInstructions: "Gently remove excess product from applicator. Place 1-2 dots on each cheek and blend with fingertips, brush, or beauty sponge.",
    volumeSize: "7.5 ml / 0.25 fl. oz.",
    skinTypes: ["All Skin Types"],
    tags: ["Viral TikTok", "Dewy Glow", "High Pigment"],
    images: [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-09",
    name: "CeraVe Hydrating Facial Cleanser for Normal to Dry Skin",
    brand: "CeraVe",
    category: "Skincare",
    subcategory: "Facial Cleanser",
    price: 1950,
    currency: "ETB",
    stock: 18,
    rating: 4.8,
    reviewCount: 290,
    description: "Developed with dermatologists, this unique lotion-like formula gently cleanses, hydrates, and helps restore the protective skin barrier with three essential ceramides and hyaluronic acid.",
    keyBenefits: [
      "Cleanses without stripping essential skin moisture",
      "3 Essential Ceramides (1, 3, 6-II) to restore barrier",
      "MVE Technology for continuous 24-hour hydration",
      "Fragrance-free, non-foaming, non-irritating"
    ],
    ingredients: [
      "Ceramide NP, AP, EOP",
      "Hyaluronic Acid",
      "Glycerin",
      "Phytosphingosine",
      "Cholesterol"
    ],
    usageInstructions: "Wet skin with lukewarm water. Massage cleanser into skin in a gentle, circular motion. Rinse thoroughly.",
    volumeSize: "473 ml / 16 fl. oz.",
    skinTypes: ["Normal", "Dry", "Sensitive"],
    tags: ["Dermatologist Recommended", "Daily Essential"],
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608248597359-bb5e71465e3b?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-10",
    name: "Santorini Sunrise Nourishing Body Butter",
    brand: "Sol & Bloom",
    category: "Body Care",
    subcategory: "Body Butter",
    price: 2300,
    currency: "ETB",
    stock: 5,
    rating: 4.75,
    reviewCount: 42,
    description: "Whipped rich shea and mango butter infused with citrus blossom and Mediterranean sea minerals for silky smooth body hydration.",
    keyBenefits: [
      "48-hour deep barrier hydration",
      "Whipped airy texture that melts on contact",
      "Natural scent of blood orange, bergamot & warm vanilla",
      "100% Vegan and Paraben-free"
    ],
    ingredients: [
      "Raw Shea Butter",
      "Mango Seed Butter",
      "Sweet Almond Oil",
      "Organic Jojoba Oil",
      "Vitamin E"
    ],
    usageInstructions: "Apply generously post-shower on slightly damp skin to seal in optimal hydration.",
    volumeSize: "200 ml / 6.7 fl. oz.",
    skinTypes: ["Dry", "Very Dry", "All Skin Types"],
    tags: ["Whipped Butter", "Vegan", "Intense Moisture"],
    images: [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-11",
    name: "Rosemary & Mint Scalp & Hair Strengthening Oil",
    brand: "Mielle Organics",
    category: "Haircare",
    subcategory: "Scalp Treatment",
    price: 2100,
    currency: "ETB",
    stock: 15,
    rating: 4.82,
    reviewCount: 195,
    description: "Infused with Biotin and over 30 essential oils and extracts, this organic hair oil promotes hair length retention, deeply nourishes hair follicles, and conditions dry scalps.",
    keyBenefits: [
      "Encourages longer, stronger, healthier hair growth",
      "Soothes dry, itchy scalp and nourishes split ends",
      "Infused with Biotin and refreshing Rosemary Mint aroma",
      "Safe for natural hair, protective styles, and braids"
    ],
    ingredients: [
      "Rosemary Leaf Oil",
      "Peppermint Oil",
      "Biotin",
      "Jojoba Oil",
      "Tea Tree Leaf Oil",
      "Castor Seed Oil"
    ],
    usageInstructions: "Apply a small amount of oil to scalp and massage with fingers. Leave in and style as desired. Can also be used as hot oil treatment.",
    volumeSize: "59 ml / 2 fl. oz.",
    skinTypes: ["All Hair Types", "Curly", "Coily", "Dry Scalp"],
    tags: ["Scalp Care", "Organic", "Growth Oil"],
    images: [
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-12",
    name: "Good Girl Eau de Parfum",
    brand: "Carolina Herrera",
    category: "Fragrance",
    subcategory: "Designer Perfume",
    price: 11800,
    originalPrice: 13000,
    currency: "ETB",
    stock: 3,
    rating: 4.9,
    reviewCount: 110,
    description: "A daring yet sophisticated fragrance defined by the contrasting qualities of sweet, alluring Jasmine, rich Cacao, and intoxicating Tonka bean.",
    keyBenefits: [
      "Iconic stiletto bottle design",
      "Long-lasting evening fragrance with bold projection",
      "Sensual gourmand floral notes",
      "Original packaging with batch check verified"
    ],
    ingredients: [
      "Tuberose",
      "Sambac Jasmine",
      "Roasted Tonka Beans",
      "Rich Cacao",
      "Almond Accord"
    ],
    usageInstructions: "Apply to neck and pulse points. For extended wear, layer over an unscented body moisturizer.",
    volumeSize: "80 ml / 2.7 fl. oz.",
    skinTypes: ["Women"],
    tags: ["Designer", "Evening Scent", "Iconic Bottle"],
    images: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80"
    ]
  },
  // OUT OF STOCK PRODUCTS (Must be automatically hidden by default in the storefront catalog)
  {
    id: "prod-oos-1",
    name: "AHA 30% + BHA 2% Peeling Solution (Out of Stock)",
    brand: "The Ordinary",
    category: "Skincare",
    subcategory: "Exfoliating Solution",
    price: 1950,
    currency: "ETB",
    stock: 0, // Out of Stock!
    rating: 4.6,
    reviewCount: 420,
    description: "10-minute exfoliating facial mask that brightens and unclogs pores.",
    keyBenefits: ["Deep chemical exfoliation", "Evens skin tone"],
    ingredients: ["Glycolic Acid", "Lactic Acid", "Salicylic Acid", "Tasmanian Pepperberry"],
    usageInstructions: "Apply on clean dry skin. Rinse after maximum 10 minutes.",
    volumeSize: "30 ml",
    skinTypes: ["Experienced Users Only"],
    tags: ["Exfoliant"],
    images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80"]
  },
  {
    id: "prod-oos-2",
    name: "Lip Sleeping Mask (Berry) - (Out of Stock)",
    brand: "Laneige",
    category: "Skincare",
    subcategory: "Lip Care",
    price: 1800,
    currency: "ETB",
    stock: 0, // Out of Stock!
    rating: 4.9,
    reviewCount: 380,
    description: "Overnight leave-on lip mask that replenishes moisture to chapped lips.",
    keyBenefits: ["Softens flakiness", "Vitamin C rich"],
    ingredients: ["Berry Fruit Complex", "Murumuru Butter", "Shea Butter"],
    usageInstructions: "Apply before bed with spatula.",
    volumeSize: "20 g",
    skinTypes: ["All Lips"],
    tags: ["Overnight Lip Care"],
    images: ["https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80"]
  }
];
