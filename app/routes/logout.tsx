import type {LoaderFunctionArgs} from '@remix-run/node'
import {redirect} from '@remix-run/node'
import {
  destroySession,
  getSessionManager,
  kindeClient,
} from '~/utils/kinde2.server.ts'

export const loader = async ({request}: LoaderFunctionArgs) => {
  const {sessionManager, session, signOut} = await getSessionManager(request)

  const logoutUrl = await kindeClient.logout(sessionManager)
  await signOut(request)
  return redirect(logoutUrl.toString(), {
    headers: {
      'Set-Cookie': await destroySession(session),
    },
  })
}
