import React, { Suspense } from 'react'

import { Await, useLoaderData } from '@remix-run/react'

import type { Post } from '@prisma/client'

import { LayoutGrid, List, Plus } from 'lucide-react'

import FilterButton from '~/components/board/filter-button.tsx'
import SortButton from '~/components/board/sort-button.tsx'
import {
  CreatePostContent,
  CreatePostDialog,
} from '~/components/templates/dialogs.tsx'
import { Button, ButtonLink } from '~/components/ui/button.tsx'

import CardItem from './card.tsx'
import { type LoaderData } from './route.tsx'
import { Skeleton } from '~/components/ui/skeleton.tsx'

function Board() {
  return (
    <section className="flex w-full flex-col gap-4 px-3.5 py-6 md:gap-3 lg:pr-4">
      <Tools />
      <Cards />
      <NewCard />
    </section>
  )
}

function Tools() {
  const { posts } = useLoaderData<LoaderData>()

  return <></>
  if (!posts?.length) return <></>
  return (
    <div className="bg-background flex items-center justify-between">
      <div className="hidden md:flex md:items-center md:gap-1">
        <Button size="icon" variant="ghost">
          <LayoutGrid size={16} />
        </Button>
        <Button size="icon" variant="ghost">
          <List size={16} />
        </Button>
      </div>
      <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
        <div className="flex items-center gap-2">
          <FilterButton />
          <SortButton />
        </div>
        <CreatePostDialog withoutTooltip>
          <Button asChild size="sm" className="w-fit cursor-pointer">
            <div className="flex items-center gap-2">
              <Plus size={16} />
              Halaman baru
            </div>
          </Button>
        </CreatePostDialog>
      </div>
    </div>
  )
}

function Cards() {
  const { posts } = useLoaderData<LoaderData>()

  return (
    <Suspense fallback={<SkeletonCard />}>
      <Await resolve={posts as unknown as Post[]}>
        {(posts) => (
          <div className="grid grid-cols-2 gap-3 py-0 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {posts.map(post => (
              <CardItem key={post.id} {...(post as any as Post)} />
            ))}
          </div>
        )}
      </Await>
    </Suspense>
  )
}

function NewCard() {
  const { posts } = useLoaderData<LoaderData>()
  const [value, setValue] = React.useState('')

  return (
    <Suspense fallback={<> Loading.....</>}>
      <Await resolve={posts}>
        {(posts) => {
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
                  Semua perhitungan keuangan Anda telah di enkripsi, semua informasi
                  keuangan Anda aman dan terproteksi.
                </p>
              </div>
            </div>)
        }}
      </Await>
    </Suspense>
  )
}

function SkeletonCard() {
  return (
    <div className='grid grid-cols-2 gap-3 py-0 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 items-start'>
      {[1, 2, 3, 4, 5, 6, 7].map(() => (
        <div className="border border-border w-full flex flex-col space-y-3 bg-muted/20 dark:bg-zinc-900 p-3 rounded-lg">
          <Skeleton className="h-[150px] w-full rounded-xl" />
          <Skeleton className="h-[20px] w-full rounded-md" />
          <Skeleton className="h-[30px] w-full rounded-md" />
        </div>
      ))}
    </div>
  )
}

export { Board }
