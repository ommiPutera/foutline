import {prisma} from '~/utils/prisma.server.ts'

export async function getHomeData(userId: string) {
  return prisma.post.findMany({
    where: {
      userId,
    },
  })
}
