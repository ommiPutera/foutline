import type { MetaFunction } from "@remix-run/node"


export const meta: MetaFunction = () => {
  return [{ title: "Ain't nothing here" }]
}

export default function NotFoundPage() {
  return <main>404</main>
}