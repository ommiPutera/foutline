import type { LoaderFunctionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import {
  commitSession,
  getSessionManager,
  kindeClient,
} from '~/utils/session.server.ts'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { sessionManager, session } = await getSessionManager(request)

  const registerUrl = await kindeClient.register(sessionManager)
  return redirect(registerUrl.toString(), {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  })
}
