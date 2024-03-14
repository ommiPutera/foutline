import type {Post} from '@prisma/client'
import {prisma} from '~/utils/prisma.server.ts'

export async function getHomeData({
  userId,
  order,
  orderField,
}: {
  userId: string
  order: string
  orderField: string
}) {
  return prisma.post.findMany({
    where: {
      authorId: userId,
      deletedAt: null,
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
