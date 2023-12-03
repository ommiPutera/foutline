import type { UserType } from "@kinde-oss/kinde-typescript-sdk";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { getSessionManager, kindeClient } from "~/utils/kinde.server.ts";
import { useLiveLoader } from "~/components/hooks/use-live-loader.ts";
import Landing from "~/components/landing/index.tsx";
import { Sidebar } from "~/components/sidebar.tsx";
import { Link } from "@remix-run/react";
import { ToggleTheme } from "~/components/footer.tsx";
import { UserNav } from "~/components/user-nav.tsx";

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
    <div className="hidden md:block">
      <div className="bg-background h-full">
        <div className="flex">
          <div className="max-w-[240px] h-full fixed overflow-visible w-fit border-r border-border">
            <Sidebar className="hidden lg:block" />
          </div>
          <div style={{ width: 'calc(100% - 240px)' }} className="ml-auto">
            <div className="w-full">
              <div className="px-6 py-3 pr-8 items-center flex justify-between mx-auto max-w-screen-2xl border-b border-border">
                <div>
                  header
                </div>
                <div className="flex items-center gap-6">
                  <ToggleTheme />
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
    </div>
  );
}
