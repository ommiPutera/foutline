import {
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from '@remix-run/node'
import {useLocation} from '@remix-run/react'

import type {Post} from '@prisma/client'

import {GeneralErrorBoundary} from '~/components/error-boundry.tsx'
import {ErrorPage} from '~/components/errors.tsx'

import {deletePost} from '~/utils/posts.server.ts'
import {getUser} from '~/utils/session.server.ts'

import {Board} from './board.tsx'

export type LoaderData = {
  posts: Post[] | null
}

export enum FormType {
  DELETE = 'DELETE',
}

export async function action({request}: ActionFunctionArgs) {
  const formData = await request.formData()
  const formPayload = Object.fromEntries(formData)

  switch (formPayload._action) {
    case FormType.DELETE: {
      if (typeof formPayload.id !== 'string') {
        return {formError: `Form not submitted correctly.`}
      }
      await deletePost({id: formPayload.id})
      return redirect('/', {})
    }
  }
}

export async function loader({request}: LoaderFunctionArgs) {
  const user = await getUser(request)
  if (!user) throw new Response('Not found', {status: 404})
  const posts: Post[] = await user?.posts

  return {posts}
}

export {Board as default}

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
