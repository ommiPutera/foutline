import Landing from '~/components/landing/index.tsx'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '~/components/ui/tabs.tsx'
import Board from './board.tsx'
import {json, type DataFunctionArgs} from '@remix-run/node'
import {getUser} from '~/utils/session.server.ts'
import type {Post} from '@prisma/client'
import {useLoaderData} from '@remix-run/react'
import {useRootLoader} from '~/utils/use-root-loader.tsx'

export type LoaderData = {
  posts: Post[] | null
}

export async function loader({request}: DataFunctionArgs) {
  const user = await getUser(request)
  const posts: Post[] = await user?.posts

  const data: LoaderData = {posts}
  return json(data)
}

function Index() {
  const {isAuthenticated} = useRootLoader()
  const {posts} = useLoaderData<LoaderData>()

  if (!isAuthenticated) return <Landing />
  return (
    <Tabs defaultValue="board">
      <TabsList>
        <TabsTrigger value="board">Semua</TabsTrigger>
      </TabsList>
      <TabsContent value="board" asChild>
        <Board posts={posts as any} />
      </TabsContent>
    </Tabs>
  )
}

export default Index
