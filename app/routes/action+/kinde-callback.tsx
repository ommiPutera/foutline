import { type LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "react-router";
import { getSessionManager, kindeClient, sessionIdKey, sessionStorage } from "~/utils/kinde.server.ts";
import { createSession } from "~/utils/prisma.server.ts";
import { findUser, register } from "~/utils/session.server.ts";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { sessionManager, session } = await getSessionManager(request)
  await kindeClient.handleRedirectToApp(sessionManager, new URL(request.url))

  const kindeUser = await kindeClient.getUser(sessionManager)
  if (!kindeUser) redirect('/')
  console.log('KINDE_USER++++++ :', kindeUser)

  if (
    typeof kindeUser.family_name !== 'string' ||
    typeof kindeUser.given_name !== 'string' ||
    typeof kindeUser.email !== 'string' ||
    typeof kindeUser.id !== 'string'
  ) {
    return { formError: `Form not submitted correctly.` }
  }

  const user = await findUser(kindeUser.id)
  console.log('USER++++++ :', user)
  if (kindeUser.id !== user?.id) {
    console.log('REGISTER SINI')
    await register({
      fullName: kindeUser.given_name + " " + kindeUser.family_name,
      email: kindeUser.email,
      username: kindeUser.given_name,
      id: kindeUser.id
    })
  }

  const userSession = await createSession({ userId: kindeUser.id })
  session.set(sessionIdKey, userSession.id)

  return redirect("/", {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session),
    },
  })
}