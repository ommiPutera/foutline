import {
  ArrowUpRight,
  MoreHorizontal,
  ShoppingBag,
  Star,
  Trash,
} from 'lucide-react'

import type {TooltipContentProps} from '@radix-ui/react-tooltip'

import clsx from 'clsx'
import _ from 'lodash'
import React from 'react'
import {create} from 'zustand'

import {Button, ButtonLink} from '~/components/ui/button.tsx'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card.tsx'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover.tsx'
import {SelectSeparator} from '~/components/ui/select.tsx'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~/components/ui/tooltip.tsx'

import type {Post} from '@prisma/client'
import {Link, useLocation, useSubmit} from '@remix-run/react'

import {cn} from '~/lib/utils.ts'
import {getPostType} from '~/utils/get-post-type.ts'
import {FormType} from './route.tsx'

interface CardState {
  idCardFocus: string
  setIdCardFocus: (id: string) => void
}

const useCardStore = create<CardState>(set => ({
  idCardFocus: '',
  setIdCardFocus: id => set(() => ({idCardFocus: id})),
}))

function CardItem(post: Post) {
  const {id, preview, title} = post
  const {idCardFocus, setIdCardFocus} = useCardStore()
  const location = useLocation()

  React.useEffect(() => {
    if (location.pathname) {
      setIdCardFocus('')
    }
  }, [location.pathname, setIdCardFocus])

  return (
    <Link to={`/monthly/${id}`} prefetch="intent">
      <Card
        key={id}
        className={cn(
          'hover:border-ring col-span-1 h-full cursor-pointer overflow-hidden border-[1px] md:h-fit',
          idCardFocus === id && 'border-ring',
        )}
      >
        <CardHeader className="bg-monthly-background pb-3">
          <CardTitle className="items-first flex gap-2">
            <div>
              <PageIcon />
            </div>
            <div className="mt-[1px] line-clamp-2 w-full text-xs font-semibold">
              {title}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="from-monthly-background to-background/20 relative bg-gradient-to-b pb-4">
          <ContentPreview content={preview ?? ''} />
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
              className={clsx('visible relative flex w-fit items-center gap-1')}
            >
              <Favorite
                side="bottom"
                tooltipText={{
                  active: 'Batalkan favorit',
                  notActive: 'Tambahkan ke favorit',
                }}
              />
              <More {...post} />
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
  tooltipText?: {active: string; notActive: string}
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
            className={clsx({'fill-[#FFA500]': isFavorited})}
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent side={side}>
        <p>{isFavorited ? tooltipText?.active : tooltipText?.notActive}</p>
      </TooltipContent>
    </Tooltip>
  )
}

function ContentPreview({content}: {content: string | JSX.Element}) {
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

function More({id, type}: Post) {
  const {setIdCardFocus} = useCardStore()
  return (
    <Popover onOpenChange={v => (v ? setIdCardFocus(id) : setIdCardFocus(''))}>
      <div className="flex h-full">
        <PopoverTrigger asChild>
          <Button size="icon" variant="transparent" className="rounded-full">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent
        className="h-fit w-48 p-0"
        align="end"
        side="right"
        forceMount
      >
        <div className="my-2">
          <ButtonLink
            to={`/${getPostType(type)}/${id}`}
            prefetch="intent"
            variant="ghost"
            size="sm"
            className="w-full justify-start rounded-none px-3"
          >
            <ArrowUpRight size="16" className="mr-2" />
            <span>Buka halaman</span>
          </ButtonLink>
        </div>
        <SelectSeparator className="z-0" />
        <div className="my-2">
          <Remove id={id} />
        </div>
      </PopoverContent>
    </Popover>
  )
}

function Remove({id}: {id: Post['id']}) {
  const submit = useSubmit()
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => submit({id, _action: FormType.DELETE}, {method: 'POST'})}
      className="w-full justify-start rounded-none px-3"
    >
      <Trash size="16" className="mr-2" />
      <span>Pindahkan ke sampah</span>
    </Button>
  )
}

export default CardItem
export {Favorite as FavoriteButton, PageIcon}
