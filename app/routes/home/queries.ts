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
    },
    orderBy: {[orderField]: order},
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

export async function deletePost({id}: {id: string}) {
  return await prisma.post.delete({
    where: {
      id: id,
    },
  })
}
