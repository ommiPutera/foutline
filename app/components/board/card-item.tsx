import { ShoppingBag, MoreHorizontal, Settings, Star } from 'lucide-react'
import { Button, ButtonLink } from '../ui/button.tsx'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card.tsx'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip.tsx'
import React from 'react'
import clsx from 'clsx'
import type { TooltipContentProps } from '@radix-ui/react-tooltip'
import _ from 'lodash'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover.tsx'
import { Link } from '@remix-run/react'

function CardItem({
  id,
  content,
  title,
}: {
  id: string
  content: string
  title: string
}) {
  const [isHover, setIsHover] = React.useState(false)
  return (
    <Link to={`/monthly/${id}`} prefetch="intent">
      <Card
        key={id}
        onMouseEnter={() => _.delay(() => setIsHover(true), 30)}
        onMouseLeave={() => _.delay(() => setIsHover(false), 60)}
        className="hover:border-ring col-span-1 h-full cursor-pointer overflow-hidden md:h-fit"
      >
        <CardHeader className="bg-monthly-background pb-3">
          <CardTitle className="items-first flex gap-2">
            <div>
              <PageIcon />
            </div>
            <div className="mt-[1.5px] line-clamp-2 w-full text-xs font-semibold">
              {title}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="from-monthly-background to-background/20 relative bg-gradient-to-b pb-4">
          <ContentPreview content={content} />
          <div className="from-background to-monthly-background/20 absolute bottom-0 left-0 -mt-1 h-full w-full bg-gradient-to-t"></div>
        </CardContent>
        <CardFooter className="justify-between gap-2 py-2.5">
          <div className="flex flex-1 flex-col justify-end gap-1.5">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="bg-ring line-clamp-1 w-fit rounded-sm px-1 py-[3px] text-[9px] leading-none text-white">
                  Selesai
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Status halaman</p>
              </TooltipContent>
            </Tooltip>
            <div className="text-muted-foreground line-clamp-1 text-[10px] leading-none">
              10 menit yang lalu
            </div>
          </div>
          <div className="-mr-2 flex justify-end" id="test">
            <div
              onClick={(e: React.MouseEvent<HTMLElement>) => e.preventDefault()}
              className={clsx(
                'visible relative flex w-fit items-center gap-1',
                {
                  invisible: !isHover,
                },
              )}
            >
              <Favorite
                side="bottom"
                tooltipText={{
                  active: 'Batalkan favorit',
                  notActive: 'Tambahkan ke favorit',
                }}
              />
              <More />
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}

function PageIcon() {
  return (
    <div className="flex h-5 w-5 items-center justify-center rounded-sm border border-orange-400 bg-gradient-to-tr from-orange-500 to-orange-300">
      <ShoppingBag className="h-3.5 w-3.5" color="#fff" />
    </div>
  )
}

function Favorite({
  tooltipText,
  defaultValue = false,
  side,
  callBack,
  size = 'default',
}: {
  tooltipText?: { active: string; notActive: string }
  defaultValue?: boolean
  side?: TooltipContentProps['side']
  callBack?: () => void
  size?: 'sm' | 'default'
}) {
  const [isFavorited, setIsFavorited] = React.useState(defaultValue)
  const [isHover, setIsHover] = React.useState(false)

  const handleClick = () => {
    setIsFavorited(!isFavorited)
    if (typeof callBack === 'function') {
      callBack()
    }
  }

  return (
    <Tooltip disableHoverableContent open={isHover}>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          onMouseEnter={() => _.delay(() => setIsHover(true), 30)}
          onMouseLeave={() => _.delay(() => setIsHover(false), 60)}
          onClick={handleClick}
          variant="transparent"
          className={clsx(
            'h-5 w-5 hover:[&:has(svg)]:before:bg-[#FFA500]/10 [&:hover>svg]:text-[#FFA500]',
            {
              'h-5 w-5 [&:has(svg)]:text-[#FFA500]': isFavorited,
            },
          )}
        >
          <Star
            size={size === 'sm' ? 12 : 14}
            className={clsx({ 'fill-[#FFA500]': isFavorited })}
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent side={side}>
        <p>{isFavorited ? tooltipText?.active : tooltipText?.notActive}</p>
      </TooltipContent>
    </Tooltip>
  )
}

function ContentPreview({ content }: { content: string | JSX.Element }) {
  if (typeof content === 'string')
    return (
      <div className="line-clamp-6 text-[11px] leading-4 md:text-xs md:leading-snug">
        {content}
      </div>
    )
  return (
    <div>
      <p className="text-xs">{content}</p>
    </div>
  )
}

function More() {
  return (
    <Popover>
      <div className="flex h-full">
        <PopoverTrigger asChild>
          <Button size="icon" variant="transparent" className="rounded-full">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent
        className="h-fit w-44 p-1.5"
        align="end"
        side="right"
        forceMount
      >
        <ButtonLink variant="ghost" className="w-full justify-start rounded-sm">
          <Settings size="16" className="mr-3" />
          <span>Pengaturan</span>
        </ButtonLink>
        <ButtonLink variant="ghost" className="w-full justify-start rounded-sm">
          <Settings size="16" className="mr-3" />
          <span>Pengaturan</span>
        </ButtonLink>
        <ButtonLink variant="ghost" className="w-full justify-start rounded-sm">
          <Settings size="16" className="mr-3" />
          <span>Pengaturan</span>
        </ButtonLink>
        <ButtonLink variant="ghost" className="w-full justify-start rounded-sm">
          <Settings size="16" className="mr-3" />
          <span>Pengaturan</span>
        </ButtonLink>
        <ButtonLink variant="ghost" className="w-full justify-start rounded-sm">
          <Settings size="16" className="mr-3" />
          <span>Pengaturan</span>
        </ButtonLink>
      </PopoverContent>
    </Popover>
  )
}

export default CardItem
export { Favorite as FavoriteButton, PageIcon }
