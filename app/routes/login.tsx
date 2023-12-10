import type {LoaderFunctionArgs} from '@remix-run/node'
import {redirect} from '@remix-run/node'
import {
  commitSession,
  getSessionManager,
  kindeClient,
} from '~/utils/kinde2.server.ts'

export const loader = async ({request}: LoaderFunctionArgs) => {
  const {sessionManager, session} = await getSessionManager(request)

  const loginUrl = await kindeClient.login(sessionManager)
  return redirect(loginUrl.toString(), {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  })
}
