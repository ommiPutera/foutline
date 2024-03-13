import { useLoaderData } from '@remix-run/react'

import { type Post } from '@prisma/client'

import { type LoaderData } from './route.tsx'
import CardItem from './card.tsx'

import { Button } from '~/components/ui/button.tsx'

function Board() {
  return (
    <section className="flex w-full flex-col gap-4 px-3.5 py-6 md:gap-3 lg:pr-4">
      <Cards />
    </section>
  )
}

function Cards() {
  const { posts } = useLoaderData<LoaderData>()

  if (!posts?.length) return <NoCards />
  return (
    <div className='flex flex-col gap-6'>
      <div className='px-5 flex justify-between w-full gap-4'>
        <h4 className="text-xl font-bold">Sampah</h4>
        <Button
          aria-label="Delete Card"
          variant="secondary"
          size="sm"
          className="w-fit justify-start rounded-md px-3"
        >
          <span>Kosongkan sampah</span>
        </Button>
      </div>
      <div className="grid px-5 grid-cols-2 gap-3 py-0 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {posts.map(post => (
          <CardItem key={post.id} {...(post as any as Post)} />
        ))}
      </div>
    </div>
  )
}

function NoCards() {
  return (
    <div className="flex flex-col items-center justify-center gap-1 text-center md:py-20">
      <h3 className="text-lg font-bold">Sampah Kosong</h3>
      <p className="text-sm font-normal">
        Pindahkan halaman yang tidak Anda butuhkan ke sampah.
      </p>
    </div>
  )
}

export { Board }
