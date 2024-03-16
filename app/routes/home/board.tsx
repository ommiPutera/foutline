import React, {Suspense} from 'react'

import {Await, useLoaderData} from '@remix-run/react'

import type {Post} from '@prisma/client'

import {CreatePostContent} from '~/components/templates/dialogs.tsx'
import {ButtonLink} from '~/components/ui/button.tsx'
import {Skeleton} from '~/components/ui/skeleton.tsx'

import CardItem from './card.tsx'
import {type LoaderData} from './route.tsx'

function Board() {
  return (
    <section className="flex w-full flex-col gap-4 px-5 py-6 md:gap-3 lg:pr-4">
      <Cards />
      <NewCard />
    </section>
  )
}

function Cards() {
  const {posts} = useLoaderData<LoaderData>()

  return (
    <Suspense fallback={<SkeletonCard />}>
      <Await resolve={posts as unknown as Post[]}>
        {posts => (
          <div className="columns-2 gap-3 md:columns-3 xl:columns-5 xl:gap-4 2xl:columns-6">
            {posts.map(post => (
              <div key={post.id} className="mb-3 xl:mb-4">
                <CardItem {...(post as any as Post)} />
              </div>
            ))}
          </div>
        )}
      </Await>
    </Suspense>
  )
}

function NewCard() {
  const {posts} = useLoaderData<LoaderData>()
  const [value, setValue] = React.useState('')

  return (
    <Suspense fallback={<> Loading.....</>}>
      <Await resolve={posts}>
        {posts => {
          if (posts?.length) return <></>
          return (
            <div className="flex flex-col items-center justify-center gap-6 md:py-20">
              <CreatePostContent value={value} setValue={setValue} />
              {value && (
                <ButtonLink
                  to={`/${value}/templates`}
                  prefetch="intent"
                  variant="outline"
                  className="w-full lg:w-[684px]"
                >
                  Lanjutkan
                </ButtonLink>
              )}
              <div className="bg-muted hidden h-[1px] w-full md:block lg:w-[684px]"></div>
              <div className="hidden max-w-sm flex-col gap-2 text-center md:flex">
                <h4 className="text-sm font-medium">
                  Halaman yang Anda buat akan muncul di sini..
                </h4>
                <p className="text-muted-foreground text-sm font-light">
                  Semua perhitungan keuangan Anda telah di enkripsi, semua
                  informasi keuangan Anda aman dan terproteksi.
                </p>
              </div>
            </div>
          )
        }}
      </Await>
    </Suspense>
  )
}

function SkeletonCard() {
  return (
    <div className="grid grid-cols-2 items-start gap-3 py-0 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {[1, 2, 3, 4, 5, 6, 7].map(item => (
        <div
          key={item}
          className="border-border bg-muted/20 flex w-full flex-col space-y-3 rounded-lg border p-3 dark:bg-zinc-900"
        >
          <Skeleton className="h-[150px] w-full rounded-xl" />
          <Skeleton className="h-[20px] w-full rounded-md" />
          <Skeleton className="h-[30px] w-full rounded-md" />
        </div>
      ))}
    </div>
  )
}

export {Board}
