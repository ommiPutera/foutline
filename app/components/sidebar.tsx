import {cn} from '~/lib/utils.ts'
import {Button, ButtonLink} from './ui/button.tsx'
import {ScrollArea} from './ui/scroll-area.tsx'
import React from 'react'
import {
  FileClock,
  FileHeart,
  FileText,
  HomeIcon,
  LayoutTemplate,
  Trash2,
} from 'lucide-react'
import {useRootLoader} from '~/utils/use-root-loader.tsx'

export function Sidebar({className}: React.HTMLAttributes<HTMLDivElement>) {
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
            variant="ghost"
            className="w-full justify-start text-xs"
          >
            <HomeIcon className="mr-3 h-5 w-5" />
            Beranda
          </ButtonLink>
          <ButtonLink
            href="/template"
            variant="ghost"
            className="w-full justify-start text-xs"
          >
            <LayoutTemplate className="mr-3 h-5 w-5" />
            Template
          </ButtonLink>
          <ButtonLink
            href="/fav"
            variant="ghost"
            className="w-full justify-start text-xs"
          >
            <FileHeart className="mr-3 h-5 w-5" />
            Halaman Favorit
          </ButtonLink>
        </div>
        <div className="flex-2 place-content-center">
          <Files />
        </div>
        <div className="flex-1 place-content-end space-y-1 px-3 py-2">
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

function Files() {
  const {posts} = useRootLoader()
  const maxContentHeight = 300

  const [isScroll, setIsScroll] = React.useState(false)
  const [contentHeight, setContentHeight] =
    React.useState<number>(maxContentHeight)
  const topFileRef = React.useRef(null)
  const contentRef = React.useRef(null)

  const isPostEmpty = !posts?.length

  React.useEffect(() => {
    if (!contentRef?.current) return
    // @ts-ignore
    setContentHeight(Number(contentRef.current.clientHeight))
  }, [])

  React.useEffect(() => {
    if (!topFileRef?.current) return
    const observer = new IntersectionObserver(function (entries) {
      for (let entry of entries) {
        if (entry.isIntersecting) setIsScroll(false)
        setIsScroll(true)
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
      <ScrollArea
        className={cn(
          '',
          contentHeight > maxContentHeight && `h-[${maxContentHeight}px]`,
          contentHeight < maxContentHeight && `h-[${contentHeight}px]`,
        )}
      >
        {isScroll && !isPostEmpty && (
          <div className="absolute top-0 -mt-1 h-4 w-full bg-gradient-to-t from-background/30 to-gray-100/80"></div>
        )}
        {isScroll && !isPostEmpty && (
          <div className="absolute bottom-0 -mt-1 h-4 w-full bg-gradient-to-b from-background/30 to-gray-100/80"></div>
        )}
        <div ref={topFileRef}></div>
        <div className="space-y-2 pb-6" ref={contentRef}>
          {!isPostEmpty ? (
            posts?.map((post, i) => (
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
    <div className="mt-6 flex flex-col items-center gap-3 px-5 text-center">
      <h4 className="relative px-5 text-sm font-semibold leading-none">
        Koleksi Halaman
      </h4>
      <p className="max-w-[150px] text-xs">
        Semua daftar halamanmu akan tampil disini.
      </p>
      <Button size="sm">Buat halaman</Button>
    </div>
  )
}
