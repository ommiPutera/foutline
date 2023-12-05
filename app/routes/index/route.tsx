import type { LoaderFunctionArgs } from '@remix-run/node'
import { Link } from '@remix-run/react'
import { useLiveLoader } from '~/components/hooks/use-live-loader.ts'
import Landing from '~/components/landing/index.tsx'
import { getSessionManager, kindeClient } from '~/utils/kinde.server.ts'

export type LoaderData = {
  isAuthenticated: boolean
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { sessionManager } = await getSessionManager(request)
  const isAuthenticated = await kindeClient.isAuthenticated(sessionManager)
  if (!isAuthenticated) return { isAuthenticated }

  return { isAuthenticated }
}

function Index() {
  const { isAuthenticated } = useLiveLoader<LoaderData>()

  if (!isAuthenticated) return <Landing />
  return (
    <div>
      <Link to="/logout">Logout</Link>
    </div>
  )
}

export default Index
