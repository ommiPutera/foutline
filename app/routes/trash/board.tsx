import { useLoaderData } from '@remix-run/react'

import { type Post } from '@prisma/client'

import { type LoaderData } from './route.tsx'
import CardItem from './card.tsx'

import { Button } from '~/components/ui/button.tsx'
import RemoveAllInTrash from '~/components/templates/alerts/remove-all-in-trash.tsx'

function Board() {
  return (
    <section className="flex w-full flex-col gap-4 px-5 py-6 md:gap-3 lg:pr-4">
      <Cards />
    </section>
  )
}

function Cards() {
  const { posts } = useLoaderData<LoaderData>()

  if (!posts?.length) return <NoCards />
  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-full justify-between gap-4">
        <h4 className="text-xl font-bold">Sampah</h4>
        <RemoveAllInTrash cbAction={() => {
          console.log('heii')
        }}>
          <Button
            variant="secondary"
            size="sm"
            className="w-fit justify-start rounded-md px-3"
          >
            <span>Kosongkan sampah</span>
          </Button>
        </RemoveAllInTrash>
      </div>
      <div className="columns-2 gap-2 md:columns-3 lg:columns-4 lg:gap-3 xl:columns-5 2xl:columns-6">
        {posts.map(post => (
          <div key={post.id} className="mb-2 lg:mb-3">
            <CardItem {...(post as any as Post)} />
          </div>
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
