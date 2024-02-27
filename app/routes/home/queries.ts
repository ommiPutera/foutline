import type {Post} from '@prisma/client'
import {prisma} from '~/utils/prisma.server.ts'

export async function getHomeData(userId: string) {
  return prisma.post.findMany({
    where: {
      userId,
    },
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
