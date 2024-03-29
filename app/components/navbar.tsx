import {Link} from '@remix-run/react'
import React from 'react'
import {BurgerMenu} from '~/utils/icons.tsx'
import {useRootLoader} from '~/utils/use-root-loader.tsx'
import {getLogo} from './outline-logo.tsx'

import {Button, ButtonLink} from '~/components/ui/button.tsx'
import {
  Popover,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from '~/components/ui/popover.tsx'
import {Theme, useTheme} from '~/utils/theme-provider.tsx'

function Navbar() {
  const {isAuthenticated} = useRootLoader()
  const [, setTheme] = useTheme()
  const Logo = getLogo()

  if (isAuthenticated) return <></>
  return (
    <div className="use-matter bg-background">
      <div className="max-w-screen-3xl inset-x-0 z-[99999] mx-auto flex h-20 w-full items-center md:h-28">
        <nav className="px-5vw flex w-full items-center">
          <div className="flex flex-1 place-content-start items-center gap-6">
            <Link to="/" prefetch="intent">
              <Logo />
            </Link>
          </div>
          <div>
            <Button
              onClick={() => setTheme(Theme.LIGHT)}
              variant="transparent"
              className="rounded-full"
              size="lg"
            >
              Tentang
            </Button>
            <Button
              onClick={() => setTheme(Theme.LIGHT)}
              variant="transparent"
              className="rounded-full"
              size="lg"
            >
              Fitur
            </Button>
            <Button
              onClick={() => setTheme(Theme.DARK)}
              variant="transparent"
              className="rounded-full"
              size="lg"
            >
              Pricing
            </Button>
          </div>
          <div className="hidden flex-1 place-content-end items-center gap-3 md:flex">
            <ButtonLink
              to="/login"
              variant="ghost"
              size="lg"
              className="rounded-full"
            >
              <span>Masuk</span>
            </ButtonLink>
            <ButtonLink to="/register" size="lg" variant="primary">
              <span>Daftar</span>
            </ButtonLink>
          </div>
          <MobileNav />
        </nav>
      </div>
    </div>
  )
}

function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <div className="flex items-center justify-end lg:hidden">
      <Popover>
        <PopoverTrigger onClick={() => setIsOpen(!isOpen)}>
          <BurgerMenu state={isOpen ? 'open' : 'closed'} />
        </PopoverTrigger>
        <MobileMenuList isOpen={isOpen} />
      </Popover>
    </div>
  )
}

function MobileMenuList({isOpen}: {isOpen: boolean}) {
  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add('fixed')
      document.body.classList.add('overflow-y-scroll')
      document.body.style.height = '100vh'
      document.body.style.width = '100vw'
    } else {
      document.body.classList.remove('fixed')
      document.body.classList.remove('overflow-y-scroll')
      document.body.style.removeProperty('height')
      document.body.style.removeProperty('width')
    }
  }, [isOpen])

  return (
    <PopoverPortal>
      <PopoverContent className="mt-5 h-screen w-screen rounded-none border-x-0 border-b-0 border-t pb-32">
        <div className="mt-4 flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <ButtonLink to="/login" variant="outline">
              Masuk
            </ButtonLink>
            <ButtonLink to="/register">Buat akun</ButtonLink>
          </div>
        </div>
      </PopoverContent>
    </PopoverPortal>
  )
}

export default Navbar
