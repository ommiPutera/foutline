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

import {PostStatus, type Post, PostType} from '@prisma/client'
import {Link, useFetcher, useLocation} from '@remix-run/react'

import {capitalizeFirstLetter, cn} from '~/lib/utils.ts'

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

  const [isDeleting, setIsDeleting] = React.useState(false)

  const location = useLocation()
  const deleteFetcher = useFetcher()

  React.useEffect(() => {
    if (location.pathname) {
      setIdCardFocus('')
    }
  }, [location.pathname, setIdCardFocus])

  React.useEffect(() => {
    if (
      deleteFetcher.state === 'loading' ||
      deleteFetcher.state === 'submitting'
    ) {
      setIsDeleting(true)
    }
  }, [deleteFetcher])

  return isDeleting ? null : (
    <Link
      to={`/${getPostType(type)}/${id}`}
      prefetch="intent"
      className="h-fit"
    >
      <Card
        key={id}
        className={cn(
          'hover:border-muted-foreground/60 col-span-1 h-fit cursor-pointer overflow-hidden border-[1px]',
          idCardFocus === id && 'border-muted-foreground/60',
        )}
      >
        <CardHeader
          className={cn(
            'pb-3',
            type === PostType.MONTHLY_PLANNING && 'bg-monthly-background',
            type === PostType.BASIC_NOTES && 'bg-note-background',
          )}
        >
          <CardTitle className="items-first flex gap-2.5">
            <div>
              <PageIcon type={type} />
            </div>
            <div
              className={cn(
                'mt-[-2px] line-clamp-2 w-full text-[13px] font-semibold leading-5',
                type === PostType.MONTHLY_PLANNING && 'text-monthly',
                type === PostType.BASIC_NOTES && 'text-note',
              )}
            >
              {title}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent
          className={cn(
            'relative pb-2',
            type === PostType.MONTHLY_PLANNING && 'bg-monthly-background',
            type === PostType.BASIC_NOTES && 'bg-note-background',
          )}
        >
          <ContentPreview content={preview ?? ''} />
          <div
            className={cn(
              'text absolute bottom-0 left-0 -mt-1 h-full w-full bg-gradient-to-t',
              type === PostType.MONTHLY_PLANNING &&
                'from-monthly-background to-monthly-background/30',
              type === PostType.BASIC_NOTES &&
                'from-note-background to-note-background/30',
            )}
          ></div>
        </CardContent>
        <CardFooter
          className={cn(
            'justify-between gap-2 py-2.5',
            type === PostType.MONTHLY_PLANNING && 'bg-monthly-background',
            type === PostType.BASIC_NOTES && 'bg-note-background',
          )}
        >
          <div className="flex flex-1 flex-col justify-end gap-1.5">
            <CardBadge status={status} type={type} />
            <div className="text-muted-foreground line-clamp-2 text-[9px]">
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
              <More {...(post as any as Post)} deleteFetcher={deleteFetcher} />
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}

function ContentPreview({content}: {content: string | JSX.Element}) {
  return (
    <div className="text-[11.5px] leading-4 text-black dark:text-white md:text-xs md:leading-snug">
      {content}
    </div>
  )
}

function CardBadge({status, type}: Pick<Post, 'status' | 'type'>) {
  const getStatusStr = () => {
    switch (status) {
      case 'NOT_STARTED':
        return 'Belum Berjalan'
      case 'COMPLETED':
        return 'Selesai'
      case 'UNDERWAY':
        return 'Sedang Berjalan'
    }
  }

  if (type === 'BASIC_NOTES') return <></>
  return (
    <div
      className={cn(
        'text-foreground line-clamp-1 w-fit rounded-sm px-1.5 py-[3.5px] text-[10px] leading-none',
        status === PostStatus.COMPLETED && 'bg-ring/30 hover:!bg-ring/20',
        status === PostStatus.NOT_STARTED &&
          'bg-muted-foreground/20 hover:!bg-muted-foreground/10',
        status === PostStatus.UNDERWAY &&
          'bg-blue-500/30 hover:!bg-blue-500/20',
      )}
    >
      {getStatusStr()}
    </div>
  )
}

export default CardItem
export {PageIcon, useCardStore, ContentPreview}
