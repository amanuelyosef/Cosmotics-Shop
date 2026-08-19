import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  ExternalLink,
  Navigation
} from 'lucide-react';
import type { ShopDetails } from '../types/product';

interface LocationContactProps {
  shopInfo: ShopDetails;
}

export const LocationContact: React.FC<LocationContactProps> = ({ shopInfo }) => {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    subject: 'Product Availability Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.phone) return;

    // Direct WhatsApp redirection
    const text = encodeURIComponent(
      `*New Website Inquiry for Bedhane Cosmetics*

*Name:* ${formState.name}
*Phone:* ${formState.phone}
*Subject:* ${formState.subject}
*Message:* ${formState.message || 'I would like to inquire about cosmetic products in stock.'}`
    );

    window.open(`https://wa.me/${shopInfo.whatsapp.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
    setSubmitted(true);
  };

  return (
    <section id="location" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-800 text-xs font-bold tracking-widest uppercase">
          <MapPin className="w-3.5 h-3.5 text-rose-600" />
          <span>Find Us in Addis Ababa</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900">
          Store Location & Inquiries
        </h2>
        <p className="text-stone-600 text-sm sm:text-base font-light">
          Visit our boutique in Bole or get in touch for custom skin advice, wholesale orders, and same-day delivery across the city.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Location, Hours, Contact details */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Location Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-md space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">Physical Boutique</span>
                <h3 className="font-serif text-xl font-bold text-stone-900 mt-0.5">{shopInfo.location.landmark}</h3>
                <p className="text-stone-600 text-sm mt-1">{shopInfo.location.address}</p>
                <p className="text-stone-500 text-xs mt-0.5">{shopInfo.location.mallFloor} • {shopInfo.location.city}</p>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-3">
              <div className="flex items-center gap-2 text-stone-900 font-semibold text-xs sm:text-sm">
                <Clock className="w-4 h-4 text-rose-600" />
                <span>Boutique Operating Hours</span>
              </div>
              <div className="space-y-2 text-xs sm:text-sm">
                {shopInfo.hours.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-stone-600 border-b border-stone-200/50 pb-1.5 last:border-0 last:pb-0">
                    <span className="font-medium">{item.days}</span>
                    <span className="font-bold text-stone-900">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Channels Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <a
                href={`tel:${shopInfo.phone}`}
                className="p-3.5 rounded-2xl bg-rose-50/80 hover:bg-rose-100 border border-rose-200/70 text-stone-800 transition-all flex items-center gap-3 cursor-pointer"
              >
                <Phone className="w-5 h-5 text-rose-600" />
                <div className="text-left">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Phone Call</span>
                  <span className="text-xs font-bold text-stone-900">{shopInfo.phone}</span>
                </div>
              </a>

              <a
                href={`https://wa.me/${shopInfo.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Bedhane%20Cosmetics`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 text-stone-800 transition-all flex items-center gap-3 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600" />
                <div className="text-left">
                  <span className="text-[10px] uppercase font-bold text-emerald-700 block">WhatsApp Chat</span>
                  <span className="text-xs font-bold text-emerald-900">{shopInfo.whatsapp}</span>
                </div>
              </a>
            </div>

            {/* Google Maps Directions Action */}
            <a
              href={shopInfo.location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-2xl bg-stone-900 hover:bg-rose-700 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Navigation className="w-4 h-4" />
              <span>Open in Google Maps / Get Directions</span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
            </a>

          </div>

          {/* Interactive Map Embed */}
          <div className="rounded-3xl overflow-hidden border border-rose-100 shadow-md h-64 sm:h-72 bg-stone-100 relative">
            <iframe
              src={shopInfo.location.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bedhane Cosmetics Store Location Map"
              className="w-full h-full"
            />
          </div>

        </div>

        {/* Right Column: Contact & Product Reservation Form */}
        <div id="contact" className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-md">
          
          <div className="space-y-2 mb-6">
            <span className="text-xs font-bold text-rose-700 uppercase tracking-widest">Send a Message</span>
            <h3 className="font-serif text-2xl font-bold text-stone-900">Direct Inquiries & Advice</h3>
            <p className="text-stone-500 text-xs sm:text-sm">
              Have a question about product shade matching, skin suitability, or custom orders? Reach out directly.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3 animate-fadeIn">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="font-serif text-xl font-bold text-emerald-900">Message Prepared!</h4>
              <p className="text-xs sm:text-sm text-emerald-700">
                Your inquiry has been opened in WhatsApp for instant chat with our Bole beauty consultants.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormState({ name: '', phone: '', subject: 'Product Availability Inquiry', message: '' });
                }}
                className="mt-4 px-6 py-2 rounded-full bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition-colors cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Selamawit Tadesse"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 focus:border-rose-400 rounded-xl text-sm focus:outline-hidden focus:ring-3 focus:ring-rose-400/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Phone Number / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+251 9... or 09..."
                  value={formState.phone}
                  onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 focus:border-rose-400 rounded-xl text-sm focus:outline-hidden focus:ring-3 focus:ring-rose-400/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Inquiry Topic
                </label>
                <select
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 focus:border-rose-400 rounded-xl text-sm text-stone-700 focus:outline-hidden focus:ring-3 focus:ring-rose-400/20 font-medium"
                >
                  <option value="Product Availability Inquiry">Product In-Stock Availability</option>
                  <option value="Skin Routine Consultation">Skin Type & Routine Advice</option>
                  <option value="Delivery Arrangement">Addis Ababa City Delivery</option>
                  <option value="Bespoke Order / Wholesale">Wholesale / Special Order</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Message / Details
                </label>
                <textarea
                  rows={4}
                  placeholder="Which products are you interested in, or what skin concerns are you looking to treat?"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 focus:border-rose-400 rounded-xl text-sm focus:outline-hidden focus:ring-3 focus:ring-rose-400/20"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-rose-700 hover:bg-rose-800 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry on WhatsApp</span>
              </button>

            </form>
          )}

        </div>

      </div>

    </section>
  );
};
