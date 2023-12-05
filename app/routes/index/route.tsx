import type {LoaderFunctionArgs} from '@remix-run/node'
import {useLiveLoader} from '~/components/hooks/use-live-loader.ts'
import Landing from '~/components/landing/index.tsx'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '~/components/ui/tabs.tsx'
import {getSessionManager, kindeClient} from '~/utils/kinde.server.ts'

export type LoaderData = {
  isAuthenticated: boolean
}

export const loader = async ({request}: LoaderFunctionArgs) => {
  const {sessionManager} = await getSessionManager(request)
  const isAuthenticated = await kindeClient.isAuthenticated(sessionManager)
  if (!isAuthenticated) return {isAuthenticated}

  return {isAuthenticated}
}

function Index() {
  const {isAuthenticated} = useLiveLoader<LoaderData>()

  if (!isAuthenticated) return <Landing />
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  )
}

export default Index
