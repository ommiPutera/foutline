import type { UserType } from '@kinde-oss/kinde-typescript-sdk'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { getSessionManager, kindeClient } from '~/utils/kinde.server.ts'
import { useLiveLoader } from '~/components/hooks/use-live-loader.ts'
import Landing from '~/components/landing/index.tsx'
import { Sidebar } from '~/components/sidebar.tsx'
import { Link } from '@remix-run/react'
import { ToggleTheme } from '~/components/footer.tsx'
import { UserNav } from '~/components/user-nav.tsx'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '~/components/ui/sheet.tsx'
import { PanelLeft } from 'lucide-react'
import { Button } from '~/components/ui/button.tsx'

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

export default function Index() {
  const { isAuthenticated, profile } = useLiveLoader<LoaderData>()

  if (!isAuthenticated) return <Landing />
  return (
    <div className="h-full bg-background">
      <div className="flex">
        <div className="fixed hidden h-full w-fit max-w-[var(--sidebar-width)] overflow-scroll border-r border-border px-3 md:block">
          <Sidebar />
        </div>
        <div className="w-full h-full relative md:ml-auto md:w-[calc(100%_-_var(--sidebar-width))]">
          <div className="w-full h-full relative">
            <div className="fixed h-[var(--header-height)] w-full md:relative top-0 mx-auto flex max-w-screen-2xl items-center justify-between border-b border-border bg-background px-6 py-3 pr-8">
              <div className="block md:hidden">
                <Sheet>
                  <SheetTrigger>
                    <Button size="icon" variant="ghost">
                      <PanelLeft />
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="left"
                    className="w-[calc(3rem_+_var(--sidebar-width))] overflow-y-scroll px-2 no-scrollbar"
                  >
                    <SheetHeader>
                      <SheetTitle className="px-7 text-left">Menu</SheetTitle>
                    </SheetHeader>
                    <Sidebar />
                  </SheetContent>
                </Sheet>
              </div>
              <div className="hidden md:block">header</div>
              <div className="flex items-center gap-6">
                <div className="hidden md:block">
                  <ToggleTheme />
                </div>
                <UserNav {...profile} />
              </div>
            </div>
            <div className="mx-auto mt-[var(--header-height)] md:mt-0 max-w-screen-2xl p-6">
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
