import React from 'react'

import {useFetcher, useLoaderData, useSubmit} from '@remix-run/react'
import {PostStatus} from '@prisma/client'

import {FormType, type LoaderData} from './route.tsx'

import {
  CheckCheck,
  ChevronRight,
  ChevronsRight,
  Copy,
  Menu,
  Pause,
  Star,
  Tag,
  Trash,
  icons,
} from 'lucide-react'

import {Button} from '~/components/ui/button.tsx'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover.tsx'

import {cn} from '~/lib/utils.ts'

function Header() {
  const {post} = useLoaderData<LoaderData>()

  if (!post) return <></>
  return (
    <header className="bg-background fixed left-[var(--sidebar-width)] right-0 top-0 z-10 w-[calc(100%_-_var(--sidebar-width))] border-b">
      <div className="flex h-16 items-center justify-between gap-6 px-3.5">
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
        className="h-fit w-48 px-2 py-1"
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
        return 'Pause'
      case 'COMPLETED':
        return 'CheckCheck'
      case 'UNDERWAY':
        return 'ChevronsRight'
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
            className={cn(
              'flex items-center gap-2 rounded-lg',
              status === PostStatus.COMPLETED && 'bg-ring/30 hover:!bg-ring/20',
              status === PostStatus.NOT_STARTED &&
                'bg-muted-foreground/20 hover:!bg-muted-foreground/10',
              status === PostStatus.UNDERWAY &&
                'bg-blue-500/30 hover:!bg-blue-500/20',
            )}
          >
            <Icon className="h-4 w-4" strokeWidth={2.5} />
            <p className="text-[13px]">{getStatusStr()}</p>
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent
        className="h-fit w-48 px-2 py-1"
        align="center"
        side="bottom"
        forceMount
      >
        <div className="my-1">
          <Button
            variant="ghost"
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
            <Pause size="16" className="mr-2" />
            <span>Belum Berjalan</span>
          </Button>
        </div>
        <div className="my-1">
          <Button
            variant="ghost"
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
            <ChevronsRight size="16" className="mr-2" />
            <span>Sedang Berjalan</span>
          </Button>
        </div>
        <div className="my-1">
          <Button
            variant="ghost"
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
            <CheckCheck size="16" className="mr-2" />
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
        className="h-fit w-48 px-2 py-1"
        align="end"
        side="bottom"
        forceMount
      >
        <Favorite />
        <Duplicate />
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

  const submit = useSubmit()

  if (!post) return <></>
  return (
    <div className="my-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() =>
          submit(
            {
              id: post.id,
              _action: FormType.DELETE_POST,
            },
            {method: 'POST'},
          )
        }
        className="w-full justify-start rounded-md px-3"
      >
        <Trash size="16" className="mr-2" />
        <span>Pindahkan ke sampah</span>
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
        //       _action: FormType.DELETE_POST,
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
