import type {LoaderFunctionArgs} from '@remix-run/node'
import {redirect} from '@remix-run/node'
import {
  getSessionManager,
  kindeClient,
  sessionStorage,
} from '~/utils/kinde.server.ts'

export const loader = async ({request}: LoaderFunctionArgs) => {
  const {sessionManager, session} = await getSessionManager(request)
  const loginUrl = await kindeClient.login(sessionManager)
  return redirect(loginUrl.toString(), {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session),
    },
  })
}
