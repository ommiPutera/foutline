import {
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from '@remix-run/node'
import { defer, useLocation } from '@remix-run/react'

import type { Post, PostType, User } from '@prisma/client'

import { type JSONContent } from '@tiptap/core'

import { GeneralErrorBoundary } from '~/components/error-boundry.tsx'
import { ErrorPage } from '~/components/errors.tsx'

import { getUser } from '~/utils/session.server.ts'

import { Board } from './board.tsx'
import {
  deletePost,
  duplicatePost,
  favoritePost,
  getHomeData,
} from './queries.ts'

export type LoaderData = {
  posts: Post[] | null
  favorites: Post[] | null
}

export enum FormType {
  DELETE = 'DELETE',
  FAVORITE = 'FAVORITE',
  DUPLICATE = 'DUPLICATE',
}

export async function loader({ request }: LoaderFunctionArgs) {
  const user: User = await getUser(request)
  if (!user) throw new Response('Not found', { status: 404 })

  let order = 'desc'
  let orderField = 'createdAt'

  const posts = getHomeData({
    userId: user.id,
    order: order,
    orderField: orderField,
    isFavorite: false,
  })
  const favorites = getHomeData({
    userId: user.id,
    order: order,
    orderField: orderField,
    isFavorite: true,
  })
  return defer({ posts, favorites })
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const formPayload = Object.fromEntries(formData)
  const _action = String(formPayload['_action'])

  const user = await getUser(request)
  if (!user) return { formError: 'invalid' }

  switch (_action) {
    case FormType.DELETE: {
      if (typeof formPayload.id !== 'string') {
        return { formError: `Form not submitted correctly.` }
      }
      await deletePost({ id: formPayload.id })
      return redirect('/', {})
    }
    case FormType.FAVORITE: {
      if (
        typeof formPayload.id !== 'string' ||
        typeof formPayload.isFavorite !== 'string'
      ) {
        return { formError: `Form not submitted correctly.` }
      }
      return await favoritePost({
        id: formPayload.id,
        isFavorite: formPayload.isFavorite === 'true' ? true : false,
      })
    }
    case FormType.DUPLICATE: {
      if (
        typeof formPayload.content !== 'string' ||
        typeof formPayload.preview !== 'string' ||
        typeof formPayload.type !== 'string'
      ) {
        return { formError: `Form not submitted correctly.` }
      }

      return await duplicatePost({
        authorId: user.id,
        isPublished: true,
        content: formPayload.content as any as JSONContent,
        preview: formPayload.preview,
        type: formPayload.type as PostType,
        redirectTo: '/monthly/',
      })
    }
  }
}

export { Board as default }

export function ErrorBoundary() {
  const location = useLocation()
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        404: () => (
          <ErrorPage
            title="404 - Terjadi kesalahan"
            subtitle={`"${location.pathname}" bukanlah sebuah halaman di outline.com`}
          />
        ),
      }}
    />
  )
}
