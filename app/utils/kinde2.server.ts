import {
  createKindeServerClient,
  GrantType,
  type SessionManager,
} from '@kinde-oss/kinde-typescript-sdk'
import type {User} from '@prisma/client'
import {createCookie, createFileSessionStorage} from '@remix-run/node'
import bcrypt from 'bcryptjs'
import {
  createSession,
  getUserFormSessionId,
  prisma,
  sessionExpirationTime,
} from './prisma.server.ts'
import {createUpstashSessionStorage} from './upstash.server.ts'

const EXPIRATION_DURATION_IN_SECONDS = sessionExpirationTime / 1000
const sessionIdKey = '__session_id__'

let sessionSecret = process.env.SESSION_SECRET
if (!sessionSecret) {
  throw new Error('Must enviornment variable SESSION_SECRET')
}

const expires = new Date()
expires.setSeconds(expires.getSeconds() + EXPIRATION_DURATION_IN_SECONDS)

const sessionCookie = createCookie('upstash_session', {
  secure: true,
  secrets: [sessionSecret],
  sameSite: 'lax',
  path: '/',
  maxAge: sessionExpirationTime / 1000,
  httpOnly: true,
})

const {getSession, commitSession, destroySession} =
  process.env.NODE_ENV === 'development'
    ? createFileSessionStorage({cookie: sessionCookie, dir: './sessions'})
    : createUpstashSessionStorage(sessionCookie)

async function getSessionManager(request: Request) {
  const session = await getSession(request.headers.get('Cookie'))
  const getSessionId = () => session.get(sessionIdKey) as string | undefined
  const unsetSessionId = () => session.unset(sessionIdKey)

  const sessionManager: SessionManager = {
    async getSessionItem(key: string) {
      return session.get(key)
    },
    async setSessionItem(key: string, value: unknown) {
      session.set(key, value)
      await commitSession(session)
    },
    async removeSessionItem(key: string) {
      session.unset(key)
    },
    async destroySession() {
      await destroySession(session)
    },
  }

  const isAuthenticated = await kindeClient.isAuthenticated(sessionManager)
  let profile = null
  if (isAuthenticated) {
    profile = await kindeClient.getUserProfile(sessionManager)
  }

  return {
    sessionManager,
    session,
    getSessionId: async () => {
      const token = getSessionId()
      if (!token) return null
      return token
    },
    unsetSessionId,
    isAuthenticated,
    profile,
    getUser: async () => {
      const token = getSessionId()
      if (!token) return null
      return getUserFormSessionId(token)
    },
    signOut,
    signUp,
  }
}

async function signOut(request: Request) {
  const {getSessionId, unsetSessionId} = await getSessionManager(request)
  const sessionId = await getSessionId()
  if (sessionId) {
    unsetSessionId()
    await prisma.session
      .delete({where: {id: sessionId}})
      .catch((error: unknown) => {
        console.error(`Failure deleting user session: `, error)
      })
  }
}

async function signUp({
  fullName,
  username,
  kindeId,
  email,
  request,
}: Omit<User, 'createdAt' | 'updatedAt' | 'passwordHash' | 'role' | 'id'> & {
  request: Request
}) {
  const {session} = await getSessionManager(request)

  const existingUser = await prisma.user.findUnique({
    where: {email: email},
  })
  if (existingUser?.id && kindeId) {
    let user = await updateExistingUser(email, kindeId)
    if (!user) return null
    const userSession = await createSession({userId: user.id})
    session.set(sessionIdKey, userSession.id)
  } else {
    if (!process.env.PASSWORD) throw new Error('need a password')
    const passwordHash = await bcrypt.hash(kindeId + process.env.PASSWORD, 10)
    let user = await prisma.user.create({
      data: {
        kindeId: kindeId,
        fullName,
        username,
        passwordHash,
        email,
      },
    })
    const userSession = await createSession({userId: user.id})
    session.set(sessionIdKey, userSession.id)
  }
}

async function getKindeSession(request: Request) {
  const {profile, isAuthenticated} = await getSessionManager(request)
  const data = {
    profile,
    isAuthenticated,
  }
  return data
}

async function getUser(request: Request) {
  const {getSessionId, session} = await getSessionManager(request)
  const sessionId = await getSessionId()

  if (!sessionId) {
    await signOut(request)
    destroySession(session)
    return null
  }
  const user = await getUserFormSessionId(sessionId)
  return user
}

async function findUser(email: string) {
  if (!email) return null
  return prisma.user.findUnique({
    where: {email: email},
  })
}

async function updateExistingUser(email: string, kindeId: string) {
  if (!email || !kindeId) return null
  const user = await prisma.user.update({
    where: {email},
    data: {kindeId: kindeId},
  })
  return user
}

const kindeClient = createKindeServerClient(GrantType.AUTHORIZATION_CODE, {
  authDomain: process.env.KINDE_DOMAIN ?? '',
  clientId: process.env.KINDE_CLIENT_ID ?? '',
  clientSecret: process.env.KINDE_CLIENT_SECRET ?? '',
  redirectURL: process.env.KINDE_REDIRECT_URL ?? '',
  logoutRedirectURL: process.env.KINDE_LOGOUT_REDIRECT_URL ?? '',
})

export {
  commitSession,
  destroySession,
  findUser,
  getKindeSession,
  getSession,
  getSessionManager,
  getUser,
  kindeClient,
  sessionIdKey,
}
