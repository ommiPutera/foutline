import {useLoaderData} from '@remix-run/react'

import Content from './content.tsx'
import Header from './header.tsx'
import Sum from './sum.tsx'

import type {LoaderData} from './route.tsx'

function PageIndex() {
  const {postId} = useLoaderData<LoaderData>()

  return (
    <main
      className="relative flex h-full w-full flex-col gap-6"
      state-data={postId}
    >
      <Header />
      <Wrapper />
    </main>
  )
}

function Wrapper() {
  return (
    <div className="flex w-full gap-2 py-6">
      <Content />
      <Sum />
    </div>
  )
}

export {PageIndex}
