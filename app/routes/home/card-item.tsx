import {ShoppingBag} from 'lucide-react'

import clsx from 'clsx'
import React from 'react'
import {create} from 'zustand'

import {formatDistance} from 'date-fns'
import {id as IDNLocale} from 'date-fns/locale'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card.tsx'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~/components/ui/tooltip.tsx'

import {PostStatus, type Post} from '@prisma/client'
import {Link, useLocation} from '@remix-run/react'

import {cn} from '~/lib/utils.ts'
import More from './more.tsx'
import Favorite from './favorite.tsx'

interface CardState {
  idCardFocus: string
  setIdCardFocus: (id: string) => void
}

const useCardStore = create<CardState>(set => ({
  idCardFocus: '',
  setIdCardFocus: id => set(() => ({idCardFocus: id})),
}))

function CardItem(post: Post) {
  const {id, preview, title, updatedAt, status} = post
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
          'hover:border-muted-foreground/60 col-span-1 h-full cursor-pointer overflow-hidden border-[1px] md:h-fit',
          idCardFocus === id && 'border-ring',
        )}
      >
        <CardHeader className="bg-monthly-background pb-3">
          <CardTitle className="items-first flex gap-2">
            <div>
              <PageIcon />
            </div>
            <div className="mt-[1px] line-clamp-2 w-full text-xs font-semibold text-black">
              {title}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="bg-monthly-background relative py-4">
          <ContentPreview content={preview ?? ''} />
          <div className="from-monthly-background to-monthly-background/30 absolute bottom-0 left-0 -mt-1 h-full w-full bg-gradient-to-t"></div>
        </CardContent>
        <CardFooter className="bg-monthly-background justify-between gap-2 py-2.5">
          <div className="flex flex-1 flex-col justify-end gap-1.5">
            <Tooltip>
              <TooltipTrigger asChild>
                <CardBadge status={status} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Status halaman</p>
              </TooltipContent>
            </Tooltip>
            <div className="text-muted-foreground line-clamp-1 text-[10px] leading-none">
              {formatDistance(new Date(updatedAt), new Date(), {
                addSuffix: true,
                includeSeconds: true,
                locale: IDNLocale,
              })}
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

function PageIcon({className}: {className?: string}) {
  return (
    <div
      className={cn(
        'flex h-5 w-5 items-center justify-center rounded-sm border border-orange-400 bg-gradient-to-tr from-orange-500 to-orange-300',
        className,
      )}
    >
      <ShoppingBag className="h-3.5 w-3.5" color="#fff" />
    </div>
  )
}

function ContentPreview({content}: {content: string | JSX.Element}) {
  if (typeof content === 'string')
    return (
      <div className="line-clamp-6 text-[11px] leading-4 text-black md:text-xs md:leading-snug">
        {content}
      </div>
    )
  return (
    <div>
      <p className="text-xs">{content}</p>
    </div>
  )
}

function CardBadge({status}: Pick<Post, 'status'>) {
  const getStatusStr = () => {
    switch (status) {
      case 'NOT_STARTED':
        return 'Belum berjalan'
      case 'COMPLETED':
        return 'Selesai'
      case 'UNDERWAY':
        return 'Sedang berjalan'
    }
  }

  return (
    <div
      className={cn(
        'line-clamp-1 w-fit rounded-sm px-1 py-[3px] text-[9px] leading-none text-white',
        status === PostStatus.COMPLETED && 'bg-ring/90',
        status === PostStatus.NOT_STARTED && 'bg-muted-foreground',
        status === PostStatus.UNDERWAY && 'bg-blue-500',
      )}
    >
      {getStatusStr()}
    </div>
  )
}

export default CardItem
export {PageIcon, useCardStore}
