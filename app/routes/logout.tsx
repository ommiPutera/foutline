import type {LoaderFunctionArgs} from '@remix-run/node'
import {redirect} from '@remix-run/node'
import {
  getSessionManager,
  kindeClient,
  sessionStorage,
} from '~/utils/kinde.server.ts'

export const loader = async ({request}: LoaderFunctionArgs) => {
  const {sessionManager, session, signOut} = await getSessionManager(request)
  const logout = await kindeClient.logout(sessionManager)
  await signOut()
  return redirect(logout.toString(), {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session),
    },
  })
}
