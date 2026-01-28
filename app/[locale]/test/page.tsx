import { getLocale } from "next-intl/server"

export default async function Test() {
  const locale = await getLocale()

  return <h2 className="w-full h-screen text-center text-5xl">{locale}</h2>
}
