import {type LoaderFunctionArgs} from '@remix-run/node'
import {useLiveLoader} from '~/components/hooks/use-live-loader.ts'
import Landing from '~/components/landing/index.tsx'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '~/components/ui/tabs.tsx'
import {getSessionManager} from '~/utils/kinde2.server.ts'
import Board from './board.tsx'

export type LoaderData = {
  isAuthenticated: boolean
}

export const loader = async ({request}: LoaderFunctionArgs) => {
  const {isAuthenticated} = await getSessionManager(request)
  if (!isAuthenticated) return {isAuthenticated}

  return {isAuthenticated: isAuthenticated}
}

function Index() {
  const {isAuthenticated} = useLiveLoader<LoaderData>()

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
