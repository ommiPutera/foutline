import { type LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "react-router";
import { getSessionManager, kindeClient, sessionStorage } from "~/utils/kinde.server.ts";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { sessionManager, session } = await getSessionManager(request)
  await kindeClient.handleRedirectToApp(sessionManager, new URL(request.url))
  return redirect("/", {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session),
    },
  })
}