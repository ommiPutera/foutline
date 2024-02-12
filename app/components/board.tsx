import type {Post} from '@prisma/client'
import {LayoutGrid, Lightbulb, List, Plus} from 'lucide-react'
import CardItem from '~/components/board/card-item.tsx'
import FilterButton from '~/components/board/filter-button.tsx'
import SortButton from '~/components/board/sort-button.tsx'
import {CreatePostDialog} from '~/components/templates/dialogs.tsx'
import {Button} from '~/components/ui/button.tsx'
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from '~/components/ui/tooltip.tsx'

function Board({posts}: {posts: Post[] | null}) {
  return (
    <div className="flex min-h-screen md:gap-4">
      <div className="flex w-full flex-col gap-4 pr-4 md:gap-3">
        <Tools />
        {posts?.length ? (
          <Cards posts={posts} />
        ) : (
          <div className="mt-44 flex flex-col items-center justify-center gap-6">
            <div className="bg-muted-foreground/20 border-muted-foreground/30 rounded-full border p-4">
              <Lightbulb className="stroke-muted-foreground h-10 w-10" />
            </div>
            <p className="text-muted-foreground text-center text-base">
              Catatan yang Anda buat akan muncul di sini..
            </p>
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
          <Button size="sm" className="w-full">
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
        <CardItem
          key={post.id}
          id={post.id}
          title={post.title}
          content={post.preview ?? ''}
        />
      ))}
    </div>
  )
}

export default Board
