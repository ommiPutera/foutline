import {redirect} from '@remix-run/node'
import type {JSONContent} from '@tiptap/core'
import {prisma} from './prisma.server.ts'
import type {Post} from '@prisma/client'

export async function createPost({
  title,
  content,
  authorId,
  preview,
  isPublished,
  redirectTo,
}: Pick<Post, 'title' | 'authorId' | 'isPublished'> & {
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
      content: content,
    },
  })
  return redirect(redirectTo + post.id ?? '')
}
