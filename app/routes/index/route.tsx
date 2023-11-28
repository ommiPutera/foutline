import type { UserType } from "@kinde-oss/kinde-typescript-sdk";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import Landing from "./landing.tsx";
import { getSessionManager, kindeClient } from "~/utils/kinde.server.ts";

export type LoaderData = {
  isAuthenticated: boolean
  profile?: UserType
}

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { sessionManager } = await getSessionManager(request)
  const isAuthenticated = await kindeClient.isAuthenticated(sessionManager);
  // console.log('session:::::: ', session.get(''))
  if (!isAuthenticated) return { isAuthenticated }

  const profile = await kindeClient.getUserProfile(sessionManager);
  return {
    isAuthenticated,
    profile
  }
}

export default function Index() {
  const { isAuthenticated, profile } = useLoaderData<LoaderData>()

  if (!isAuthenticated) return <Landing />
  return (
    <div className="bg-green-100">
      <h1>You are log in with this email: {profile?.email}</h1>
      <Link to="/logout">Logout</Link>
    </div>
  );
}
