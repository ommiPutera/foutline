import { PanelLeft } from 'lucide-react'
import React from 'react'
import { useRootLoader } from '~/utils/use-root-loader.tsx'
import { Sidebar } from './sidebar.tsx'
import { ToggleTheme } from './toggle-theme.tsx'
import { Button } from './ui/button.tsx'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet.tsx'
import { UserNav } from './user-nav.tsx'
import { useLocation } from '@remix-run/react'

function AppShell({ children }: React.HTMLAttributes<HTMLDivElement>) {
  const { profile, isAuthenticated } = useRootLoader()

  if (!isAuthenticated) return <>{children}</>
  return (
    <div className="h-full bg-background">
      <div className="flex">
        <div className="fixed hidden h-full w-fit max-w-[var(--sidebar-width)] overflow-scroll border-r border-border px-3 md:block">
          <Sidebar />
        </div>
        <div className="relative h-full w-full md:ml-auto md:w-[calc(100%_-_var(--sidebar-width))]">
          <div className="relative h-full w-full">
            <div className="fixed top-0 z-20 mx-auto flex h-[var(--header-height)] w-full max-w-screen-2xl items-center justify-between border-b border-border bg-background px-6 py-3 pr-8 md:relative md:border-0">
              <MobileSidebar />
              <div className="flex items-center gap-6">
                <div className="hidden md:block">
                  <ToggleTheme />
                </div>
                <div>
                  <UserNav {...profile} />
                </div>
              </div>
            </div>
            <div className="mx-auto mt-[var(--header-height)] max-w-screen-2xl px-6 py-6 md:mt-0 md:py-0">
              {children}
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
        <Sheet open={isOpen}>
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
export default AppShell
