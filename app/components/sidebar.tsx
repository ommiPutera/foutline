import React from 'react'

import {Link, useLocation} from '@remix-run/react'
import type {Post} from '@prisma/client'

import {Button, ButtonLink} from './ui/button.tsx'
import {ScrollArea} from './ui/scroll-area.tsx'
import {
  FileKey2,
  FileText,
  GalleryHorizontalEnd,
  MoreVertical,
  Plus,
  Settings,
  icons,
} from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion.tsx'
import {UserNav} from './user-nav.tsx'

import {CreatePostDialog} from './templates/dialogs.tsx'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu.tsx'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~/components/ui/tooltip.tsx'
import {Progress} from '~/components/ui/progress.tsx'
import {Badge} from '~/components/ui/badge.tsx'

import FavoriteButton from '~/routes/home/favorite.tsx'

import {cn} from '~/lib/utils.ts'
import {getPostType} from '~/utils/get-post-type.ts'
import {useRootLoader} from '~/utils/use-root-loader.tsx'

import clsx from 'clsx'

export function Sidebar({className}: React.HTMLAttributes<HTMLDivElement>) {
  const {profile} = useRootLoader()

  return (
    <div className={cn('min-h-screens flex h-full flex-col', className)}>
      <div className="mb-12 flex flex-col justify-between space-y-4 py-6">
        <div className="flex-1 place-content-start px-3 py-2">
          <NavItem href="/home" iconName="Home" title="Beranda" />
          <NavItem
            href="/template"
            iconName="LayoutTemplate"
            title="Template"
          />
          <div>
            <CreatePostDialog>
              <Button
                asChild
                variant="ghost"
                className="w-full justify-start text-xs"
              >
                <span>
                  <Plus className="mr-3 h-4 w-4" strokeWidth={2.1} />
                  Buat
                </span>
              </Button>
            </CreatePostDialog>
          </div>
        </div>
        <div className="flex-2 place-content-center">
          <Files />
        </div>
        <div className="flex-1 place-content-end px-3 py-2">
          <Favorite />
          <NavItem href="/settings" iconName="Settings2" title="Pengaturan" />
          <NavItem href="/trash" iconName="Trash2" title="Sampah" />
        </div>
      </div>
      <div className="bg-background sticky bottom-0 mt-auto h-fit w-full">
        <div className="mx-4 rounded-md border p-2">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-medium leading-none">
                1/12 halaman
              </p>
              <Badge variant="outline" className="text-[9px]">
                Gratis
              </Badge>
            </div>
            <Progress value={10} />
          </div>
        </div>
        <div className="flex items-center justify-between p-4">
          <UserNav {...profile} />
          <More />
        </div>
      </div>
    </div>
  )
}

function Favorite() {
  const {user} = useRootLoader()
  const posts: Post[] = user?.posts.filter(
    (post: Post) => post.isFavorite === true,
  )

  const contentRef = React.useRef(null)
  const isPostEmpty = !posts?.length

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="border-0">
        <Button
          asChild
          variant="transparent"
          className="w-fit justify-start p-0 px-4 pl-5 text-xs"
        >
          <AccordionTrigger data-count={posts.length}>
            Halaman Favorit
          </AccordionTrigger>
        </Button>
        <AccordionContent className="relative h-fit w-full pl-4 pr-1">
          <div ref={contentRef} className="w-full space-y-2">
            {!isPostEmpty ? (
              posts.map((post, i) => (
                <div key={`${post}-${i}`} className="relative">
                  <ButtonLink
                    href="/aneh"
                    prefetch="intent"
                    variant="ghost"
                    size="sm"
                    className="ml-6 flex justify-between rounded-md text-xs font-normal"
                  >
                    <span>{post.title}</span>
                  </ButtonLink>
                  <div className="absolute right-1.5 top-0 flex h-full items-center">
                    <FavoriteButton
                      callBack={() => console.log('heii')}
                      tooltipText={{
                        active: 'Hapus dari favorit',
                        notActive: '',
                      }}
                      defaultValue={true}
                      side="right"
                      size="sm"
                    />
                  </div>
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

  const isPostEmpty = !user?.posts?.length
  const posts: Post[] = user?.posts

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
        'border-border mx-3 overflow-hidden rounded-md border-[1px]',
      )}
    >
      <div className="flex flex-col gap-2 py-5">
        <div className="relative flex items-center px-5">
          <GalleryHorizontalEnd className="mr-3 h-4 w-4" />
          <h4 className="text-xs font-semibold leading-none">
            Koleksi Halaman
          </h4>
        </div>
      </div>
      <ScrollArea className="h-[240px]">
        {isScroll && !isPostEmpty && (
          <div className="from-background/30 absolute top-0 -mt-1 h-4 w-full bg-gradient-to-t to-gray-100/80"></div>
        )}
        {isScroll && !isPostEmpty && (
          <div className="from-background/30 absolute bottom-0 -mt-1 h-4 w-full bg-gradient-to-b to-gray-100/80"></div>
        )}
        <div ref={topFileRef}></div>
        <div className="mx-2 pb-6">
          {!isPostEmpty ? (
            posts?.map((post, i) => (
              <ButtonLink
                href={`${getPostType(post.type)}/${post.id}`}
                key={`${post}-${i}`}
                variant="ghost"
                size="sm"
                prefetch="intent"
                className={clsx(
                  'w-full justify-start rounded-md !py-5 text-xs font-normal',
                  location.pathname ===
                    `/${getPostType(post.type)}/${post.id}` &&
                    'bg-accent font-semibold',
                )}
              >
                <FileText className="mr-2 h-3.5 w-3.5" />
                {post.title}
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

function More() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <Tooltip>
            <div className="flex h-full">
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="transparent"
                  className="rounded-sm"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="mr-2">
                <p>Pengaturan, kunci, style, dan lainnya..</p>
              </TooltipContent>
            </div>
          </Tooltip>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-1 w-44" align="end" forceMount>
        <DropdownMenuGroup>
          <Link to="/" prefetch="intent">
            <DropdownMenuItem>
              <Settings size="16" className="mr-3" />
              <span>Pengaturan</span>
            </DropdownMenuItem>
          </Link>
          <Link to="/" prefetch="intent">
            <DropdownMenuItem>
              <FileKey2 size="16" className="mr-3" />
              <span>Kunci halaman</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function NavItem({
  href,
  iconName,
  title,
}: {
  href: string
  iconName: keyof typeof icons
  title: string
}) {
  const location = useLocation()
  const Icon = icons[iconName]

  return (
    <ButtonLink
      href={href}
      prefetch="intent"
      variant="ghost"
      className={cn(
        'w-full justify-start text-xs',
        location.pathname === href && 'bg-black/5 font-semibold',
      )}
    >
      <Icon
        className={cn(
          'mr-3 h-4 w-4 stroke-[2.1px]',
          location.pathname === href && 'stroke-[2.5px]',
        )}
      />
      {title}
    </ButtonLink>
  )
}
