import {type Post, type User} from '@prisma/client'

import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node'
import {json, useLocation} from '@remix-run/react'

import {getUser} from '~/utils/session.server.ts'

import {GeneralErrorBoundary} from '~/components/error-boundry.tsx'
import {ErrorPage} from '~/components/errors.tsx'

import {Board} from './board.tsx'
import {deleteAllPost, deletePost, getHomeData, restorePost} from './queries.ts'

export enum FormType {
  DELETE = 'DELETE',
  DELETE_ALL = 'DELETE_ALL',
  RESTORE = 'RESTORE',
}

export type LoaderData = {
  posts: Post[] | null
}

export const meta: MetaFunction = () => {
  return [{title: 'Sampah | Foutline'}]
}

export async function loader({request}: LoaderFunctionArgs) {
  const user: User = await getUser(request)
  if (!user) throw new Response('Not found', {status: 404})

  const posts = await getHomeData({
    userId: user.id,
  })

  return json({posts})
}

export async function action({request}: ActionFunctionArgs) {
  const formData = await request.formData()
  const formPayload = Object.fromEntries(formData)
  const _action = String(formPayload['_action'])

  const id = formPayload['id']
  const allId: string = formPayload['allId'] as unknown as string

  switch (_action) {
    case FormType.DELETE: {
      if (typeof id !== 'string') {
        return {formError: `Form not submitted correctly.`}
      }
      return await deletePost({id: id})
    }
    case FormType.DELETE_ALL: {
      if (typeof allId !== 'string') {
        return {formError: `Form not submitted correctly.`}
      }
      return await deleteAllPost({allId: allId.split(',')})
    }
    case FormType.RESTORE: {
      if (typeof id !== 'string') {
        return {formError: `Form not submitted correctly.`}
      }
      return await restorePost({id: id})
    }
  }
}

export {Board as default}

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
