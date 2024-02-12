import type { Post } from '@prisma/client'
import {
  Info,
  LayoutGrid,
  Lightbulb,
  List,
  Plus,
  WalletCards,
} from 'lucide-react'
import CardItem from '~/components/board/card-item.tsx'
import FilterButton from '~/components/board/filter-button.tsx'
import SortButton from '~/components/board/sort-button.tsx'
import { CreatePostDialog } from '~/components/templates/dialogs.tsx'
import { Button, ButtonLink } from '~/components/ui/button.tsx'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~/components/ui/tooltip.tsx'

function Board({ posts }: { posts: Post[] | null }) {
  return (
    <div className="flex min-h-screen py-6 md:gap-4">
      <div className="flex w-full flex-col gap-4 md:gap-3 md:border-r md:pr-4">
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
      <div className="hidden md:block md:min-w-[140px] md:max-w-[140px] lg:min-w-[240px] lg:max-w-[240px]">
        <div className="relative flex h-full flex-col justify-between gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center text-xs font-semibold">
              Kantong
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="transparent" size="icon">
                    <Info className="h-4 w-4 fill-blue-500 text-white" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Buat halaman baru</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex flex-col gap-4">
              <ButtonLink
                asChild
                variant="transparent"
                to="/"
                className="border-input bg-muted overflow-hidden border px-3.5 py-7"
              >
                <div className="flex w-full items-center gap-4">
                  <div className="flex w-full flex-col gap-1">
                    <h5 className="text-muted-foreground text-[11px]">
                      Bank Mandiri
                    </h5>
                    <p className="text-xs font-medium">Rp. 3,690,000</p>
                  </div>
                  <img
                    src="/logos/bank_mandiri.png"
                    alt=""
                    width="34px"
                    height="auto"
                  />
                </div>
              </ButtonLink>
              <div className="flex flex-col gap-2">
                <CreatePostDialog withoutTooltip>
                  <Button size="sm" className="w-full">
                    <div className="flex items-center gap-2">Atur Kantong</div>
                  </Button>
                </CreatePostDialog>
                <CreatePostDialog withoutTooltip>
                  <Button variant="ghost" size="sm" className="w-full">
                    <div className="flex items-center gap-2">
                      <WalletCards size={16} />
                      Buat kantong
                    </div>
                  </Button>
                </CreatePostDialog>
              </div>
            </div>
          </div>
        </div>
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

function Cards({ posts }: { posts: Post[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
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
