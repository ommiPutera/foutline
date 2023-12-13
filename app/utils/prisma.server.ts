import type {Session} from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import {remember} from '@epic-web/remember'
import chalk from 'chalk'
import {redirect} from '@remix-run/node'

const logThreshold = 500
// const sessionExpirationTime = 1000 * 20
const sessionExpirationTime = 1000 * 60 * 60 * 24 * 365
const prisma = process.env.NODE_ENV === 'development' ? remember('prisma', getClient) :  new PrismaClient().$extends(withAccelerate())

function getClient(): PrismaClient {
  // NOTE: during development if you change anything in this function, remember
  // that this only runs once per server restart and won't automatically be
  // re-run per request like everything else is.
  const client = new PrismaClient({
    log: [
      {level: 'query', emit: 'event'},
      {level: 'error', emit: 'stdout'},
      {level: 'info', emit: 'stdout'},
      {level: 'warn', emit: 'stdout'},
    ],
  })
  client.$on('query', async e => {
    if (e.duration < logThreshold) return
    const color =
      e.duration < logThreshold * 1.1
        ? 'green'
        : e.duration < logThreshold * 1.2
          ? 'blue'
          : e.duration < logThreshold * 1.3
            ? 'yellow'
            : e.duration < logThreshold * 1.4
              ? 'redBright'
              : 'red'
    const dur = chalk[color](`${e.duration}ms`)
    console.info(`prisma:query - ${dur} - ${e.query}`)
  })
  // make the connection eagerly so the first request doesn't have to wait
  void client.$connect()
  return client
}

async function createSession(
  sessionData: Omit<Session, 'id' | 'expirationDate' | 'createdAt'>,
) {
  return prisma.session.create({
    data: {
      ...sessionData,
      expirationDate: new Date(Date.now() + sessionExpirationTime),
    },
  })
}

async function getUserFormSessionId(sessionId: string) {
  const session = await prisma.session.findUnique({
    where: {id: sessionId},
    include: {user: true},
  })
  if (!session) {
    throw redirect('/logout')
  }
  return await prisma.user.findFirst({
    where: {email: session.user?.email},
    include: {posts: true, sessions: true},
  })
}

export {prisma, sessionExpirationTime, getUserFormSessionId, createSession}
