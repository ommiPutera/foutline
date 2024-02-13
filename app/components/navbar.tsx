import {Link} from '@remix-run/react'
import React from 'react'
import {BurgerMenu} from '~/utils/icons.tsx'
import {useRootLoader} from '~/utils/use-root-loader.tsx'
import {getLogo} from './outline-logo.tsx'
import {ButtonLink} from './ui/button.tsx'
import {
  Popover,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from './ui/popover.tsx'
import {
  ListItem,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu.tsx'
import {Home} from 'lucide-react'

function Navbar() {
  const {isAuthenticated} = useRootLoader()
  const Logo = getLogo()

  if (isAuthenticated) return <></>
  return (
    <div className="use-matter bg-background">
      <div className="mx-auto flex h-20 max-w-screen-xl items-center md:h-28">
        <nav className="px-5vw flex w-full items-center">
          <div className="flex flex-1 place-content-start items-center gap-6">
            <Link to="/" prefetch="intent">
              <Logo />
            </Link>
          </div>
          <NavigationMenu className="hidden md:block">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Pengenalan</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="from-muted/50 to-muted flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <Home className="h-6 w-6" />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            shadcn/ui
                          </div>
                          <p className="text-muted-foreground text-sm leading-tight">
                            Beautifully designed components built with Radix UI
                            and Tailwind CSS.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/docs" title="Introduction">
                      Re-usable components built using Radix UI and Tailwind
                      CSS.
                    </ListItem>
                    <ListItem href="/docs/installation" title="Installation">
                      How to install dependencies and structure your app.
                    </ListItem>
                    <ListItem
                      href="/docs/primitives/typography"
                      title="Typography"
                    >
                      Styles for headings, paragraphs, lists...etc
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Fitur</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {components.map(component => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="hidden flex-1 place-content-end gap-3 md:flex">
            <ButtonLink to="/login" variant="outline">
              Masuk
            </ButtonLink>
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
      <PopoverContent className="mt-5 h-screen w-screen overflow-y-scroll rounded-none border-x-0 border-b-0 border-t pb-32">
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

const components: {title: string; href: string; description: string}[] = [
  {
    title: 'Alert Dialog',
    href: '/docs/primitives/alert-dialog',
    description:
      'A modal dialog that interrupts the user with important content and expects a response.',
  },
  {
    title: 'Hover Card',
    href: '/docs/primitives/hover-card',
    description:
      'For sighted users to preview content available behind a link.',
  },
  {
    title: 'Progress',
    href: '/docs/primitives/progress',
    description:
      'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
  },
  {
    title: 'Scroll-area',
    href: '/docs/primitives/scroll-area',
    description: 'Visually or semantically separates content.',
  },
  {
    title: 'Tabs',
    href: '/docs/primitives/tabs',
    description:
      'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
  },
  {
    title: 'Tooltip',
    href: '/docs/primitives/tooltip',
    description:
      'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
  },
]

export default Navbar
