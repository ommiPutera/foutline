import type { User } from "@prisma/client"
import bcrypt from 'bcryptjs'
import { sessionStorage } from "./kinde.server.ts"
import { prisma } from "./prisma.server.ts"

function getUserSession(req: Request) {
  return sessionStorage.getSession(req.headers.get('Cookie'))
}

async function getUserId(request: Request) {
  let session = await getUserSession(request)
  let userId = session.get('userId')
  if (typeof userId !== 'string') return 'null'
  return userId
}

async function findUser(userId: string) {
  if (!userId) return null
  return prisma.user.findUnique({where: {id: userId}})
}

export async function register({
  fullName,
  username,
  email,
  id
}: Omit<User, "createdAt" | "updatedAt" | "passwordHash" | "role">) {
  if(!process.env.PASSWORD) throw(new Error('Need PASSWORD'))
  const passwordHash = await bcrypt.hash(process.env.PASSWORD, 10)
  const user = await prisma.user.create({
    data: {
      id,
      fullName,
      username,
      passwordHash,
      email,
      role: 'BASIC'
    },
  })
  return user
}

export {
  getUserSession,
  getUserId,
  findUser
}