import React from 'react'

import { useFetcher, useLoaderData, useSubmit } from '@remix-run/react'
import { FormType, type LoaderData } from './route.tsx'

import { id as IDNLocale } from 'date-fns/locale'
import { formatDistance } from 'date-fns'

import {
  ChevronRight,
  Copy,
  Menu,
  NotebookText,
  Star,
  Tag,
  Trash2,
} from 'lucide-react'

import { Button } from '~/components/ui/button.tsx'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover.tsx'

import { capitalizeFirstLetter, cn } from '~/lib/utils.ts'

function Header() {
  const { post } = useLoaderData<LoaderData>()

  if (!post) return <></>
  return (
    <header className="bg-background fixed left-[var(--sidebar-width)] right-0 top-0 z-10 w-[calc(100%_-_var(--sidebar-width))]">
      <div className="flex h-14 items-center justify-between gap-6 px-5">
        <div className="flex items-center gap-2">
          <p className="line-clamp-1 text-sm font-medium">Catatan</p>
          <ChevronRight className="h-4 w-4" />
          <p className="text-muted-foreground line-clamp-1 text-sm font-medium">
            {post.title.length > 56
              ? `${post.title.substring(0, 56)}..`
              : post.title}
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <p className="text-muted-foreground text-xs">
            {capitalizeFirstLetter(
              formatDistance(new Date(post?.updatedAt), new Date(), {
                addSuffix: true,
                includeSeconds: true,
                locale: IDNLocale,
              }),
            )}
          </p>
          <Label />
          <More />
        </div>
      </div>
    </header>
  )
}

function Label() {
  const [isFocus, setIsFocus] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    setIsOpen(false)
  }, [])

  return (
    <Popover
      onOpenChange={v => {
        setIsFocus(v)
        setIsOpen(!isOpen)
      }}
      open={isOpen}
    >
      <div className="flex h-full">
        <PopoverTrigger asChild>
          <Button
            disabled
            variant={isFocus ? 'secondary' : 'ghost'}
            size="sm"
            className="flex items-center gap-2 rounded-lg"
          >
            <Tag className="h-4 w-4" strokeWidth={2.5} />
            <p className="text-[13px]">Label</p>
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent
        className="h-fit w-48 px-2 py-1"
        align="end"
        side="bottom"
        forceMount
      ></PopoverContent>
    </Popover>
  )
}

function More() {
  const [isFocus, setIsFocus] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    setIsOpen(false)
  }, [])

  return (
    <Popover
      onOpenChange={v => {
        setIsFocus(v)
        setIsOpen(!isOpen)
      }}
      open={isOpen}
    >
      <div className="flex h-full">
        <PopoverTrigger asChild>
          <Button
            variant={isFocus ? 'secondary' : 'ghost'}
            size="sm"
            className="flex items-center gap-2 rounded-lg"
          >
            <Menu className="h-4 w-4" strokeWidth={2.5} />
            <p className="text-[13px]">Lainnya</p>
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent
        className="h-fit w-56 px-2 py-1"
        align="end"
        side="bottom"
        forceMount
      >
        <Favorite />
        <Duplicate />
        <SaveAsTemplate />
        <Remove />
      </PopoverContent>
    </Popover>
  )
}

function Favorite() {
  const { post } = useLoaderData<LoaderData>()

  const [isFavorited, setIsFavorited] = React.useState<boolean | undefined>(
    post?.isFavorite,
  )

  const submit = useSubmit()

  React.useEffect(() => {
    setIsFavorited(post?.isFavorite)
  }, [post?.isFavorite])

  if (!post) return <></>
  return (
    <div className="my-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          setIsFavorited(!isFavorited)
          submit(
            {
              id: post.id,
              title: post.title,
              type: post.type,
              isFavorite: !isFavorited,
              _action: FormType.FAVORITE,
            },
            {
              method: 'POST',
              action: '.',
              navigate: false,
              fetcherKey: `card:${post.id}`,
            },
          )
        }}
        className="w-full justify-start rounded-md px-3"
      >
        <Star
          size="16"
          className={cn(
            'mr-2',
            isFavorited
              ? 'fill-[#FFA500] stroke-[#FFA500]'
              : 'fill-transparent',
          )}
        />
        <span>{isFavorited ? 'Batalkan favorit' : 'Tambah ke favorit'}</span>
      </Button>
    </div>
  )
}

function SaveAsTemplate() {
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

function Remove() {
  const { post } = useLoaderData<LoaderData>()

  const deleteFetcher = useFetcher()

  if (!post) return <></>
  return (
    <div className="my-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() =>
          deleteFetcher.submit(
            {
              id: post.id,
              title: post.title,
              type: post.type,
              _action: FormType.DELETE,
            },
            {
              method: 'POST',
              action: '.',
              navigate: false,
              fetcherKey: `card:${post.id}`,
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

function Duplicate() {
  const { post } = useLoaderData<LoaderData>()

  // const submit = useSubmit()

  if (!post) return <></>
  return (
    <div className="my-1">
      <Button
        disabled
        variant="ghost"
        size="sm"
        // onClick={() =>
        //   submit(
        //     {
        //       id: post.id,
        //       _action: FormType.DELETE,
        //     },
        //     { method: 'POST' },
        //   )
        // }
        className="w-full justify-start rounded-md px-3"
      >
        <Copy size="16" className="mr-2" />
        <span>Duplikat</span>
      </Button>
    </div>
  )
}

export default Header
