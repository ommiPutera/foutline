import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Landing" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Landing() {
  // const { posts } = useLoaderData<LoaderData>()
  return (
    <div className="bg-red-100">
      <h1>Landing</h1>
    </div>
  );
}