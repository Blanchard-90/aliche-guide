import { MessageCircle } from "lucide-react";

export function WhatsAppFab() {
  return (
    <a
      href="https://wa.me/22900000000?text=Bonjour%20ALITCH%C3%89"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full grid place-items-center text-white shadow-elevated hover:scale-110 transition-transform"
      style={{ backgroundColor: "#25D366" }}
      aria-label="WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-success animate-ping" />
    </a>
  );
}
