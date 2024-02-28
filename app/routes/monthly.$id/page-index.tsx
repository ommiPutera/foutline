import {useLoaderData} from '@remix-run/react'

import Content from './content.tsx'
import type {LoaderData} from './route.tsx'
import Header from './header.tsx'

function PageIndex() {
  const {postId} = useLoaderData<LoaderData>()

  return (
    <main
      className="relative flex h-full w-full flex-col gap-6 pt-24"
      state-data={postId}
    >
      <Header />
      <Wrapper />
    </main>
  )
}

function Wrapper() {
  return (
    <div className="flex w-full gap-8 p-8">
      <Content />
      <div className="w-[420px]">1</div>
    </div>
  )
}

export {PageIndex}
