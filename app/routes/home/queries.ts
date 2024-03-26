import type {Post} from '@prisma/client'
import {redirect} from '@remix-run/react'

import type {JSONContent} from '@tiptap/core'

import {prisma} from '~/utils/prisma.server.ts'

export async function getHomeData({
  userId,
  order,
  orderField,
  isFavorite,
}: {
  userId: string
  order: string
  orderField: string
  isFavorite: boolean
}) {
  return prisma.post.findMany({
    where: {
      authorId: userId,
      deletedAt: null,
      isFavorite: isFavorite,
    },
    orderBy: {updatedAt: 'desc'},
  })
}

export async function favoritePost({
  id,
  isFavorite,
}: Pick<Post, 'id' | 'isFavorite'>) {
  return await prisma.post.update({
    where: {
      id: id,
    },
    data: {
      isFavorite,
    },
  })
}

export async function deletePost({id}: Pick<Post, 'id'>) {
  return await prisma.post.update({
    where: {id},
    data: {deletedAt: new Date()},
  })
}

export async function duplicatePost({
  content,
  authorId,
  preview,
  isPublished,
  redirectTo,
  type,
}: Pick<Post, 'authorId' | 'isPublished' | 'type'> & {
  content?: JSONContent
  preview?: string
  redirectTo?: string
}) {
  const post = await prisma.post.create({
    data: {
      title: 'tanpa judul',
      isPublished,
      userId: authorId,
      authorId,
      preview,
      type,
      content: JSON.parse(content as any),
    },
  })
  return redirect(redirectTo + post.id ?? '')
}
