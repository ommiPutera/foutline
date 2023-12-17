import clsx from 'clsx'
import {Grid3X3, HeartHandshake, Sparkles} from 'lucide-react'
import React from 'react'
import {Button, ButtonLink} from '../ui/button.tsx'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog.tsx'
import {Toggle} from '../ui/toggle.tsx'
import {Tooltip, TooltipContent, TooltipTrigger} from '../ui/tooltip.tsx'
import _ from 'lodash'
import {PageSelectGroup} from './selects.tsx'

function CreatePostDialog({
  children,
  onTrigger,
  withoutTooltip,
}: {
  children: React.ReactNode
} & {
  onTrigger?: () => void
  withoutTooltip?: boolean
}) {
  const [isHover, setIsHover] = React.useState(false)

  return (
    <Dialog modal>
      <Tooltip open={isHover}>
        <div className="flex h-full">
          <TooltipTrigger
            className="w-full"
            onMouseEnter={() => _.delay(() => setIsHover(true), 30)}
            onMouseLeave={() => _.delay(() => setIsHover(false), 60)}
          >
            <DialogTrigger asChild onClick={onTrigger}>
              {children}
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            className={clsx('hidden md:block', {'md:hidden': withoutTooltip})}
          >
            <p>Buat halaman baru</p>
          </TooltipContent>
        </div>
      </Tooltip>
      <DialogPortal>
        <DialogContent className="border-muted h-full max-w-[650px] border md:h-fit">
          <DialogHeader>
            <DialogTitle>Buat halaman</DialogTitle>
            <div className="flex flex-col gap-4 py-4">
              <div className="flex w-full items-center gap-4">
                <Toggle className="flex h-full w-1/2 flex-1 flex-col items-start gap-4 rounded-md p-4 text-left data-[state=on]:border-slate-500">
                  <div className="flex h-7 w-7 items-center justify-center rounded-sm border border-slate-400 bg-gradient-to-br from-slate-500 to-slate-300">
                    <Grid3X3 className="h-5 w-5" color="#fff" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h4 className="text-sm font-semibold leading-none">
                      Templates
                    </h4>
                    <p className="text-muted-foreground text-xs font-normal leading-4">
                      Buat halaman dengan template yang telah disediakan
                    </p>
                  </div>
                </Toggle>
                <Tooltip>
                  <TooltipTrigger className="h-full w-1/2">
                    <Toggle
                      disabled
                      className="flex h-full flex-1 flex-col items-start gap-4 rounded-md p-4 text-left data-[state=on]:border-teal-500"
                    >
                      <div className="flex h-7 w-7 items-center justify-center rounded-sm border border-teal-400 bg-gradient-to-br from-teal-500 to-teal-300">
                        <HeartHandshake className="h-5 w-5" color="#fff" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <h4 className="text-sm font-semibold leading-none">
                          Komunitas
                        </h4>
                        <p className="text-muted-foreground text-xs font-normal leading-4">
                          Buat halaman berdasarkan koleksi dari pengguna lain
                        </p>
                      </div>
                    </Toggle>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <div className="flex items-center gap-1">
                      <Sparkles size={14} />
                      Akan datang.
                    </div>
                  </TooltipContent>
                </Tooltip>
              </div>
              <PageSelectGroup />
            </div>
            <DialogFooter className="flex w-full items-center justify-end gap-2 md:gap-0">
              <DialogClose asChild>
                <Button variant="transparent">Batalkan</Button>
              </DialogClose>
              <DialogClose asChild>
                <ButtonLink
                  to="/new"
                  prefetch="intent"
                  className="w-full md:w-fit"
                >
                  Buat
                </ButtonLink>
              </DialogClose>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

export {CreatePostDialog}
