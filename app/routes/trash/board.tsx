import { useLoaderData, useSubmit } from '@remix-run/react'

import { type Post } from '@prisma/client'

import { FormType, type LoaderData } from './route.tsx'
import CardItem from './card.tsx'

import { Button } from '~/components/ui/button.tsx'
import RemoveAllInTrash from '~/components/templates/alerts/remove-all-in-trash.tsx'
import React from 'react'

function Board() {
  return (
    <section className="flex w-full flex-col gap-4 px-5 py-6 md:gap-3 lg:pr-4">
      <Cards />
    </section>
  )
}

function Cards() {
  const { posts } = useLoaderData<LoaderData>()
  const [items, setItems] = React.useState<Post[] | []>([...(posts as any)])

  const submit = useSubmit()

  if (!posts?.length ?? !items?.length) return <NoCards />
  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-full justify-between gap-4">
        <h4 className="text-xl font-bold">Sampah</h4>
        <RemoveAllInTrash
          cbAction={() => {
            let allId = items.map(({ id }) => id)
            setItems([])
            submit(
              {
                allId: [...allId],
                _action: FormType.DELETE_ALL,
              },
              {
                method: 'DELETE',
                action: '.',
                navigate: false,
              },
            )
          }}
        >
          <Button
            variant="outline"
            size="sm"
            className="w-fit justify-start rounded-md px-3"
          >
            <span>Kosongkan sampah</span>
          </Button>
        </RemoveAllInTrash>
      </div>
      <div className="columns-2 gap-3 md:columns-3 xl:columns-5 xl:gap-4 2xl:columns-6">
        {posts.map(post => (
          <div key={post.id} className="mb-3 xl:mb-4">
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
