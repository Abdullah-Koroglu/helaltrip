import { MessageCircle } from "lucide-react";
import { getTranslations } from "next-intl/server"
import Link from "next/link";

const ContactButton = async () => {
  const t = await getTranslations("common")

  return (
    <Link
      href="https://wa.me/905338189958?text=Merhaba."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50"
    >
      <div className="
        flex items-center gap-2 sm:gap-3
        px-3 py-2 sm:px-5 sm:py-3
        bg-white border-2 border-blue-600
        rounded-lg sm:rounded-xl
        shadow-md hover:shadow-lg transition
      ">
        <div className="
          flex items-center justify-center
          w-8 h-8 sm:w-10 sm:h-10
          rounded-full border border-blue-600
        ">
          <MessageCircle className="text-blue-600" size={16} />
        </div>

        <div className="leading-tight">
          <div className="font-semibold text-blue-600 text-xs sm:text-sm">
            {t('liveSupport')}
          </div>
          <div className="flex items-center gap-1 text-[10px] sm:text-xs text-green-600">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-600 rounded-full"></span>
            {t('online')}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ContactButton;
