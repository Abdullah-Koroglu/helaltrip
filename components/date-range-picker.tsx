"use client"

import * as React from "react"
import { Calendar as CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { tr, enUS, de } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useLocale, useTranslations } from "next-intl"

const localesMap: any = {
  tr: tr,
  en: enUS,
  de: de
}

export function DateRangePicker({
  onChange,
}: {
  onChange: (range: { from: Date; to: Date }) => void
}) {

  // Aktif dil
  const locale = useLocale()
  const t = useTranslations("DatePicker")

  // date-fns locale
  const dateLocale = localesMap[locale] || tr

  const [date, setDate] = React.useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined,
  })

  const handleSelect = (value: any) => {
    setDate(value)

    if (value?.from && value?.to) {
      onChange({
        from: value.from,
        to: value.to,
      })
    }
  }

  return (
    <Popover>

      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal bg-white",
            !date.from && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />

          {date.from ? (
            date.to ? (
              <>
                {format(date.from, "d MMM yyyy", { locale: dateLocale })} –{" "}
                {format(date.to, "d MMM yyyy", { locale: dateLocale })}
              </>
            ) : (
              format(date.from, "d MMM yyyy", { locale: dateLocale })
            )
          ) : (
            <span>{t("placeholder")}</span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0" align="start">
        <Calendar
          mode="range"
          selected={date}
          onSelect={handleSelect}
          numberOfMonths={2}
          locale={dateLocale as any}
          defaultMonth={new Date("2026-06-06")}
        />
      </PopoverContent>

    </Popover>
  )
}
