import React from "react";
import { MessageCircle } from "lucide-react";

const ContactButton = () => {
  return (
    <a
      href="https://wa.me/905338189958?text=Merhaba."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
    >
      <div className="flex items-center gap-3 px-5 py-3 bg-white border-2 border-blue-600 rounded-xl shadow-md hover:shadow-lg transition">
        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-blue-600">
          <MessageCircle className="text-blue-600" size={20} />
        </div>

        <div className="leading-tight">
          <div className="font-semibold text-blue-600 text-sm">
            CANLI DESTEK
          </div>
          <div className="flex items-center gap-1 text-xs text-green-600">
            <span className="w-2 h-2 bg-green-600 rounded-full"></span>
            ÇEVRİMİÇİ
          </div>
        </div>
      </div>
    </a>
  );
};

export default ContactButton;
