import {useLoaderData} from '@remix-run/react'

import {type Post} from '@prisma/client'

import {type LoaderData} from './route.tsx'
import CardItem from './card.tsx'

function Board() {
  return (
    <section className="flex w-full flex-col gap-4 px-3.5 py-6 md:gap-3 lg:pr-4">
      <Cards />
    </section>
  )
}

function Cards() {
  const {posts} = useLoaderData<LoaderData>()

  if (!posts?.length) return <></>
  return (
    <div className="grid grid-cols-2 gap-3 py-0 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {posts.map(post => (
        <CardItem key={post.id} {...(post as any as Post)} />
      ))}
    </div>
  )
}

export {Board}
