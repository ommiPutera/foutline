import type { UserType } from '@kinde-oss/kinde-typescript-sdk'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { Link } from '@remix-run/react'
import { PanelLeft } from 'lucide-react'
import React from 'react'
import { useLiveLoader } from '~/components/hooks/use-live-loader.ts'
import Landing from '~/components/landing/index.tsx'
import { Sidebar } from '~/components/sidebar.tsx'
import { ToggleTheme } from '~/components/toggle-theme.tsx'
import { Button } from '~/components/ui/button.tsx'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '~/components/ui/sheet.tsx'
import { UserNav } from '~/components/user-nav.tsx'
import { getSessionManager, kindeClient } from '~/utils/kinde.server.ts'

export type LoaderData = {
  isAuthenticated: boolean
  profile?: UserType
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { sessionManager } = await getSessionManager(request)
  const isAuthenticated = await kindeClient.isAuthenticated(sessionManager)
  if (!isAuthenticated) return { isAuthenticated }

  const profile = await kindeClient.getUserProfile(sessionManager)
  return {
    isAuthenticated,
    profile,
  }
}

function MobileSidebar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [touchStart, setTouchStart] = React.useState<number | null>(null)
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null)

  const minSwipeDistance = 24
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
            className="no-scrollbar w-[var(--sidebar-width)] overflow-y-scroll px-2 pb-8"
          >
            <SheetHeader>
              <SheetTitle className="px-7 text-left">Menu</SheetTitle>
            </SheetHeader>
            <Sidebar />
            <div
              className='md:hidden fixed top-0 right-0 h-screen w-[calc(100%_-_var(--sidebar-width))]'
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

function User() {
  const { isAuthenticated, profile } = useLiveLoader<LoaderData>()

  if (!isAuthenticated) return <></>
  return (
    <div className="flex items-center gap-6">
      <div className="hidden md:block">
        <ToggleTheme />
      </div>
      <div>
        <UserNav {...profile} />
      </div>
    </div>
  )
}

function Index() {
  const { isAuthenticated, profile } = useLiveLoader<LoaderData>()

  if (!isAuthenticated) return <Landing />
  return (
    <div className="h-full bg-background">
      <div className="flex">
        <div className="fixed hidden h-full w-fit max-w-[var(--sidebar-width)] overflow-scroll border-r border-border px-3 md:block">
          <Sidebar />
        </div>
        <div className="relative h-full w-full md:ml-auto md:w-[calc(100%_-_var(--sidebar-width))]">
          <div className="relative h-full w-full">
            <div className="fixed top-0 mx-auto flex h-[var(--header-height)] w-full max-w-screen-2xl items-center justify-between border-b border-border bg-background px-6 py-3 pr-8 md:relative">
              <MobileSidebar />
              <User />
            </div>
            <div className="mx-auto mt-[var(--header-height)] max-w-screen-2xl p-6 md:mt-0">
              <p>{profile?.email}</p>
              <Link to="/logout">Logout</Link>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
