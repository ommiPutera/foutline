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

export async function updateTitle({id, title}: {id: string; title: string}) {
  return await prisma.post.update({
    where: {
      id: id,
    },
    data: {
      title,
      updatedAt: new Date(),
    },
  })
}

export async function updateContent({
  id,
  content,
}: {
  id: string
  content: string
}) {
  return await prisma.post.update({
    where: {
      id: id,
    },
    data: {
      content,
      updatedAt: new Date(),
    },
  })
}

export async function deletePost({id}: {id: string}) {
  return await prisma.post.delete({where: {id: id}})
}
