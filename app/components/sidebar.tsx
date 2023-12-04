import { cn } from "~/lib/utils.ts"
import { Button, ButtonLink } from "./ui/button.tsx"
import { ScrollArea } from "./ui/scroll-area.tsx"
import React from "react"
import { FileClock, FileHeart, FileText, HomeIcon, LayoutTemplate, Trash2 } from "lucide-react"

export type Playlist = (typeof playlists)[number]

export const playlists = [
  "Recently Added",
  "Recently Played",
  "Top Songs",
  "Top Albums",
  "Top Artists",
  "Logic Discography",
  "Bedtime Beats",
  "Feeling Happy",
  "I miss Y2K Pop",
  "Runtober",
  "Mellow Days",
  "Eminem Essentials",
]

export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("overflow-x-hidden overflow-y-scroll min-h-screen", className)}>
      <div className="space-y-4 py-3 flex flex-col">
        <div className="px-3 py-2 space-y-1 flex-1 place-content-start">
          <ButtonLink
            variant="ghost"
            className="w-full justify-start text-xs"
          >
            <HomeIcon className="mr-3 h-5 w-5" />
            Beranda
          </ButtonLink>
          <ButtonLink
            variant="ghost"
            className="w-full justify-start text-xs"
          >
            <LayoutTemplate className="mr-3 h-5 w-5" />
            Template
          </ButtonLink>
        </div>
        <div className="flex-2 place-content-center">
          <Files />
        </div>
        <div className="px-3 py-2 space-y-1 flex-1 place-content-end">
          <Button variant="ghost" className="w-full justify-start text-xs">
            <FileHeart className="mr-3 h-5 w-5" />
            Halaman Favorit
          </Button>
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
  const [isScroll, setIsScroll] = React.useState(false)
  const tabRef = React.useRef(null)
  React.useEffect(() => {
    if (!tabRef?.current) return;
    const observer = new IntersectionObserver(function (entries) {
      for (let entry of entries) {
        if (entry.isIntersecting) {
          setIsScroll(false)
        } else {
          setIsScroll(true)
        }
      }
    })
    observer.observe(tabRef.current);
  }, [])

  return (
    <div className="mx-3 border border-border rounded-md overflow-x-hidden">
      <div className="py-5 flex flex-col gap-2">
        <h4 className="relative leading-none px-5 text-sm font-semibold">
          Koleksi Halaman
        </h4>
        <p className="text-xs text-muted-foreground px-5 line-clamp-2">
          Kamu dengan mudah mencari halaman disini
        </p>
      </div>
      <ScrollArea className="h-[350px]">
        {isScroll && <div className="h-4 w-full bg-gradient-to-t from-background/30 to-gray-100/80 -mt-1 absolute top-0"></div>}
        {isScroll && <div className="h-4 w-full bg-gradient-to-b from-background/30 to-gray-100/80 -mt-1 absolute bottom-0"></div>}
        <div ref={tabRef}></div>
        <div className="space-y-2 pb-6">
          {playlists?.map((playlist, i) => (
            <Button
              key={`${playlist}-${i}`}
              variant="ghost"
              className="w-full justify-start font-normal rounded-none text-xs"
            >
              <FileText className="mr-3 h-5 w-5" />
              {playlist}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div >
  )
}