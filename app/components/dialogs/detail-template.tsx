import React from 'react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog.tsx'
import {Button} from '../ui/button.tsx'
import {Separator} from '../ui/separator.tsx'

import PageIcon from '../page-icon.tsx'

function DetailTemplate({
  children,
  isPending,
  onTrigger,
  title,
  author,
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
  imgSrc: string
  description: string
  onSubmit: () => void
}) {
  return (
    <Dialog modal>
      <DialogTrigger asChild onClick={onTrigger}>
        {children}
      </DialogTrigger>
      <DialogPortal>
        <DialogContent className="inset-y-auto mt-12 h-fit max-h-[75vh] max-w-[980px] overflow-y-scroll !rounded-2xl px-10 py-8">
          <DialogHeader className="mx-auto mb-8 w-full max-w-screen-lg">
            <DialogTitle className="ml-4 text-2xl">{title}</DialogTitle>
            <p className="text-muted-foreground ml-4 text-sm">
              Kreator: {author}
            </p>
          </DialogHeader>
          <div className="mx-auto flex w-full max-w-screen-lg items-start justify-between gap-10">
            <div className="w-full max-w-xl">
              <img
                src={imgSrc}
                alt=""
                className="cursor-pointer rounded-xl object-cover p-0 shadow-xl"
              />
            </div>
            <div className="flex h-full w-[380px] flex-col gap-8">
              <div className="flex flex-col gap-4">
                <p className="text-lg font-semibold">Tentang template ini</p>
                <p className="text-sm font-normal leading-6">{description}</p>
              </div>
              <div>
                <div className="bg-monthly-background border-monthly/30 flex w-fit items-center gap-2 rounded-md border px-3 py-2">
                  <PageIcon />
                  <p className="text-xs font-medium">Keuangan Bulanan</p>
                </div>
              </div>
              <Separator className="my-2" />
              <div className="flex items-center justify-end gap-2">
                <Button disabled={isPending} onClick={onSubmit}>
                  {isPending ? 'Membuat..' : 'Beli Rp.0'}
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
