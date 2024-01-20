import Landing from '~/components/landing/index.tsx'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '~/components/ui/tabs.tsx'
import Board from './board.tsx'
import {type DataFunctionArgs} from '@remix-run/node'
import {getKindeSession, getUser} from '~/utils/session.server.ts'
import type {Post} from '@prisma/client'
import {useLoaderData} from '@remix-run/react'

export type LoaderData = {
  posts: Post[] | null
  isAuthenticated: boolean
}

export async function loader({request}: DataFunctionArgs) {
  const {isAuthenticated} = await getKindeSession(request)
  if (!isAuthenticated) return null

  const user = await getUser(request)
  const posts: Post[] = await user.posts

  const data: LoaderData = {
    posts,
    isAuthenticated,
  }
  return data
}

function Index() {
  const {isAuthenticated, posts} = useLoaderData<LoaderData>()

  if (!isAuthenticated) return <Landing />
  return (
    <Tabs defaultValue="board">
      <TabsList>
        <TabsTrigger value="board">Semua</TabsTrigger>
      </TabsList>
      <TabsContent value="board" asChild>
        {/* @ts-ignore */}
        <Board posts={posts} />
      </TabsContent>
    </Tabs>
  )
}

export default Index
