import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const phoneNumber = "2348023100931";
  const message = "Hello PentonRise Event Center! I would like to inquire about booking a hall.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white w-14 h-14 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} />
      {/* Tooltip */}
      <span className="absolute right-full mr-4 bg-burgundy text-white text-xs font-bold py-2 px-4 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap uppercase tracking-wide">
        Chat with us
      </span>
    </a>
  );
}
