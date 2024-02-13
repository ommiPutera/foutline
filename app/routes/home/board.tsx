import {useLoaderData} from '@remix-run/react'

import type {Post} from '@prisma/client'

import {LayoutGrid, Lightbulb, List, Plus} from 'lucide-react'

import FilterButton from '~/components/board/filter-button.tsx'
import SortButton from '~/components/board/sort-button.tsx'
import {
  CreatePostContent,
  CreatePostDialog,
} from '~/components/templates/dialogs.tsx'
import {Button, ButtonLink} from '~/components/ui/button.tsx'

import CardItem from './card-item.tsx'
import type {LoaderData} from './route.tsx'
import React from 'react'

function Board() {
  const {posts} = useLoaderData<LoaderData>()
  const [value, setValue] = React.useState('')

  return (
    <div className="flex md:gap-4">
      <div className="flex w-full flex-col gap-4 md:gap-3 lg:pr-4">
        {posts?.length ? <Tools /> : <></>}
        {posts?.length ? (
          // @ts-ignore
          <Cards posts={posts} />
        ) : (
          <div className="flex flex-col items-center justify-center gap-6 py-14">
            <div className="bg-muted-foreground/20 border-muted-foreground/30 rounded-full border p-4">
              <Lightbulb className="stroke-muted-foreground h-7 w-7" />
            </div>
            <p className="text-muted-foreground text-left text-sm">
              Daftar halaman yang Anda buat akan muncul di sini..
            </p>
            <div className="bg-muted h-[1px] w-full lg:w-[684px]"></div>
            <CreatePostContent value={value} setValue={setValue} />
            <ButtonLink
              disabled={!value}
              to={`/${value}/templates`}
              prefetch="intent"
              variant="outline"
              className="w-full lg:w-[684px]"
            >
              Lanjutkan
            </ButtonLink>
          </div>
        )}
      </div>
    </div>
  )
}

function Tools() {
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
          <Button asChild size="sm" className="w-full">
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

function Cards({posts}: {posts: Post[]}) {
  return (
    <div className="grid grid-cols-2 gap-3 py-4 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {posts.map(post => (
        <CardItem key={post.id} {...post} />
      ))}
    </div>
  )
}

export {Board}
