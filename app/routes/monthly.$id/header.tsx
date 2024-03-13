import React from 'react'

import {useFetcher, useLoaderData, useSubmit} from '@remix-run/react'

import {PostStatus} from '@prisma/client'

import {id as IDNLocale} from 'date-fns/locale'
import {formatDistance} from 'date-fns'

import {FormType, type LoaderData} from './route.tsx'

import {
  CheckCircle,
  ChevronRight,
  ClipboardPenLine,
  Copy,
  Menu,
  NotebookText,
  TrafficCone,
  Star,
  Tag,
  Trash2,
  icons,
} from 'lucide-react'

import {Button} from '~/components/ui/button.tsx'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover.tsx'

import {capitalizeFirstLetter, cn} from '~/lib/utils.ts'

function Header() {
  const {post} = useLoaderData<LoaderData>()

  if (!post) return <></>
  return (
    <header className="bg-background fixed left-[var(--sidebar-width)] right-0 top-0 z-10 w-[calc(100%_-_var(--sidebar-width))]">
      <div className="flex h-14 items-center justify-between gap-6 px-5">
        <div className="flex items-center gap-2">
          <p className="line-clamp-1 text-sm font-medium">Keuangan bulanan</p>
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
          <Status />
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
        className="mt-1 h-fit w-48 px-2 py-1"
        align="end"
        side="bottom"
        forceMount
      ></PopoverContent>
    </Popover>
  )
}

function Status() {
  const {post} = useLoaderData<LoaderData>()

  const fetcher = useFetcher()

  const [isFocus, setIsFocus] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)

  const [value, setValue] = React.useState<PostStatus>(
    post?.status ?? 'NOT_STARTED',
  )

  React.useEffect(() => {
    setValue(post?.status ?? 'NOT_STARTED')
  }, [post?.status])

  const status = value

  const getStatusStr = () => {
    switch (status) {
      case 'NOT_STARTED':
        return 'Belum Berjalan'
      case 'COMPLETED':
        return 'Selesai'
      case 'UNDERWAY':
        return 'Sedang Berjalan'
    }
  }

  const getIconName = (): keyof typeof icons => {
    switch (status) {
      case 'NOT_STARTED':
        return 'TrafficCone'
      case 'COMPLETED':
        return 'CheckCircle'
      case 'UNDERWAY':
        return 'ClipboardPenLine'
    }
  }

  const Icon = icons[getIconName()]

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
            className={cn('flex items-center gap-2 rounded-lg')}
          >
            <Icon
              className={cn(
                'h-4 w-4',
                status === PostStatus.COMPLETED && 'stroke-green-500',
                status === PostStatus.UNDERWAY && 'stroke-blue-400',
              )}
              strokeWidth={2.5}
            />
            <p className="text-[13px]">{getStatusStr()}</p>
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent
        className="mt-1 h-fit w-48 px-2 py-1"
        align="center"
        side="bottom"
        forceMount
      >
        <div className="my-1">
          <Button
            variant={status === PostStatus.NOT_STARTED ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => {
              setValue('NOT_STARTED')
              setIsOpen(false)
              fetcher.submit(
                {
                  _action: FormType.UPDATE_STATUS,
                  id: post?.id as string,
                  status: 'NOT_STARTED',
                },
                {method: 'POST'},
              )
            }}
            className="w-full justify-start rounded-md px-3"
          >
            <TrafficCone size="16" className={cn('mr-2')} />
            <span>Belum Berjalan</span>
          </Button>
        </div>
        <div className="my-1">
          <Button
            variant={status === PostStatus.UNDERWAY ? 'secondary' : 'ghost'}
            size="sm"
            className="w-full justify-start rounded-md px-3"
            onClick={() => {
              setValue('UNDERWAY')
              setIsOpen(false)
              fetcher.submit(
                {
                  _action: FormType.UPDATE_STATUS,
                  id: post?.id as string,
                  status: 'UNDERWAY',
                },
                {method: 'POST'},
              )
            }}
          >
            <ClipboardPenLine
              size="16"
              className={cn(
                'mr-2',
                status === PostStatus.UNDERWAY && 'stroke-blue-400',
              )}
            />
            <span>Sedang Berjalan</span>
          </Button>
        </div>
        <div className="my-1">
          <Button
            variant={status === PostStatus.COMPLETED ? 'secondary' : 'ghost'}
            size="sm"
            className="w-full justify-start rounded-md px-3"
            onClick={() => {
              setValue('COMPLETED')
              setIsOpen(false)
              fetcher.submit(
                {
                  _action: FormType.UPDATE_STATUS,
                  id: post?.id as string,
                  status: 'COMPLETED',
                },
                {method: 'POST'},
              )
            }}
          >
            <CheckCircle
              size="16"
              className={cn(
                'mr-2',
                status === PostStatus.COMPLETED && 'stroke-green-500',
              )}
            />
            <span>Selesai</span>
          </Button>
        </div>
      </PopoverContent>
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
        className="mt-1 h-fit w-56 px-2 py-1"
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
  const {post} = useLoaderData<LoaderData>()

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

function Remove() {
  const {post} = useLoaderData<LoaderData>()

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
              navigate: true,
              fetcherKey: `card:${post.id}`,
            },
          )
        }
        disabled={deleteFetcher.state !== 'idle'}
        className="w-full justify-start rounded-md px-3"
      >
        <Trash2 size="16" className="mr-2" />
        <span>
          {deleteFetcher.state !== 'idle'
            ? 'Memindahkan'
            : 'Pindahkan ke sampah'}
        </span>
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

function Duplicate() {
  const {post} = useLoaderData<LoaderData>()

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
