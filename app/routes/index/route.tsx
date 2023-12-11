import { type LoaderFunctionArgs } from '@remix-run/node'
import { useLiveLoader } from '~/components/hooks/use-live-loader.ts'
import Landing from '~/components/landing/index.tsx'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '~/components/ui/tabs.tsx'
import Board from './board.tsx'
import { getKindeSession } from '~/utils/session.server.ts'

export type LoaderData = {
  isAuthenticated: boolean
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { isAuthenticated } = await getKindeSession(request)
  return { isAuthenticated: isAuthenticated }
}

function Index() {
  const { isAuthenticated } = useLiveLoader<LoaderData>()

  if (!isAuthenticated) return <Landing />
  return (
    <Tabs defaultValue="board">
      <TabsList>
        <TabsTrigger value="board">Board view</TabsTrigger>
      </TabsList>
      <TabsContent value="board" asChild>
        <Board />
      </TabsContent>
    </Tabs>
  )
}

export default Index
