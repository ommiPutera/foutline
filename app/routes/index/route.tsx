import type { LoaderFunctionArgs } from '@remix-run/node'
import { useLiveLoader } from '~/components/hooks/use-live-loader.ts'
import Landing from '~/components/landing/index.tsx'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '~/components/ui/tabs.tsx'
import { getSessionManager, kindeClient } from '~/utils/kinde.server.ts'
import Board from './board.tsx'

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
    <Tabs defaultValue="board">
      <TabsList>
        <TabsTrigger value="board">
          Board
        </TabsTrigger>
      </TabsList>
      <TabsContent value="board" asChild>
        <Board />
      </TabsContent>
    </Tabs>
  )
}

export default Index
