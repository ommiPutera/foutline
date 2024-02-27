import { useLoaderData } from "@remix-run/react"

import Content from "./content.tsx"
import type { LoaderData } from "./route.tsx"

function PageIndex() {
  const { postId } = useLoaderData<LoaderData>()

  return (
    <main
      className="flex flex-col gap-6 h-full w-full pt-16"
      state-data={postId}
    >
      <Header />
      <Wrapper />
    </main>
  )
}

function Wrapper() {
  return (
    <div className="flex w-full p-8 gap-8">
      <Content />
      <div className="w-[420px]">
        1
      </div>
    </div>
  )
}

function Header() {
  return (
    <header className="w-full px-3.5 py-2 fixed border-b left-[var(--sidebar-width)] top-0 bg-background z-10">
      header
    </header>
  )
}


export { PageIndex }
