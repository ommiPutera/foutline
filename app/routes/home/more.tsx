import {
  ArrowUpRight,
  Copy,
  MoreHorizontal,
  Trash2,
  NotebookText,
} from 'lucide-react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover.tsx'
import {Button, ButtonLink} from '~/components/ui/button.tsx'

import type {Post} from '@prisma/client'

import {type FetcherWithComponents} from '@remix-run/react'

import {getPostType} from '~/utils/get-post-type.ts'

import {FormType} from './route.tsx'
import {useCardStore} from './card.tsx'

function More({
  id,
  title,
  type,
  deleteFetcher,
}: Pick<Post, 'id' | 'type' | 'title'> & {
  deleteFetcher: FetcherWithComponents<unknown>
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
        <Open id={id} type={type} />
        <SaveAsTemplate id={id} />
        <Duplicate id={id} />
        <Remove
          id={id}
          title={title}
          type={type}
          deleteFetcher={deleteFetcher}
        />
      </PopoverContent>
    </Popover>
  )
}

function Open({id, type}: Pick<Post, 'id' | 'type'>) {
  return (
    <div className="my-1">
      <ButtonLink
        to={`/${getPostType(type)}/${id}`}
        variant="ghost"
        size="sm"
        className="w-full justify-start rounded-md px-3"
      >
        <ArrowUpRight size="16" className="mr-2" />
        <span>Buka halaman</span>
      </ButtonLink>
    </div>
  )
}

function Remove({
  id,
  title,
  type,
  deleteFetcher,
}: Pick<Post, 'id' | 'title' | 'type'> & {
  deleteFetcher: FetcherWithComponents<unknown>
}) {
  return (
    <div className="my-1">
      <Button
        aria-label="Delete Card"
        variant="ghost"
        size="sm"
        onClick={() =>
          deleteFetcher.submit(
            {
              id,
              title: title,
              type: type,
              _action: FormType.DELETE,
            },
            {
              method: 'POST',
              action: '/home',
              navigate: false,
              fetcherKey: `card:${id}`,
            },
          )
        }
        className="w-full justify-start rounded-md px-3"
      >
        <Trash2 size="16" className="mr-2" />
        <span>Pindahkan ke sampah</span>
      </Button>
    </div>
  )
}

function SaveAsTemplate({id}: Pick<Post, 'id'>) {
  return (
    <div className="my-1">
      <Button
        disabled
        variant="ghost"
        size="sm"
        className="w-full justify-start rounded-md px-3"
      >
        <NotebookText size="16" className="mr-2" />
        <span>Simpan sebagai template</span>
      </Button>
    </div>
  )
}

function Duplicate({id}: Pick<Post, 'id'>) {
  return (
    <div className="my-1">
      <Button
        disabled
        variant="ghost"
        size="sm"
        className="w-full justify-start rounded-md px-3"
      >
        <Copy size="16" className="mr-2" />
        <span>Duplikat</span>
      </Button>
    </div>
  )
}

export default More
