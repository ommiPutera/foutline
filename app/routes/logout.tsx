import type {LoaderFunctionArgs} from '@remix-run/node'
import {redirect} from '@remix-run/node'
import {
  destroySession,
  getSessionManager,
  kindeClient,
} from '~/utils/session.server.ts'

export const loader = async ({request}: LoaderFunctionArgs) => {
  const {sessionManager, session, signOut, getSessionId} =
    await getSessionManager(request)
  const sessionId = await getSessionId()

  const logoutUrl = await kindeClient.logout(sessionManager)
  await signOut(sessionId)
  return redirect(logoutUrl.toString(), {
    headers: {
      'Set-Cookie': await destroySession(session),
    },
  })
}
