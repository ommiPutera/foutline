import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Landing" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Landing() {
  return (
    <div className="bg-red-100">
      <h1>Landing Page</h1>
      <h1>Welcome to Omition</h1>
      <p>you not log in</p>
      <a href="/login">Sign in</a>
      <a href="/register">Sign up</a>
    </div>
  );
}