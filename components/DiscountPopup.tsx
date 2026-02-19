"use client"

import { useState, FormEvent } from "react"
import { X, Mail, CheckCircle, Loader2 } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

interface DiscountPopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function DiscountPopup({ isOpen, onClose }: DiscountPopupProps) {
  const locale = useLocale()
  const t = useTranslations("DiscountPopup") // Çeviri namespace'i
  
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus("loading")

    try {
      const response = await fetch("/api/send-discount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, locale }),
      })

      if (response.ok) {
        setStatus("success")
        
        // 3 saniye sonra popup'ı kapat ve state'leri sıfırla
        setTimeout(() => {
          onClose()
          setStatus("idle")
          setEmail("")
        }, 3000)
      } else {
        setStatus("error")
      }
    } catch (error) {
      console.error(error)
      setStatus("error")
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-md p-6 overflow-hidden bg-white shadow-2xl rounded-2xl animate-in zoom-in-95 duration-300">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {status === "success" ? (
          <div className="flex flex-col items-center py-8 text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
            <h3 className="text-2xl font-bold text-gray-900">{t("successTitle")}</h3>
            <p className="text-gray-600">
              {t("successDescPart1")} <strong>{email}</strong> {t("successDescPart2")}
            </p>
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full mb-2">
              <Mail className="w-6 h-6" />
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900">
              {t("title")}
            </h3>
            
            <p className="text-gray-600">
              {t("description")}
            </p>

            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
              <div>
                <input
                  type="email"
                  required
                  placeholder={t("emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-red-600">
                  {t("errorMessage")}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full flex items-center justify-center py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" /> {t("loadingText")}
                  </>
                ) : (
                  t("submitButton")
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}