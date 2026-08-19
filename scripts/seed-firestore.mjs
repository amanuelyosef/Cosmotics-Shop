import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, Timestamp, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCNr1z_KY6tfxCIXPuDkqsGFKnAa1OEw-s",
  authDomain: "bedhane-cosmetics-system.firebaseapp.com",
  projectId: "bedhane-cosmetics-system",
  storageBucket: "bedhane-cosmetics-system.firebasestorage.app",
  messagingSenderId: "475640113186",
  appId: "1:475640113186:web:bfbd7f1608cec399c1c27b",
  measurementId: "G-YC9978KPLV"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Mock products strictly matching the required Firestore schema
const PRODUCTS_DATA = [
  {
    id: "prod-01",
    name: "Advanced Snail 96 Mucin Power Essence",
    category: "Skincare",
    description: "Formulated with 96.3% Snail Secretion Filtrate, this lightweight essence quickly absorbs into skin to hydrate deeply, repair damaged skin barriers, and deliver a radiant natural glow without heavy stickiness.",
    image: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608248597359-bb5e71465e3b?auto=format&fit=crop&w=800&q=80"
    ],
    boughtPrice: 1700,
    sellingPrice: 2450,
    quantity: 14,
    keyBenefits: [
      "Deeply hydrates and locks in moisture all day",
      "Soothes redness, irritation, and blemishes",
      "Enhances skin elasticity and collagen vitality",
      "Non-comedogenic and hypoallergenic"
    ],
    featured: true
  },
  {
    id: "prod-02",
    name: "Hyalu-Cica Water-Fit Sun Serum SPF50+ PA++++",
    category: "Sun Care",
    description: "An ultra-lightweight, non-greasy chemical sunscreen that leaves zero white cast. Blended with Madagascar Centella Asiatica and multiple molecular weights of Hyaluronic Acid to soothe while providing maximum UV shielding.",
    image: [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
    ],
    boughtPrice: 1850,
    sellingPrice: 2600,
    quantity: 9,
    keyBenefits: [
      "Broad Spectrum SPF 50+ PA++++ UV protection",
      "Serum-like dewy finish with zero white cast",
      "Calms sensitive and sun-irritated skin",
      "Reef-safe and non-sticky under makeup"
    ],
    featured: true
  },
  {
    id: "prod-03",
    name: "Niacinamide 10% + Zinc 1% Blemish Formula",
    category: "Skincare",
    description: "High-strength vitamin and mineral blemish formula. Niacinamide (Vitamin B3) visibly balances oil sebum production, refines pores, and evens skin tone while Zinc PCA calms inflammation.",
    image: [
      "https://images.unsplash.com/photo-1608248597359-bb5e71465e3b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80"
    ],
    boughtPrice: 1250,
    sellingPrice: 1850,
    quantity: 22,
    keyBenefits: [
      "Regulates excessive sebum and controls shine",
      "Minimizes enlarged pores and uneven texture",
      "Brightens post-inflammatory hyperpigmentation",
      "Lightweight water-based serum"
    ],
    featured: true
  },
  {
    id: "prod-04",
    name: "Rouge Velvet Matte Long-Wear Lipstick",
    category: "Makeup",
    description: "A show-stopping red matte lipstick that delivers hyper-pigmented color in a single stroke with a weightless, cushiony feel that stays comfortable all day.",
    image: [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80"
    ],
    boughtPrice: 2400,
    sellingPrice: 3400,
    quantity: 7,
    keyBenefits: [
      "Up to 12-hour transfer-resistant wear",
      "Richly pigmented velvety finish without drying",
      "Precision bullet applicator for crisp lines",
      "Universal shade flattering across diverse skin tones"
    ],
    featured: true
  },
  {
    id: "prod-05",
    name: "Baccarat Rouge 540 Eau de Parfum",
    category: "Fragrance",
    description: "An iconic luminous and intense oriental floral fragrance with an alchemy of breezy jasmine facets, radiant saffron, ambergris notes, and cedarwood base tones.",
    image: [
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80"
    ],
    boughtPrice: 12000,
    sellingPrice: 16500,
    quantity: 4,
    keyBenefits: [
      "Extraordinary longevity and intoxicating sillage",
      "Rich warm amber floral profile with saffron & cedar",
      "Mastercrafted in France with authentic batch code verified",
      "Unisex signature fragrance"
    ],
    featured: true
  },
  {
    id: "prod-06",
    name: "Brazilian Bum Bum Ultra-Nourishing Body Cream",
    category: "Body Care",
    description: "Award-winning fast-absorbing body cream with caffeine-rich Guaraná extract to visibly tighten and firm skin while infusing body with irresistible Pistachio and Salted Caramel fragrance.",
    image: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80"
    ],
    boughtPrice: 2950,
    sellingPrice: 4200,
    quantity: 6,
    keyBenefits: [
      "Visibly tightens and smooths skin texture",
      "Deeply hydrates with Cupuaçu butter and Açaí oil",
      "Irresistible Cheirosa 62 gourmand aroma",
      "Fast-absorbing with subtle radiant shimmer"
    ],
    featured: false
  },
  {
    id: "prod-07",
    name: "No. 7 Bonding Hair Treatment Oil",
    category: "Haircare",
    description: "A highly-concentrated, weightless reparative styling oil that dramatically increases shine, softness, and color vibrancy while minimizing flyaways and protecting from heat up to 450°F.",
    image: [
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80"
    ],
    boughtPrice: 2500,
    sellingPrice: 3600,
    quantity: 11,
    keyBenefits: [
      "Repairs damaged and compromised hair bonds",
      "Heat protection up to 232°C / 450°F",
      "Reduces frizz and tames flyaways instantly",
      "Ultra-lightweight formula that will not weigh down curls or fine hair"
    ],
    featured: false
  },
  {
    id: "prod-08",
    name: "Soft Pinch Liquid Blush (Shade: Hope)",
    category: "Makeup",
    description: "An airy, lightweight liquid blush that blends seamlessly for a soft, healthy flush. Infused with long-lasting color pigments for all-day radiance without fading.",
    image: [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
    ],
    boughtPrice: 2200,
    sellingPrice: 3100,
    quantity: 8,
    keyBenefits: [
      "Featherweight dewy formula that layers effortlessly",
      "Intense pigment: 1 dot is enough for both cheeks",
      "Botanical blend of Lotus, Gardenia, and Water Lily",
      "Dermatologist tested and cruelty-free"
    ],
    featured: false
  },
  {
    id: "prod-09",
    name: "CeraVe Hydrating Facial Cleanser for Normal to Dry Skin",
    category: "Skincare",
    description: "Developed with dermatologists, this unique lotion-like formula gently cleanses, hydrates, and helps restore the protective skin barrier with three essential ceramides and hyaluronic acid.",
    image: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608248597359-bb5e71465e3b?auto=format&fit=crop&w=800&q=80"
    ],
    boughtPrice: 1350,
    sellingPrice: 1950,
    quantity: 18,
    keyBenefits: [
      "Cleanses without stripping essential skin moisture",
      "3 Essential Ceramides (1, 3, 6-II) to restore barrier",
      "MVE Technology for continuous 24-hour hydration",
      "Fragrance-free, non-foaming, non-irritating"
    ],
    featured: false
  },
  {
    id: "prod-10",
    name: "Santorini Sunrise Nourishing Body Butter",
    category: "Body Care",
    description: "Whipped rich shea and mango butter infused with citrus blossom and Mediterranean sea minerals for silky smooth body hydration.",
    image: [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
    ],
    boughtPrice: 1600,
    sellingPrice: 2300,
    quantity: 5,
    keyBenefits: [
      "48-hour deep barrier hydration",
      "Whipped airy texture that melts on contact",
      "Natural scent of blood orange, bergamot & warm vanilla",
      "100% Vegan and Paraben-free"
    ],
    featured: false
  },
  {
    id: "prod-11",
    name: "Rosemary & Mint Scalp & Hair Strengthening Oil",
    category: "Haircare",
    description: "Infused with Biotin and over 30 essential oils and extracts, this organic hair oil promotes hair length retention, deeply nourishes hair follicles, and conditions dry scalps.",
    image: [
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80"
    ],
    boughtPrice: 1450,
    sellingPrice: 2100,
    quantity: 15,
    keyBenefits: [
      "Encourages longer, stronger, healthier hair growth",
      "Soothes dry, itchy scalp and nourishes split ends",
      "Infused with Biotin and refreshing Rosemary Mint aroma",
      "Safe for natural hair, protective styles, and braids"
    ],
    featured: false
  },
  {
    id: "prod-12",
    name: "Good Girl Eau de Parfum",
    category: "Fragrance",
    description: "A daring yet sophisticated fragrance defined by the contrasting qualities of sweet, alluring Jasmine, rich Cacao, and intoxicating Tonka bean.",
    image: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80"
    ],
    boughtPrice: 8500,
    sellingPrice: 11800,
    quantity: 3,
    keyBenefits: [
      "Iconic stiletto bottle design",
      "Long-lasting evening fragrance with bold projection",
      "Sensual gourmand floral notes",
      "Original packaging with batch check verified"
    ],
    featured: false
  },
  {
    id: "prod-oos-1",
    name: "AHA 30% + BHA 2% Peeling Solution",
    category: "Skincare",
    description: "10-minute exfoliating facial mask that brightens and unclogs pores.",
    image: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80"
    ],
    boughtPrice: 1350,
    sellingPrice: 1950,
    quantity: 0,
    keyBenefits: [
      "Deep chemical exfoliation",
      "Evens skin tone"
    ],
    featured: false
  },
  {
    id: "prod-oos-2",
    name: "Lip Sleeping Mask (Berry)",
    category: "Skincare",
    description: "Overnight leave-on lip mask that replenishes moisture to chapped lips.",
    image: [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80"
    ],
    boughtPrice: 1200,
    sellingPrice: 1800,
    quantity: 0,
    keyBenefits: [
      "Softens flakiness",
      "Vitamin C rich"
    ],
    featured: false
  }
];

async function seedDatabase() {
  console.log("=========================================");
  console.log("Starting Firestore Product Seed Operation");
  console.log(`Target Collection: products (${PRODUCTS_DATA.length} items)`);
  console.log("=========================================\n");

  const now = Timestamp.now();
  let successCount = 0;
  let errorCount = 0;

  for (const item of PRODUCTS_DATA) {
    try {
      const docRef = doc(db, "products", item.id);
      
      const payload = {
        id: item.id,
        name: item.name,
        category: item.category,
        description: item.description,
        image: item.image,
        boughtPrice: item.boughtPrice,
        sellingPrice: item.sellingPrice,
        quantity: item.quantity,
        keyBenefits: item.keyBenefits,
        featured: Boolean(item.featured),
        createdAt: now,
        updatedAt: now
      };

      await setDoc(docRef, payload, { merge: true });
      console.log(`✔ Successfully uploaded product [${item.id}]: "${item.name}"`);
      successCount++;
    } catch (err) {
      console.error(`✖ Failed to upload product [${item.id}]:`, err);
      errorCount++;
    }
  }

  console.log("\n=========================================");
  console.log(`Seeding Summary: ${successCount} succeeded, ${errorCount} failed`);
  console.log("=========================================");

  // Verification step: read back from Firestore
  console.log("\nVerifying data in Firestore 'products' collection...");
  const colRef = collection(db, "products");
  const snapshot = await getDocs(colRef);
  console.log(`Verified: Found ${snapshot.size} documents in Firestore.`);
  
  if (snapshot.size > 0) {
    console.log("\nSample Firestore Document Structure:");
    const firstDoc = snapshot.docs[0].data();
    console.log(JSON.stringify(firstDoc, null, 2));
  }

  process.exit(errorCount === 0 ? 0 : 1);
}

seedDatabase();
