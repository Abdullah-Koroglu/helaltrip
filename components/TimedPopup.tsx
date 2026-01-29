"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageCircle, Tag } from "lucide-react";
import { useTranslations } from "next-intl";

export default function TimedPopup() {
  const t = useTranslations("TimedPopup");

  const [open, setOpen] = useState(false);
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  const handleOpenChange = (value: boolean) => {
    setOpen(value);
    if (!value) {
      setShowIndicator(true);
    }
  };

  return (
    <>
      {/* POPUP */}
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent
          className="
            p-0 overflow-hidden
            w-[95vw] h-[90vh]
            sm:h-auto sm:max-w-4xl
            rounded-2xl
          "
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 h-[30rem]">

            {/* Image */}
            <div className="relative h-64 sm:h-full">
              <Image
                src="/hotelImages/adenya_1.jpg"
                alt={t("imageAlt")}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center gap-5 p-6 sm:p-8">

              <h2 className="text-xl sm:text-2xl font-bold">
                {t("title")}
              </h2>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("description")}
              </p>

              <Button
                asChild
                size="lg"
                className="gap-2 text-base bg-green-600 hover:bg-green-600/90 transition-all"
              >
                <a
                  href="https://wa.me/905338189958?text=Merhaba,%20özel%20fırsatlar%20hakkında%20bilgi%20almak%20istiyorum."
                  target="_blank"
                  onClick={() => {
                    window.gtag("event", "conversion", {
                      send_to: "AW-123456789/AbCdEfGhIj",
                      event_callback: () => {
                        window.open("https://wa.me/905XXXXXXXXX", "_blank");
                      },
                    });
                  }}
                  
                >
                  <MessageCircle size={20} />
                  {t("whatsappButton")}
                </a>
              </Button>

            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* INDICATOR */}
      {showIndicator && !open && (
        <button
          onClick={() => {
            setOpen(true);
            setShowIndicator(false);
          }}
          className="
            fixed right-0 top-1/2 -translate-y-1/2 z-50
            bg-blue-600 text-white
            px-3 py-2
            rounded-l-full
            shadow-lg
            hover:bg-blue-700
            transition
            flex items-center gap-2
          "
        >
          <Tag fill="#fff" size={15} />

          <span className="hidden sm:block text-sm font-medium">
            {t("indicator")}
          </span>

        </button>
      )}
    </>
  );
}
