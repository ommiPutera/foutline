import {type PostStatus, type Post} from '@prisma/client'
import {prisma} from '~/utils/prisma.server.ts'

export async function updateContent({
  id,
  content,
  preview,
  title,
}: Pick<Post, 'id' | 'content' | 'title' | 'preview'>) {
  return await prisma.post.update({
    where: {
      id: id,
    },
    data: {
      content: content as string,
      title,
      preview,
      updatedAt: new Date(),
    },
  })
}

export async function updateStatusPost({
  id,
  status,
}: {
  id: string
  status: PostStatus
}) {
  return await prisma.post.update({
    where: {
      id: id,
    },
    data: {
      status: status,
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

export async function deletePost({id}: Pick<Post, 'id'>) {
  return await prisma.post.update({
    where: {id},
    data: {deletedAt: new Date()},
  })
}
