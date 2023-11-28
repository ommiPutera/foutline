import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node"
import { getSessionManager, kindeClient } from "~/utils/kinde.server.ts";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { sessionManager } = await getSessionManager(request)
  const registerUrl = await kindeClient.register(sessionManager);
  return redirect(registerUrl.toString())
}