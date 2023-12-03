import { cn } from "~/lib/utils.ts"
import { Button, ButtonLink } from "./ui/button.tsx"
import { ScrollArea } from "./ui/scroll-area.tsx"
import React from "react"
import { useTheme } from "~/utils/theme-provider.tsx"
import { FileClock, FileHeart, FileText, Trash2 } from "lucide-react"

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
      <div className="space-y-4 py-3">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <Home />
            <Template />
          </div>
        </div>
        <div className="border-t border-border" />
        <div className="px-3 py-2 space-y-1">
          <Button variant="ghost" className="w-full justify-start">
            <FileHeart className="mr-3 h-5 w-5" />
            Halaman Favorit
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <FileClock className="mr-3 h-5 w-5" />
            Draf
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Trash2 className="mr-3 h-5 w-5" />
            Sampah
          </Button>
        </div>
        <Files />
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
      <ScrollArea className="h-[320px]">
        {isScroll && <div className="h-4 w-full bg-gradient-to-t from-background/30 to-gray-100/80 -mt-1 absolute top-0"></div>}
        {isScroll && <div className="h-4 w-full bg-gradient-to-b from-background/30 to-gray-100/80 -mt-1 absolute bottom-0"></div>}
        <div ref={tabRef}></div>
        <div className="space-y-2 pb-6">
          {playlists?.map((playlist, i) => (
            <Button
              key={`${playlist}-${i}`}
              variant="ghost"
              className="w-full justify-start font-normal rounded-none"
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

function Home() {
  const [active] = React.useState(false)
  const [theme] = useTheme()
  return (
    <ButtonLink
      variant="ghost"
      className={cn("w-full justify-start", {
        'text-foreground': active,
        'text-muted-foreground': !active,
      })}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        className="mr-3 h-5 w-5"
      >
        <path
          fill="url(#paint0_linear_100_2169)"
          fillRule="evenodd"
          d="M11.386 1.21a1 1 0 011.228 0l9 7A1 1 0 0122 9v11a3 3 0 01-3 3h-5v-6a2 2 0 10-4 0v6H5a3 3 0 01-3-3V9a1 1 0 01.386-.79l9-7z"
          clipRule="evenodd"
        ></path>
        <defs>
          <linearGradient
            id="paint0_linear_100_2169"
            x1="2"
            x2="23.901"
            y1="1"
            y2="20.91"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={active ? theme === 'dark' ? "#fff" : "#111827" : "#ABABAB"}></stop>
            <stop offset="0.75" stopColor={active ? theme === 'dark' ? "#fff" : "#111827" : "#ABABAB"}></stop>
          </linearGradient>
        </defs>
      </svg>
      Beranda
    </ButtonLink>
  )
}

function Template() {
  const [active] = React.useState(true)
  const [theme] = useTheme()
  return (
    <ButtonLink
      variant="ghost"
      className={cn("w-full justify-start", {
        'text-foreground': active,
        'text-muted-foreground': !active,
      })}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        className="mr-3 h-5 w-5"
      >
        <path
          fill="url(#paint0_linear_282_459)"
          fillRule="evenodd"
          d="M20 3H4a1 1 0 00-1 1v5a1 1 0 001 1h16a1 1 0 001-1V4a1 1 0 00-1-1zm-9 11H4a1 1 0 00-1 1v5a1 1 0 001 1h7a1 1 0 001-1v-5a1 1 0 00-1-1zm6 0h3a1 1 0 011 1v5a1 1 0 01-1 1h-3a1 1 0 01-1-1v-5a1 1 0 011-1z"
          clipRule="evenodd"
        ></path>
        <defs>
          <linearGradient
            id="paint0_linear_282_459"
            x1="3"
            x2="21"
            y1="3"
            y2="21"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={active ? theme === 'dark' ? "#fff" : "#111827" : "#ABABAB"}></stop>
            <stop offset="0.75" stopColor={active ? theme === 'dark' ? "#fff" : "#111827" : "#ABABAB"}></stop>
          </linearGradient>
        </defs>
      </svg>
      Template
    </ButtonLink>
  )
}