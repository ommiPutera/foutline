import type { UserType } from "@kinde-oss/kinde-typescript-sdk";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { getSessionManager, kindeClient } from "~/utils/kinde.server.ts";
import { useLiveLoader } from "~/components/hooks/use-live-loader.ts";
import Landing from "~/components/landing/index.tsx";
import { Sidebar } from "~/components/sidebar.tsx";
import { Link } from "@remix-run/react";
import { ToggleTheme } from "~/components/footer.tsx";
import { UserNav } from "~/components/user-nav.tsx";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "~/components/ui/sheet.tsx";
import { PanelLeft } from "lucide-react";
import { Button } from "~/components/ui/button.tsx";

export type LoaderData = {
  isAuthenticated: boolean
  profile?: UserType
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { sessionManager } = await getSessionManager(request)
  const isAuthenticated = await kindeClient.isAuthenticated(sessionManager);
  if (!isAuthenticated) return { isAuthenticated }

  const profile = await kindeClient.getUserProfile(sessionManager);
  return {
    isAuthenticated,
    profile
  }
}

export default function Index() {
  const { isAuthenticated, profile } = useLiveLoader<LoaderData>();

  if (!isAuthenticated) return <Landing />
  return (
    <div className="bg-background h-full">
      <div className="flex">
        <div className="hidden md:block max-w-[280px] px-3 h-full fixed overflow-scroll w-fit border-r border-border">
          <Sidebar />
        </div>
        <div className="md:ml-auto md:w-[calc(100%_-_280px)] w-full">
          <div className="w-full">
            <div className="w-full px-6 py-3 pr-8 items-center flex justify-between mx-auto max-w-screen-2xl border-b border-border">
              <div className="md:hidden block">
                <Sheet>
                  <SheetTrigger>
                    <Button size="icon" variant="ghost">
                      <PanelLeft />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="px-0 overflow-y-scroll w-[280px]">
                    <SheetHeader>
                      <SheetTitle className="text-left px-7">Menu</SheetTitle>
                    </SheetHeader>
                    <Sidebar />
                  </SheetContent>
                </Sheet>
              </div>
              <div className="hidden md:block">
                header
              </div>
              <div className="flex items-center gap-6">
                <div className="hidden md:block">
                  <ToggleTheme />
                </div>
                <UserNav {...profile} />
              </div>
            </div>
            <div className="p-6 mx-auto max-w-screen-2xl">
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
  );
}
