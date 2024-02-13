import {useRootLoader} from '~/utils/use-root-loader.tsx'
import {getLogo} from './outline-logo.tsx'
import {Link} from '@remix-run/react'
import {AnchorOrLink} from '~/utils/misc.tsx'
import {ToggleTheme} from './toggle-theme.tsx'

function Footer() {
  const {isAuthenticated} = useRootLoader()
  const Logo = getLogo()

  if (isAuthenticated) return <></>
  return (
    <footer className="bg-muted/50">
      <div className="use-matter mx-auto flex max-w-screen-xl flex-wrap items-center">
        <div className="grid-rows-max-content px-5vw grid w-full grid-cols-4 gap-8 py-12 md:grid-cols-8 md:pb-32 md:pt-24 xl:grid-cols-12">
          <div className="col-span-full flex flex-col gap-5 md:col-span-2 xl:row-span-3">
            <Link to="/" className="w-fit">
              <Logo />
            </Link>
          </div>
          <div className="col-span-2 mt-2 md:col-start-3 md:row-start-1 md:pb-32">
            <SitemapSection />
          </div>
          <div className="col-span-2 mt-2 md:col-start-4 md:row-start-1 md:pb-32">
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
      <h5 className="text-md whitespace-nowrap font-medium">Peta Situs</h5>
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
      <h5 className="text-md whitespace-nowrap font-medium">Produk</h5>
      <ul className="mt-1 md:mt-4">
        <FooterLink name="Catatan" href="/" />
        <FooterLink name="Keuangan Bulanan" href="/tutorial" />
        <FooterLink name="Hutang" href="/tutorial" />
        <FooterLink name="Tabungan" href="/tutorial" />
      </ul>
    </div>
  )
}

export default Footer
