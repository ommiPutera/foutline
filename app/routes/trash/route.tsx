import {type User, type Post} from '@prisma/client'

import {Board} from './board.tsx'

import {json, useLocation} from '@remix-run/react'
import {type ActionFunctionArgs, type LoaderFunctionArgs} from '@remix-run/node'

import {getUser} from '~/utils/session.server.ts'
import {deletePost, getHomeData, restorePost} from './queries.ts'

import {GeneralErrorBoundary} from '~/components/error-boundry.tsx'
import {ErrorPage} from '~/components/errors.tsx'

export enum FormType {
  DELETE = 'DELETE',
  RESTORE = 'RESTORE',
}

export type LoaderData = {
  posts: Post[] | null
}

export async function action({request}: ActionFunctionArgs) {
  const formData = await request.formData()
  const formPayload = Object.fromEntries(formData)
  const _action = String(formPayload['_action'])

  switch (_action) {
    case FormType.DELETE: {
      if (typeof formPayload.id !== 'string') {
        return {formError: `Form not submitted correctly.`}
      }
      return await deletePost({id: formPayload.id})
    }
    case FormType.RESTORE: {
      if (typeof formPayload.id !== 'string') {
        return {formError: `Form not submitted correctly.`}
      }
      return await restorePost({
        id: formPayload.id,
      })
    }
  }
}

export async function loader({request}: LoaderFunctionArgs) {
  const user: User = await getUser(request)
  if (!user) throw new Response('Not found', {status: 404})

  const posts = await getHomeData({
    userId: user.id,
  })

  return json({posts})
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
