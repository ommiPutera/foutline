import { json, redirect, type ActionFunctionArgs, type DataFunctionArgs } from '@remix-run/node'
import { useLoaderData, useLocation } from '@remix-run/react'

import type { Post } from '@prisma/client'

import { LayoutGrid, Lightbulb, List, Plus } from 'lucide-react'

import FilterButton from '~/components/board/filter-button.tsx'
import SortButton from '~/components/board/sort-button.tsx'
import { GeneralErrorBoundary } from '~/components/error-boundry.tsx'
import { ErrorPage } from '~/components/errors.tsx'
import { CreatePostDialog } from '~/components/templates/dialogs.tsx'
import { Button } from '~/components/ui/button.tsx'

import { deletePost } from '~/utils/posts.server.ts'
import { getUser } from '~/utils/session.server.ts'
import CardItem from './card-item.tsx'

export type LoaderData = {
  posts: Post[] | null
}

export enum FormType {
  DELETE = 'DELETE',
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const formPayload = Object.fromEntries(formData)
  console.log("formPayload: ", formPayload)

  switch (formPayload._action) {
    case FormType.DELETE: {
      if (typeof formPayload.id !== 'string') {
        return { formError: `Form not submitted correctly.` }
      }
      await deletePost({ id: formPayload.id })
      return redirect('/', {})
    }
  }
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
    <div className="flex min-h-screen md:gap-4">
      <div className="flex w-full flex-col gap-4 pr-4 md:gap-3">
        <Tools />
        {posts?.length ? (
          // @ts-ignore
          <Cards posts={posts} />
        ) : (
          <div className="mt-44 flex flex-col items-center justify-center gap-6">
            <div className="bg-muted-foreground/20 border-muted-foreground/30 rounded-full border p-4">
              <Lightbulb className="stroke-muted-foreground h-10 w-10" />
            </div>
            <p className="text-muted-foreground text-center text-base">
              Catatan yang Anda buat akan muncul di sini..
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function Tools() {
  return (
    <div className="bg-background flex items-center justify-between">
      <div className="hidden md:flex md:items-center md:gap-1">
        <Button size="icon" variant="ghost">
          <LayoutGrid size={16} />
        </Button>
        <Button size="icon" variant="ghost">
          <List size={16} />
        </Button>
      </div>
      <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
        <div className="flex items-center gap-2">
          <FilterButton />
          <SortButton />
        </div>
        <CreatePostDialog withoutTooltip>
          <Button asChild size="sm" className="w-full">
            <div className="flex items-center gap-2">
              <Plus size={16} />
              Halaman baru
            </div>
          </Button>
        </CreatePostDialog>
      </div>
    </div>
  )
}

function Cards({ posts }: { posts: Post[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 py-4 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {posts.map(post => (
        <CardItem key={post.id} {...post} />
      ))}
    </div>
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
