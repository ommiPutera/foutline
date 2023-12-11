import { cn } from '~/lib/utils.ts'
import { Button, ButtonLink } from './ui/button.tsx'
import { ScrollArea } from './ui/scroll-area.tsx'
import React from 'react'
import {
  FileClock,
  FileText,
  HomeIcon,
  LayoutTemplate,
  Plus,
  Trash2,
} from 'lucide-react'
// import { useRootLoader } from '~/utils/use-root-loader.tsx'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion.tsx'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip.tsx'
import { FavoriteButton } from './board/card-item.tsx'

let example = [
  { title: 'woi' },
  { title: 'santai aja bang' },
  { title: 'sloww bro' },
]

const example2 = [
  { title: 'woi' },
  { title: 'santai aja bang' },
  { title: 'sloww bro' },
  { title: 'woi' },
  { title: 'santai aja bang' },
  { title: 'sloww bro' },
  { title: 'woi' },
  { title: 'santai aja bang' },
  { title: 'sloww bro' },
  { title: 'woi' },
  { title: 'santai aja bang' },
  { title: 'sloww bro' },
  { title: 'woi' },
  { title: 'santai aja bang' },
  { title: 'sloww bro' },
  { title: 'woi' },
  { title: 'santai aja bang' },
  { title: 'sloww bro' },
]

export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'min-h-screen overflow-x-hidden overflow-y-scroll',
        className,
      )}
    >
      <div className="flex flex-col space-y-4 pb-3 pt-6">
        <div className="flex-1 place-content-start space-y-1 px-3 py-2">
          <ButtonLink
            href="/"
            prefetch="intent"
            variant="ghost"
            className="w-full justify-start text-xs"
          >
            <HomeIcon className="mr-3 h-5 w-5" strokeWidth={2.1} />
            Beranda
          </ButtonLink>
          <ButtonLink
            href="/template"
            variant="ghost"
            prefetch="intent"
            className="w-full justify-start text-xs"
          >
            <LayoutTemplate className="mr-3 h-5 w-5" strokeWidth={2.1} />
            Template
          </ButtonLink>
          <Tooltip>
            <div className="flex h-full">
              <TooltipTrigger className="w-full">
                <ButtonLink
                  href="/template"
                  variant="ghost"
                  prefetch="intent"
                  className="w-full justify-start text-xs"
                >
                  <Plus className="mr-3 h-5 w-5" strokeWidth={2.1} />
                  Buat
                </ButtonLink>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="text-xs">Buat halaman baru</p>
              </TooltipContent>
            </div>
          </Tooltip>
        </div>
        <div className="flex-2 place-content-center">
          <Files />
        </div>
        <div className="flex-1 place-content-end space-y-1 px-3 py-2">
          <Favorite />
          <Button variant="ghost" className="w-full justify-start text-xs">
            <FileClock className="mr-3 h-5 w-5" />
            Draf
          </Button>
          <Button variant="ghost" className="w-full justify-start text-xs">
            <Trash2 className="mr-3 h-5 w-5" />
            Sampah
          </Button>
        </div>
      </div>
    </div>
  )
}

function Favorite() {
  // const { posts } = useRootLoader()
  const contentRef = React.useRef(null)
  const isPostEmpty = !example?.length
  const [data, setData] = React.useState(example ?? [])

  const handleCallback = (title: string) => {
    const filter = data.filter(el => el.title !== title)
    setData([...filter])
  }

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="border-0">
        <Button
          asChild
          variant="transparent"
          className="w-fit justify-start p-0 px-4 text-xs"
        >
          <AccordionTrigger data-count={data.length}>Halaman Favorit</AccordionTrigger>
        </Button>
        <AccordionContent className="relative w-full pb-3 pl-4 pr-1 pt-1">
          <div ref={contentRef} className="w-full">
            {!isPostEmpty ? (
              data?.map((post, i) => (
                <div key={`${post}-${i}`} className="relative">
                  <ButtonLink
                    href="/aneh"
                    prefetch="intent"
                    variant="ghost"
                    className="ml-4 flex justify-between rounded-md text-xs font-normal"
                  >
                    <span>{post.title}</span>
                  </ButtonLink>
                  <div className='h-full absolute top-0 right-1.5 flex items-center'>
                    <FavoriteButton
                      callBack={() => handleCallback(post.title)}
                      tooltipText={{ active: "Hapus dari favorit", notActive: "" }}
                      defaultValue={true}
                      side='right'
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
  // const { posts } = useRootLoader()
  const [isScroll, setIsScroll] = React.useState(false)
  const topFileRef = React.useRef(null)

  const isPostEmpty = !example2?.length

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
    <div className="mx-3 overflow-x-hidden rounded-md border border-border">
      {!isPostEmpty && (
        <div className="flex flex-col gap-2 py-5">
          <h4 className="relative px-5 text-sm font-semibold leading-none">
            Koleksi Halaman
          </h4>
          <p className="line-clamp-2 px-5 text-xs text-muted-foreground">
            Kamu dengan mudah mencari halaman disini
          </p>
        </div>
      )}
      <ScrollArea className={cn('h-[240px]', isPostEmpty && 'h-[150px]')}>
        {isScroll && !isPostEmpty && (
          <div className="absolute top-0 -mt-1 h-4 w-full bg-gradient-to-t from-background/30 to-gray-100/80"></div>
        )}
        {isScroll && !isPostEmpty && (
          <div className="absolute bottom-0 -mt-1 h-4 w-full bg-gradient-to-b from-background/30 to-gray-100/80"></div>
        )}
        <div ref={topFileRef}></div>
        <div className="space-y-2 pb-6">
          {!isPostEmpty ? (
            example2?.map((post, i) => (
              <Button
                key={`${post}-${i}`}
                variant="ghost"
                className="w-full justify-start rounded-none text-xs font-normal"
              >
                <FileText className="mr-3 h-5 w-5" />
                {post.title}
              </Button>
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
      <div className="flex flex-col gap-2">
        <h4 className="relative px-5 text-sm font-semibold leading-none">
          Koleksi Halaman
        </h4>
        <p className="max-w-[150px] text-xs">
          Semua daftar halamanmu akan tampil disini.
        </p>
      </div>
      <Button>Buat halaman</Button>
    </div>
  )
}
