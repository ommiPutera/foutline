import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '~/components/ui/tabs.tsx'
import { json, type DataFunctionArgs } from '@remix-run/node'
import { getUser } from '~/utils/session.server.ts'
import type { Post } from '@prisma/client'
import { useLoaderData, useLocation } from '@remix-run/react'
import { GeneralErrorBoundary } from '~/components/error-boundry.tsx'
import { ErrorPage } from '~/components/errors.tsx'
import Board from '~/components/board.tsx'

export type LoaderData = {
  posts: Post[] | null
}

export async function loader({ request }: DataFunctionArgs) {
  const user = await getUser(request)
  if (!user) throw new Response('Not found', { status: 404 })
  const posts: Post[] = await user?.posts

  const data: LoaderData = { posts }
  return json(data)
}

function Index() {
  const { posts } = useLoaderData<LoaderData>()

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

export function ErrorBoundary() {
  const location = useLocation()
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        404: () => (
          <ErrorPage
            title="404 - Oh no, you found a page that's missing stuff."
            subtitle={`"${location.pathname}" is not a page on outline.com. So sorry.`}
          />
        ),
      }}
    />
  )
}


export default Index
