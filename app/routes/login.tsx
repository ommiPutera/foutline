import { redirect, type DataFunctionArgs } from "@remix-run/node"
import type { SessionManager } from "@kinde-oss/kinde-typescript-sdk";
import { GrantType, createKindeServerClient } from "@kinde-oss/kinde-typescript-sdk";

const kindeClient = createKindeServerClient(GrantType.AUTHORIZATION_CODE, {
  authDomain: process.env.KINDE_DOMAIN ?? '',
  clientId: process.env.KINDE_CLIENT_ID ?? '',
  clientSecret: process.env.KINDE_CLIENT_SECRET ?? '',
  redirectURL: process.env.KINDE_REDIRECT_URL ?? '',
  logoutRedirectURL: process.env.KINDE_LOGOUT_REDIRECT_URL ?? '',
});

export const loader = async ({ params }: DataFunctionArgs) => {
  let store: Record<string, unknown> = {};
  const sessionManager: SessionManager = {
    async getSessionItem(key: string) {
      return store[key];
    },
    async setSessionItem(key: string, value: unknown) {
      store[key] = value;
    },
    async removeSessionItem(key: string) {
      delete store[key];
    },
    async destroySession() {
      store = {};
    }
  };

  const loginUrl = await kindeClient.login(sessionManager);
  return redirect(loginUrl.toString())
}