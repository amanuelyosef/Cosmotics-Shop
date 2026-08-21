import type { ShopDetails } from '../types/product';

export const SHOP_INFO: ShopDetails = {
  name: "Faya Qality Cosmetics",
  tagline: "Pure Radiance & Luxury Beauty Essentials",
  shortBio: "Your premier destination for 100% authentic international and artisan skincare, makeup, fragrances, and haircare in Hawassa.",
  fullStory: "Founded with an unwavering passion for authentic self-care, Faya Qality Cosmetics curates dermatologically tested, premium beauty products sourced directly from verified global brands. We believe true beauty is about confidence, nourishment, and healthy skin. Every product in our catalog is physically inspected, stored in temperature-regulated facilities, and tracked live in our inventory.",
  phone: "+251981839691",
  whatsapp: "+251981839691",
  telegram: "@Qaaliti",
  telegramChannel: "https://t.me/qaaliti1",
  location: {
    city: "Hawassa, Ethiopia",
    area: "Piassa, Hawassa",
    address: "Piassa, Hawassa City, Sidama Region, Ethiopia",
    landmark: "Piassa, Hawassa",
    mallFloor: "Ground Floor, Piassa, Faya Qality Boutique",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.6424564560737!2d38.4680178!3d7.0528452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x17b14571ef760a49%3A0x68843bed4555da44!2sPiassa%20St%2C%20Awasa!5e0!3m2!1sen!2set!4v1700000000000!5m2!1sen!2set",
    googleMapsUrl: "https://maps.app.goo.gl/ynSmCbSd8RS627zY7"
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
      description: "Same-day delivery across Hawassa or convenient pickup at our boutique."
    }
  ]
};

