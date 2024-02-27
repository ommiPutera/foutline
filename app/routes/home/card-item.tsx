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
import PageIcon from '~/components/page-icon.tsx'

import {PostStatus, type Post} from '@prisma/client'
import {Link, useLocation} from '@remix-run/react'

import {cn} from '~/lib/utils.ts'

import {getPostType} from '~/utils/get-post-type.ts'

import Favorite from './favorite.tsx'
import More from './more.tsx'

interface CardState {
  idCardFocus: string
  setIdCardFocus: (id: string) => void
}

const useCardStore = create<CardState>(set => ({
  idCardFocus: '',
  setIdCardFocus: id => set(() => ({idCardFocus: id})),
}))

function CardItem(post: Post) {
  const {id, preview, title, updatedAt, type, status} = post
  const {idCardFocus, setIdCardFocus} = useCardStore()

  const location = useLocation()

  React.useEffect(() => {
    if (location.pathname) {
      setIdCardFocus('')
    }
  }, [location.pathname, setIdCardFocus])

  return (
    <Link to={`/${getPostType(type)}/${id}`} prefetch="intent">
      <Card
        key={id}
        className={cn(
          'hover:border-muted-foreground/60 col-span-1 h-full cursor-pointer overflow-hidden border-[1px] md:h-fit',
          idCardFocus === id && 'border-muted-foreground/60',
        )}
      >
        <CardHeader className="bg-monthly-background pb-3">
          <CardTitle className="items-first flex gap-2.5">
            <div>
              <PageIcon />
            </div>
            <div className="text-monthly mt-[-2.5px] line-clamp-2 w-full text-[13px] font-semibold leading-5">
              {title}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="bg-monthly-background relative py-4">
          <ContentPreview content={preview ?? ''} />
          <div className="from-monthly-background to-monthly-background/30 text absolute bottom-0 left-0 -mt-1 h-full w-full bg-gradient-to-t"></div>
        </CardContent>
        <CardFooter className="bg-monthly-background justify-between gap-2 py-2.5">
          <div className="flex flex-1 flex-col justify-end gap-1.5">
            <CardBadge status={status} />
            <div className="text-muted-foreground line-clamp-2 text-[11px]">
              {capitalizeFirstLetter(
                formatDistance(new Date(updatedAt), new Date(), {
                  addSuffix: true,
                  includeSeconds: true,
                  locale: IDNLocale,
                }),
              )}
            </div>
          </div>
          <div className="-mr-2 flex justify-end" id="test">
            <div
              onClick={(e: React.MouseEvent<HTMLElement>) => e.preventDefault()}
              className="visible relative flex w-fit items-center gap-1"
            >
              <Favorite {...(post as any as Post)} />
              <More {...(post as any as Post)} />
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}

function ContentPreview({content}: {content: string | JSX.Element}) {
  if (typeof content === 'string')
    return (
      <div className="line-clamp-6 text-[11px] leading-4 text-black dark:text-white md:text-xs md:leading-snug">
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
        'line-clamp-1 w-fit rounded-sm px-1.5 py-[3.5px] text-[10px] leading-none text-white',
        status === PostStatus.COMPLETED && 'bg-ring/90',
        status === PostStatus.NOT_STARTED && 'bg-muted-foreground',
        status === PostStatus.UNDERWAY && 'bg-blue-500',
      )}
    >
      {getStatusStr()}
    </div>
  )
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export default CardItem
export {PageIcon, useCardStore}
