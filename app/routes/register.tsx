import type {LoaderFunctionArgs} from '@remix-run/node'
import {redirect} from '@remix-run/node'
import {getSessionManager, kindeClient} from '~/utils/kinde2.server.ts'

export const loader = async ({request}: LoaderFunctionArgs) => {
  const {sessionManager, session} = await getSessionManager(request)
  const registerUrl = await kindeClient.register(sessionManager)
  return redirect(registerUrl.toString(), {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session),
    },
  })
}
