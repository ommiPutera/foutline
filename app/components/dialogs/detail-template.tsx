import React from 'react'

import {PostType, type Post} from '@prisma/client'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog.tsx'
import {Button} from '~/components/ui/button.tsx'
import {Separator} from '~/components/ui/separator.tsx'

import PageIcon from '../page-icon.tsx'

import {cn} from '~/lib/utils.ts'

import {getTypeStr} from '~/utils/misc.tsx'
import {useRootLoader} from '~/utils/use-root-loader.tsx'

function DetailTemplate({
  children,
  isPending,
  onTrigger,
  title,
  author,
  type,
  imgSrc,
  description,
  onSubmit,
}: {
  children: React.ReactNode
} & {
  isPending: boolean
  onTrigger?: () => void
  title: string
  author: string
  type: string
  imgSrc: string
  description: string
  onSubmit: () => void
} & Pick<Post, 'type'>) {
  const {user} = useRootLoader()

  return (
    <Dialog modal>
      <DialogTrigger asChild onClick={onTrigger}>
        {children}
      </DialogTrigger>
      <DialogPortal>
        <DialogContent className="no-scrollbar h-full overflow-y-scroll px-2 py-6 sm:inset-y-auto md:mt-12 md:h-fit md:max-h-[75vh] md:max-w-[980px] md:!rounded-2xl md:px-10 md:py-8">
          <DialogHeader className="mx-auto mb-8 w-full max-w-screen-lg">
            <DialogTitle className="text-2xl md:ml-4">{title}</DialogTitle>
            <p className="text-muted-foreground text-sm md:ml-4">
              Kreator: {author}
            </p>
          </DialogHeader>
          <div className="no-scrollbar mx-auto flex h-full w-[90vw] max-w-screen-lg flex-col items-start justify-between gap-10 overflow-y-scroll md:w-full md:flex-row">
            <div className="w-full max-w-xl">
              <img
                src={imgSrc}
                alt=""
                className="cursor-pointer rounded-xl object-cover p-0 shadow-xl"
              />
            </div>
            <div className="flex h-full w-full max-w-[380px] flex-col gap-8">
              <div className="flex flex-col gap-4">
                <p className="text-lg font-semibold">Tentang template ini</p>
                <p className="text-sm font-normal leading-6">{description}</p>
              </div>
              <div>
                <div
                  className={cn(
                    'flex w-fit items-center gap-2 rounded-md border px-3 py-2',
                    type === PostType.MONTHLY_PLANNING &&
                      'bg-monthly-background border-monthly/30',
                    type === PostType.BASIC_NOTES &&
                      'bg-note-background border-note/30',
                  )}
                >
                  <PageIcon type={type} />
                  <p className="text-xs font-medium">{getTypeStr(type)}</p>
                </div>
              </div>
              <Separator className="my-2" />
              <div className="flex items-center justify-end gap-2">
                <Button
                  disabled={isPending || user?.posts.length === 12}
                  onClick={user?.posts.length === 12 ? () => null : onSubmit}
                >
                  {isPending ? 'Membeli..' : 'Beli Rp.0'}
                </Button>
                <DialogClose asChild>
                  <Button type="button" variant="transparent">
                    Batalkan
                  </Button>
                </DialogClose>
              </div>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

export default DetailTemplate
