import {
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from '@remix-run/node'
import { json, useLocation } from '@remix-run/react'

import type { Post, User } from '@prisma/client'

import { GeneralErrorBoundary } from '~/components/error-boundry.tsx'
import { ErrorPage } from '~/components/errors.tsx'

import { getUser } from '~/utils/session.server.ts'

import { Board } from './board.tsx'
import { deletePost, favoritePost, getHomeData } from './queries.ts'

export type LoaderData = {
  posts: Post[] | null
}

export enum FormType {
  DELETE = 'DELETE',
  FAVORITE = 'FAVORITE',
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const formPayload = Object.fromEntries(formData)
  const _action = String(formPayload['_action'])

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
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  const user: User = await getUser(request)
  if (!user) throw new Response('Not found', { status: 404 })

  let order = 'desc'
  let orderField = 'createdAt'

  const posts = await getHomeData({ userId: user.id, order: order, orderField: orderField })
  return json({ posts })
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
