import { GrantType, createKindeServerClient } from "@kinde-oss/kinde-typescript-sdk";
import type { SessionManager } from "@kinde-oss/kinde-typescript-sdk";
import { createCookieSessionStorage } from "@remix-run/node";
import { sessionExpirationTime } from "./prisma.server.ts";

const kindeClient = createKindeServerClient(GrantType.AUTHORIZATION_CODE, {
  authDomain: process.env.KINDE_DOMAIN ?? '',
  clientId: process.env.KINDE_CLIENT_ID ?? '',
  clientSecret: process.env.KINDE_CLIENT_SECRET ?? '',
  redirectURL: process.env.KINDE_REDIRECT_URL ?? '',
  logoutRedirectURL: process.env.KINDE_LOGOUT_REDIRECT_URL ?? '',
});

let sessionSecret = process.env.SESSION_SECRET
if (!sessionSecret) {
  throw new Error('Must enviornment variable SESSION_SECRET')
}

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: 'omition_root_session',
    secure: true,
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: sessionExpirationTime / 1000,
    httpOnly: true,
  },
})

async function getSessionManager(request: Request) {
  const session = await sessionStorage.getSession(request.headers.get('Cookie'));
  
  const sessionManager: SessionManager = {
    async getSessionItem(key: string) {
      return session.get(key);
    },
    async setSessionItem(key: string, value: unknown) {
      session.set(key, value)
      sessionStorage.commitSession(session)
    },
    async removeSessionItem(key: string) {
      session.unset(key)
    },
    async destroySession() {
      sessionStorage.destroySession(session)
    }
  };
  return {sessionManager, session}
}

export {
  getSessionManager,
  sessionStorage,
  kindeClient
}