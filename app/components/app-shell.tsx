import { Link, useLocation } from '@remix-run/react'
import { FileKey2, MoreVertical, PanelLeft, Settings } from 'lucide-react'
import React from 'react'
import { useRootLoader } from '~/utils/use-root-loader.tsx'
import { Sidebar } from './sidebar.tsx'
// import { ToggleTheme } from './toggle-theme.tsx'
import { Button } from './ui/button.tsx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu.tsx'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet.tsx'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip.tsx'
import { UserNav } from './user-nav.tsx'

function AppShell({ children }: React.HTMLAttributes<HTMLDivElement>) {
  const { isAuthenticated } = useRootLoader()

  if (!isAuthenticated) return <>{children}</>
  return <Shell>{children}</Shell>
}

function Shell({ children }: React.HTMLAttributes<HTMLDivElement>) {
  const { profile } = useRootLoader()
  return (
    <div className="h-full bg-background">
      <div className="flex">
        <div className="fixed z-50 hidden h-full w-fit max-w-[var(--sidebar-width)] overflow-scroll border-r border-border md:block">
          <Sidebar />
        </div>
        <div className="relative h-full w-full md:ml-auto md:w-[calc(100%_-_var(--sidebar-width))]">
          <div className="relative h-full w-full">
            <div className="fixed top-0 z-20 mx-auto flex h-[var(--header-height)] w-full max-w-screen-2xl items-center justify-between border-b border-border bg-background py-3 pl-6 pr-4 md:relative md:border-0 md:bg-transparent">
              <MobileSidebar />
              <div className="flex items-center gap-6">
                {/* <ToggleTheme className="hidden md:flex" /> */}
                <UserNav {...profile} />
                <More />
              </div>
            </div>
            <div className="mx-auto mt-[var(--header-height)] max-w-screen-2xl px-4 py-6 md:mt-0 md:py-0">
              {children}
              <div className="m-[3rem] mt-[5rem] flex flex-wrap items-center justify-center gap-3 md:justify-end md:gap-6">
                <p className="text-center text-sm text-muted-foreground md:text-xs">
                  Built by indie developer{' '}
                  <Link
                    to="https://www.linkedin.com/in/ommiputera"
                    target="_blank"
                    className="underline"
                  >
                    Ommi Putera
                  </Link>
                </p>
                <p className="text-center text-sm text-muted-foreground md:text-xs">
                  The source code is available on{' '}
                  <Link
                    to="https://github.com/ommiPutera/omition"
                    target="_blank"
                    className="underline"
                  >
                    Github
                  </Link>
                </p>
                <p className="text-center text-sm text-muted-foreground md:text-xs">
                  <Link to="/" target="_blank" className="underline">
                    Syarat & Ketentuan
                  </Link>
                </p>
                <p className="text-center text-sm text-muted-foreground md:text-xs">
                  <Link to="/" target="_blank" className="underline">
                    Kebijakan privasi
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MobileSidebar() {
  const location = useLocation()
  const [isOpen, setIsOpen] = React.useState(false)
  const [touchStart, setTouchStart] = React.useState<number | null>(null)
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null)

  const minSwipeDistance = 10
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(null)
    if (!e.targetTouches[0]) return
    setTouchStart(e.targetTouches[0].clientX)
  }
  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!e.targetTouches[0]) return
    setTouchEnd(e.targetTouches[0].clientX)
  }
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if (isRightSwipe) setIsOpen(true)
    if (isLeftSwipe) setIsOpen(false)
  }

  React.useEffect(() => {
    // Close when route changed
    if (location.pathname) {
      setIsOpen(false)
    }
  }, [location.pathname])

  return (
    <div>
      <div
        className="fixed left-0 top-0 h-screen w-6 md:hidden"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchMove={onTouchMove}
      />
      <div className="block md:hidden">
        <Sheet open={isOpen} key="testtt">
          <SheetTrigger>
            <Button size="icon" variant="ghost" onClick={() => setIsOpen(true)}>
              <PanelLeft />
            </Button>
          </SheetTrigger>
          <SheetContent
            onClose={() => setIsOpen(false)}
            side="left"
            className="no-scrollbar w-[calc(1rem_+_var(--sidebar-width))] overflow-y-scroll px-2 pb-8"
          >
            <SheetHeader>
              <SheetTitle className="px-7 text-left">Menu</SheetTitle>
            </SheetHeader>
            <Sidebar />
            <div
              className="fixed right-0 top-0 h-screen w-[calc(100%_-_var(--sidebar-width))] md:hidden"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              onTouchMove={onTouchMove}
            />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

function More() {
  return (
    <DropdownMenu>
      <Tooltip>
        <div className="flex h-full">
          <TooltipTrigger>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="transparent" className="rounded-sm">
                <MoreVertical size={18} />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent className="mr-2">
            <p>Pengaturan, kunci, style, dan lainnya..</p>
          </TooltipContent>
        </div>
      </Tooltip>
      <DropdownMenuContent className="mt-1 w-44" align="end" forceMount>
        <DropdownMenuGroup>
          <Link to="/" prefetch="intent">
            <DropdownMenuItem>
              <Settings size="16" className="mr-3" />
              <span>Pengaturan</span>
            </DropdownMenuItem>
          </Link>
          <Link to="/" prefetch="intent">
            <DropdownMenuItem>
              <FileKey2 size="16" className="mr-3" />
              <span>Kunci halaman</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AppShell
