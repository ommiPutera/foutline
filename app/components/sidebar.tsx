import React from 'react'

import type {Post, PostType} from '@prisma/client'

import {useFetchers, useLocation} from '@remix-run/react'

import {FileText, GalleryHorizontalEnd, Plus, icons} from 'lucide-react'

import {CreatePostDialog} from '~/components/templates/dialogs.tsx'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion.tsx'
import {Badge} from '~/components/ui/badge.tsx'
import {Button, ButtonLink} from '~/components/ui/button.tsx'
import {Progress} from '~/components/ui/progress.tsx'
import {ScrollArea} from '~/components/ui/scroll-area.tsx'
import {UserNav} from '~/components/user-nav.tsx'

import {cn} from '~/lib/utils.ts'

import {getPostType} from '~/utils/get-post-type.ts'
import {useRootLoader} from '~/utils/use-root-loader.tsx'

import {FormType} from '~/routes/home/route.tsx'

export function Sidebar({className}: React.HTMLAttributes<HTMLDivElement>) {
  const {profile} = useRootLoader()

  return (
    <div
      className={cn(
        'no-scrollbar flex h-screen flex-col overflow-y-scroll',
        className,
      )}
    >
      <div className="mb-4 flex flex-col justify-between space-y-1 pb-6 pt-3">
        <div className="flex flex-1 flex-col place-content-start px-3 py-2">
          <NavItem href="/home" iconName="Home" title="Beranda" />
          <NavItem
            href="/explore"
            iconName="Search"
            title="Jelajahi"
            isMatch={false}
          />
          <Create />
        </div>
        <div className="flex-2 place-content-center">
          <Files />
        </div>
        <div className="flex flex-1 flex-col place-content-end px-3 py-2">
          <NavItem
            href="/settings"
            iconName="Settings"
            title="Pengaturan"
            isMatch={false}
          />
          <NavItem href="/trash" iconName="Trash" title="Sampah" />
          <Favorite />
        </div>
      </div>
      <div className="bg-background sticky bottom-0 mt-auto h-fit w-full">
        <Billing />
        <div className="flex items-center justify-between p-4">
          <UserNav {...profile} />
        </div>
      </div>
    </div>
  )
}

function Create() {
  return (
    <CreatePostDialog>
      <Button
        asChild
        variant="ghost"
        className="w-full cursor-pointer justify-start text-[13px] font-medium tracking-tight"
      >
        <span>
          <Plus className="mr-4 h-4 w-4 " strokeWidth={2.1} />
          Buat Halaman
        </span>
      </Button>
    </CreatePostDialog>
  )
}

function Billing() {
  const {user} = useRootLoader()
  return (
    <div className="mx-4 rounded-lg border bg-white p-3 dark:bg-zinc-900">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium leading-none">
            {user?.posts.length}/12 halaman
          </p>
          <Badge variant="outline" className="text-[9px]">
            Gratis
          </Badge>
        </div>
        {/* 8.3 = 100 / 12 */}
        <Progress value={user?.posts.length * 8.3} />
      </div>
    </div>
  )
}

function Favorite() {
  const {user} = useRootLoader()

  let pendingItems = usePendingFavorite()

  const posts: Post[] = user?.posts.filter(
    (post: Post) => post.isFavorite === true,
  )

  const contentRef = React.useRef(null)

  type Column = (typeof posts)[number] | (typeof pendingItems)[number]
  type ColumnWithItems = Column
  let columns = new Map<string, ColumnWithItems>()
  for (let column of [...posts, ...pendingItems]) {
    if (column.isFavorite === 'false') {
      columns.delete(column.id)
    } else {
      columns.set(column.id, {...column})
    }
  }

  const [isPostEmpty, setIsPostEmpty] = React.useState<boolean>(
    ![...columns.values()].length ?? !posts.length,
  )
  const [value, setValue] = React.useState<string>(!isPostEmpty ? 'item-1' : '')

  React.useEffect(() => {
    setIsPostEmpty(!posts.length)
  }, [posts.length])

  return (
    <Accordion type="single" collapsible value={value}>
      <AccordionItem value="item-1" className="border-0">
        <Button
          asChild
          variant="ghost"
          onClick={() => setValue(value === 'item-1' ? '' : 'item-1')}
          className="w-fit justify-start p-0 px-4 pl-5 text-[13px] font-medium tracking-tight"
        >
          <AccordionTrigger data-count={posts.length} className="!no-underline">
            Halaman Favorit
          </AccordionTrigger>
        </Button>
        <AccordionContent className="relative h-fit w-full pl-4 pr-1">
          <div ref={contentRef} className="w-full">
            {!isPostEmpty ? (
              [...columns.values()].map((post, i) => (
                <div key={`${post}-${i}`} className="relative">
                  <ButtonLink
                    href={`${getPostType(post.type)}/${post.id}`}
                    variant="ghost"
                    prefetch="intent"
                    size="sm"
                    type="button"
                    className="text-muted-foreground hover:text-foreground ml-5 flex justify-between rounded-md text-xs font-normal"
                  >
                    {post.title.length > 23
                      ? `${post.title.substring(0, 23)}..`
                      : post.title}
                  </ButtonLink>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

function Files() {
  const [isScroll, setIsScroll] = React.useState(false)
  const topFileRef = React.useRef(null)

  const {user} = useRootLoader()
  const location = useLocation()

  const posts: Post[] = user?.posts

  let pendingDelete = usePendingDelete()
  let pendingUpdate = usePendingUpdate()

  type Column = (typeof posts)[number] | (typeof pendingDelete)[number]
  type ColumnWithItems = Column
  let columns = new Map<string, ColumnWithItems>()
  for (let column of [...posts]) {
    if (pendingDelete[0]) columns.delete(pendingDelete[0].id)
    columns.set(column.id, {...column})
  }

  for (let column of [...posts]) {
    if (pendingUpdate[0]?.id === column.id) {
      columns.set(column.id, {...column, title: pendingUpdate[0].title})
    }
  }

  const [isPostEmpty, setIsPostEmpty] = React.useState<boolean>(
    ![...columns.values()].length ?? !posts.length,
  )

  React.useEffect(() => {
    setIsPostEmpty(!posts.length)
  }, [posts.length])

  React.useEffect(() => {
    if (!topFileRef?.current) return
    const observer = new IntersectionObserver(function (entries) {
      for (let entry of entries) {
        if (entry.isIntersecting) setIsScroll(false)
        else setIsScroll(true)
      }
    })
    observer.observe(topFileRef.current)
  }, [])

  return (
    <div
      className={cn(
        'border-border mx-3 overflow-hidden rounded-xl border-[1px] bg-white dark:bg-zinc-900',
      )}
    >
      <div className="flex flex-col gap-2 py-5">
        <div className="relative flex items-center px-5">
          <GalleryHorizontalEnd className="mr-4 h-4 w-4" />
          <h4 className="text-[13px] font-semibold leading-none tracking-tight">
            Koleksi Halaman
          </h4>
        </div>
      </div>
      <ScrollArea className="h-[250px]">
        {isScroll && !isPostEmpty && (
          <div className="absolute top-0 z-20 -mt-1 h-4 w-full bg-gradient-to-t from-white/30 to-gray-100/80 dark:from-zinc-900/30 dark:to-zinc-950/50"></div>
        )}
        {isScroll && !isPostEmpty && (
          <div className="absolute bottom-0 z-20 -mt-1 h-4 w-full bg-gradient-to-b from-white/30 to-gray-100/80 dark:from-zinc-900/30 dark:to-zinc-950/50"></div>
        )}
        <div ref={topFileRef}></div>
        <div className="mx-2 py-1 pb-6">
          {!isPostEmpty ? (
            [...columns.values()]?.map((post, i) => (
              <ButtonLink
                href={`${getPostType(post.type)}/${post.id}`}
                key={`${post}-${i}`}
                variant="ghost"
                size="sm"
                prefetch="intent"
                className={cn(
                  'text-muted-foreground hover:text-foreground w-full justify-start rounded-md !py-5 font-light',
                  location.pathname ===
                    `/${getPostType(post.type)}/${post.id}` &&
                    '!text-foreground font-semibold dark:bg-zinc-800',
                )}
              >
                <FileText className="mr-2 h-3.5 w-3.5" />
                <p className="whitespace-nowrap text-xs">
                  {post.title.length > 23
                    ? `${post.title.substring(0, 23)}..`
                    : post.title}
                </p>
              </ButtonLink>
            ))
          ) : (
            <EmptyState />
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="mt-6 flex flex-col items-center gap-4 px-5 text-center">
      <div className="flex flex-col justify-center gap-4">
        <p className="text-muted-foreground max-w-[180px] text-xs">
          Semua daftar halaman akan mudah di akeses disini
        </p>
      </div>
    </div>
  )
}

function NavItem({
  href,
  iconName,
  title,
  isMatch = true,
  disabled,
}: {
  href?: string
  iconName: keyof typeof icons
  title: string
  isMatch?: boolean
  disabled?: boolean
}) {
  const location = useLocation()
  const Icon = icons[iconName]

  const Comp = href ? ButtonLink : Button

  return (
    <Comp
      disabled={disabled}
      href={href}
      variant="ghost"
      className={cn(
        'w-full justify-start text-[13px] font-medium tracking-tight',
        location.pathname === href &&
          isMatch &&
          'bg-secondary/80 font-semibold',
      )}
    >
      <Icon
        className={cn(
          'mr-4 h-4 w-4 stroke-[2.1px]',
          location.pathname === href && isMatch && 'stroke-[2.4px]',
        )}
      />
      {title}
    </Comp>
  )
}

function usePendingFavorite() {
  type PendingItem = ReturnType<typeof useFetchers>[number] & {
    formData: FormData
  }
  return useFetchers()
    .filter((fetcher): fetcher is PendingItem => {
      if (!fetcher.formData) return false
      let _action = fetcher.formData.get('_action')
      return _action === FormType.FAVORITE
    })
    .map(fetcher => {
      let id = String(fetcher.formData.get('id'))
      let type: PostType = fetcher.formData.get('type') as PostType
      let title = String(fetcher.formData.get('title'))
      let isFavorite = String(fetcher.formData.get('isFavorite'))

      return {id, type, title, isFavorite}
    })
}

function usePendingDelete() {
  type PendingItem = ReturnType<typeof useFetchers>[number] & {
    formData: FormData
  }
  return useFetchers()
    .filter((fetcher): fetcher is PendingItem => {
      if (!fetcher.formData) return false
      let _action = fetcher.formData.get('_action')
      return _action === FormType.DELETE
    })
    .map(fetcher => {
      let id = String(fetcher.formData.get('id'))
      let type: PostType = fetcher.formData.get('type') as PostType
      let title = String(fetcher.formData.get('title'))

      return {id, title, type}
    })
}

function usePendingUpdate() {
  type PendingItem = ReturnType<typeof useFetchers>[number] & {
    formData: FormData
  }
  return useFetchers()
    .filter((fetcher): fetcher is PendingItem => {
      if (!fetcher.formData) return false
      let _action = fetcher.formData.get('_action')
      return _action === 'UPDATE_CONTENT'
    })
    .map(fetcher => {
      let id = String(fetcher.formData.get('id'))
      let type: PostType = fetcher.formData.get('type') as PostType
      let title = String(fetcher.formData.get('title'))

      return {id, type, title}
    })
}

export {NavItem}
