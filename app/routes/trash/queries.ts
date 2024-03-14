import {type Post} from '@prisma/client'

import {prisma} from '~/utils/prisma.server.ts'

export async function getHomeData({userId}: {userId: string}) {
  return prisma.post.findMany({
    where: {
      authorId: userId,
      deletedAt: {not: null},
    },
    orderBy: {updatedAt: 'desc'},
  })
}

export async function deletePost({id}: Pick<Post, 'id'>) {
  return await prisma.post.delete({
    where: {id},
  })
}

export async function deleteAllPost({allId}: {allId: string[]}) {
  return await prisma.post.deleteMany({
    where: {
      id: {
        in: allId,
      },
    },
  })
}

export async function restorePost({id}: Pick<Post, 'id'>) {
  return await prisma.post.update({
    where: {id},
    data: {deletedAt: null},
  })
}
