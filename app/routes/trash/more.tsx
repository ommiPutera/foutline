import {MoreHorizontal, RotateCw, Trash2} from 'lucide-react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover.tsx'
import {Button} from '~/components/ui/button.tsx'

import type {Post} from '@prisma/client'

import {type FetcherWithComponents} from '@remix-run/react'

import {FormType} from './route.tsx'
import {useCardStore} from './card.tsx'

import {useRootLoader} from '~/utils/use-root-loader.tsx'

function More({
  id,
  itemFetcher,
}: Pick<Post, 'id'> & {
  itemFetcher: FetcherWithComponents<unknown>
}) {
  const {setIdCardFocus} = useCardStore()
  return (
    <Popover onOpenChange={v => (v ? setIdCardFocus(id) : setIdCardFocus(''))}>
      <div className="flex h-full">
        <PopoverTrigger asChild>
          <Button size="icon" variant="transparent" className="rounded-full">
            <MoreHorizontal
              className="stroke-foreground/80 h-4 w-4"
              strokeWidth={2.5}
            />
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent
        className="mt-1 h-fit w-56 px-2 py-1"
        align="start"
        side="top"
        forceMount
      >
        <Restore id={id} itemFetcher={itemFetcher} />
        <Remove id={id} itemFetcher={itemFetcher} />
      </PopoverContent>
    </Popover>
  )
}

function Restore({
  id,
  itemFetcher,
}: Pick<Post, 'id'> & {itemFetcher: FetcherWithComponents<unknown>}) {
  const {user} = useRootLoader()
  return (
    <div className="my-1">
      <Button
        aria-label="Delete Card"
        variant="ghost"
        size="sm"
        disabled={Boolean(user?.posts.length === 12)}
        onClick={() => {
          itemFetcher.submit(
            {
              id,
              _action: FormType.RESTORE,
            },
            {
              method: 'POST',
              action: '.',
              navigate: false,
            },
          )
        }}
        className="w-full justify-start rounded-md px-3"
      >
        <RotateCw size="16" className="mr-2" />
        <span>Pulihkan</span>
      </Button>
    </div>
  )
}

function Remove({
  id,
  itemFetcher,
}: Pick<Post, 'id'> & {itemFetcher: FetcherWithComponents<unknown>}) {
  return (
    <div className="my-1">
      <Button
        aria-label="Delete Card"
        variant="ghost"
        size="sm"
        onClick={() => {
          itemFetcher.submit(
            {
              id,
              _action: FormType.DELETE,
            },
            {
              method: 'DELETE',
              action: '.',
              navigate: false,
            },
          )
        }}
        className="w-full justify-start rounded-md px-3"
      >
        <Trash2 size="16" className="mr-2" />
        <span>Hapus selamanya</span>
      </Button>
    </div>
  )
}

export default More
