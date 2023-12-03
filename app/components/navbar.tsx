import { Link } from "@remix-run/react"
import React from "react"
import { BurgerMenu } from "~/utils/icons.tsx"
import { useRootLoader } from "~/utils/use-root-loader.tsx"
import { getLogo } from "./omition-logo.tsx"
import { ButtonLink } from "./ui/button.tsx"
import {
  Popover,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger
} from "./ui/popover.tsx"

function Navbar() {
  const { user } = useRootLoader()
  const Logo = getLogo()

  if (user) return <></>
  return (
    <div className="bg-background use-matter">
      <div className="max-w-screen-2xl mx-auto h-20 md:h-28 flex items-center">
        <nav className="flex items-center w-full px-5vw">
          <div className="flex-1 place-content-start flex items-center gap-8">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <div className="hidden md:flex place-content-end flex-1 gap-3">
            <ButtonLink to="/login" variant="outline">Masuk</ButtonLink>
            <ButtonLink to="/register">Buat akun</ButtonLink>
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

function MobileMenuList({ isOpen }: { isOpen: boolean }) {
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
      <PopoverContent className="w-screen h-screen overflow-y-scroll border-b-0 border-l-0 border-r-0 border-t mt-5 rounded-none pb-32">
        <div className="mt-4 flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <ButtonLink to="/login" variant="outline">Masuk</ButtonLink>
            <ButtonLink to="/register">Buat akun</ButtonLink>
          </div>
        </div>
      </PopoverContent>
    </PopoverPortal>
  )
}

export default Navbar