import { type Post } from '@prisma/client';
import {prisma} from '~/utils/prisma.server.ts'

export async function updateContent({
  id,
  content,
  title
}: Pick<Post, "id" | "content" | "title">) {
  return await prisma.post.update({
    where: {
      id: id,
    },
    data: {
      content: content as string,
      title,
      updatedAt: new Date(),
    },
  })
}