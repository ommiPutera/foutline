import { useRootLoader } from "~/utils/use-root-loader.tsx"
import { getLogo } from "./omition-logo.tsx"
import { Link } from "@remix-run/react"
import { AnchorOrLink } from "~/utils/misc.tsx"
import { Button } from "./ui/button.tsx"
import { Laptop, MoonStar, Sun } from "lucide-react"
import { Theme, getSystemTheme, useTheme } from "~/utils/theme-provider.tsx"

function Footer() {
  const { user } = useRootLoader()
  const Logo = getLogo()

  if (user) return <></>
  return (
    <footer className="bg-background border-t border-input mt-auto">
      <div className="max-w-screen-2xl mx-auto h-16 md:h-24 flex flex-wrap items-center use-matter">
        <div className="grid grid-rows-max-content w-full py-12 md:pb-32 md:pt-24 px-5vw grid-cols-4 md:grid-cols-8 xl:grid-cols-12 gap-8">
          <div className="flex flex-col gap-12 col-span-full md:col-span-2 xl:row-span-3">
            <Link to="/" className="w-fit">
              <Logo />
            </Link>
            <div className="mt-auto">
              <p className="text-sm">
                © {new Date().getFullYear()} Omition, Inc.
              </p>
              <p className="text-sm mt-1">
                Built by <span><Link to='https://github.com/ommiPutera' target="_blank" className="underline">Ommi Putera</Link></span>
              </p>
            </div>
          </div>
          <div className="col-span-2 md:col-start-3 md:row-start-1 md:pb-32">
            <SitemapSection />
          </div>
          <div className="col-span-2 md:col-start-4 md:row-start-1 md:pb-32">
            <ProductSection />
          </div>
          <div className="col-span-2 md:col-start-12 md:row-start-1 md:pb-32">
            <ToggleTheme />
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({
  name,
  href,
  reload,
}: {
  name: string
  href: string
  reload?: boolean
}) {
  return (
    <li className="py-2">
      <AnchorOrLink
        prefetch={href.startsWith('http') ? undefined : 'intent'}
        href={href}
        className="inline-block whitespace-nowrap text-sm"
        reload={reload}
      >
        {name}
      </AnchorOrLink>
    </li>
  )
}

function SitemapSection() {
  return (
    <div>
      <h5 className="whitespace-nowrap text-md font-medium">Peta Situs</h5>
      <ul className="mt-1 md:mt-4">
        <FooterLink name="Beranda" href="/" />
        <FooterLink name="Tutorial" href="/tutorial" />
      </ul>
    </div>
  )
}

function ProductSection() {
  return (
    <div>
      <h5 className="whitespace-nowrap text-md font-medium">Produk</h5>
      <ul className="mt-1 md:mt-4">
        <FooterLink name="Catatan" href="/" />
        <FooterLink name="Keuangan Bulanan" href="/tutorial" />
        <FooterLink name="Hutang" href="/tutorial" />
        <FooterLink name="Tabungan" href="/tutorial" />
      </ul>
    </div>
  )
}

function ToggleTheme() {
  const [, setTheme] = useTheme()
  const systemTheme = getSystemTheme()

  return (
    <div className="flex border rounded-md w-fit">
      <Button
        size="icon"
        variant="ghost"
        onClick={() => setTheme(Theme.LIGHT)}
      >
        <Sun size="18" className="text-foreground" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => setTheme(Theme.DARK)}
      >
        <MoonStar size="18" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => setTheme(systemTheme)}
      >
        <Laptop size="18" />
      </Button>
    </div>
  )
}

export default Footer