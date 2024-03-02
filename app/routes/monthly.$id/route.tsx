import {PostStatus, type Post} from '@prisma/client'

import {
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from '@remix-run/node'
import {defer, useLocation} from '@remix-run/react'

import {GeneralErrorBoundary} from '~/components/error-boundry.tsx'
import {ErrorPage} from '~/components/errors.tsx'

import {getKindeSession, getUser} from '~/utils/session.server.ts'

import {PageIndex} from './page-index.tsx'
import {
  deletePost,
  favoritePost,
  updateContent,
  updateStatusPost,
} from './queries.ts'

export type LoaderData = {
  post?: Post
  postId?: string
}

export type TFocus = {
  isFocus: boolean
  setIsFocus: React.Dispatch<React.SetStateAction<boolean>>
}

export enum FormType {
  UPDATE_CONTENT = 'UPDATE_CONTENT',
  UPDATE_STATUS = 'UPDATE_STATUS',
  DELETE_POST = 'DELETE_POST',
  FAVORITE_POST = 'FAVORITE_POST',
}

export async function loader({request, params}: LoaderFunctionArgs) {
  const {isAuthenticated} = await getKindeSession(request)
  if (!isAuthenticated) throw new Response('Not found', {status: 404})

  const {id} = params
  const user = await getUser(request)
  const post: Post = await user.posts.filter(
    (item: {id: string}) => item.id === id,
  )[0]

  if (!id || !post) return redirect('/')
  const data: LoaderData = {post: post, postId: id}
  return defer(data)
}

export async function action({request}: ActionFunctionArgs) {
  const formData = await request.formData()
  const formPayload = Object.fromEntries(formData)

  switch (formPayload._action) {
    case FormType.DELETE_POST: {
      if (typeof formPayload.id !== 'string') {
        return {formError: `Form not submitted correctly.`}
      }
      await deletePost({id: formPayload.id})
      return redirect('/', {})
    }
    case FormType.FAVORITE_POST: {
      if (
        typeof formPayload.id !== 'string' ||
        typeof formPayload.isFavorite !== 'string'
      ) {
        return {formError: `Form not submitted correctly.`}
      }
      return await favoritePost({
        id: formPayload.id,
        isFavorite: formPayload.isFavorite === 'true' ? true : false,
      })
    }
    case FormType.UPDATE_CONTENT: {
      if (
        typeof formPayload.title !== 'string' ||
        typeof formPayload.id !== 'string' ||
        typeof formPayload.postJSON !== 'string' ||
        typeof formPayload.preview !== 'string'
      ) {
        return {formError: `Form not submitted correctly.`}
      }

      const title =
        formPayload.title.length === 0 ? 'tanpa judul' : formPayload.title
      const id = formPayload.id
      const preview =
        formPayload.preview.length > 160
          ? `${formPayload.preview.substring(0, 160)}..`
          : formPayload.preview
      const content = JSON.parse(formPayload.postJSON)

      return await updateContent({
        id,
        preview,
        content,
        title,
      })
    }
    case FormType.UPDATE_STATUS: {
      if (typeof formPayload.id !== 'string') {
        return {formError: `Form not submitted correctly.`}
      }
      if (
        formPayload.status === PostStatus.COMPLETED ||
        formPayload.status === PostStatus.NOT_STARTED ||
        formPayload.status === PostStatus.UNDERWAY
      ) {
        const post = await updateStatusPost({
          id: formPayload.id,
          status: formPayload.status,
        })
        return {post}
      } else {
        return {formError: `Form not submitted correctly.`}
      }
    }
  }
}

export {PageIndex as default}

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
