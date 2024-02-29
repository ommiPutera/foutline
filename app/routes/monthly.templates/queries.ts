import type {Post} from '@prisma/client'
import {redirect} from '@remix-run/react'

import type {JSONContent} from '@tiptap/core'

import {prisma} from '~/utils/prisma.server.ts'

export async function createPost({
  title,
  content,
  authorId,
  preview,
  isPublished,
  redirectTo,
  type,
}: Pick<Post, 'title' | 'authorId' | 'isPublished' | 'type'> & {
  content?: JSONContent
  preview?: string
  redirectTo?: string
}) {
  const post = await prisma.post.create({
    data: {
      title,
      isPublished,
      userId: authorId,
      authorId,
      preview,
      type,
      content: content,
    },
  })
  return redirect(redirectTo + post.id ?? '')
}
