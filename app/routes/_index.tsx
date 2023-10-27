import type { Post } from "@prisma/client";
import type { DataFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "~/utils/prisma.server.ts";

export type LoaderData = {
  posts: Post[]
}

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App - Staging" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ params }: DataFunctionArgs) => {
  const posts = await prisma.post.findMany({})
  const data: LoaderData = {
    posts,
  }

  return data
}

export default function Index() {
  const { posts } = useLoaderData<LoaderData>()
  return (
    <div className="">
      <h1>Welcome to Remix</h1>
      {posts.map(post => (
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
  );
}
