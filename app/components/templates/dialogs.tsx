import React from 'react'

import {Grid3X3, HeartHandshake, Sparkles} from 'lucide-react'

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
import {Tooltip, TooltipContent, TooltipTrigger} from '../ui/tooltip.tsx'
import {ToggleGroup, ToggleGroupItem} from '../ui/toggle-group.tsx'

import {
  BasicNotes,
  Debt,
  EmergencyFund,
  Investment,
  MonthlyExpenses,
  RegularSaving,
} from './selects.tsx'
// import { PocketGroup } from './pocket.tsx'

import {rupiah} from '~/utils/currency.ts'

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
  const [value, setValue] = React.useState('')

  return (
    <Dialog modal>
      <DialogTrigger asChild onClick={onTrigger}>
        {children}
      </DialogTrigger>
      <DialogPortal>
        <DialogContent className="border-muted h-full max-w-[650px] border md:h-fit">
          <DialogHeader>
            <DialogTitle>Buat Halaman</DialogTitle>
            <Content value={value} setValue={setValue} />
            <DialogFooter className="flex w-full items-center justify-end gap-2 md:gap-0">
              <DialogClose asChild>
                <Button variant="transparent">Batalkan</Button>
              </DialogClose>
              <DialogClose asChild>
                <ButtonLink
                  disabled={!value}
                  to={`/${value}/templates`}
                  className="w-full md:w-fit"
                >
                  Lanjutkan
                </ButtonLink>
              </DialogClose>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
function Content({
  value,
  setValue,
}: {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}) {
  return (
    <div className="flex flex-col gap-4 py-4">
      <ToggleGroup
        type="single"
        className="grid w-full grid-cols-1 gap-2 md:grid-cols-2"
      >
        <ToggleGroupItem
          value="template"
          className="flex h-full w-full flex-1 flex-col items-start gap-4 rounded-md p-4 text-left data-[state=on]:border-slate-500"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-sm border border-slate-400 bg-gradient-to-br from-slate-500 to-slate-300">
            <Grid3X3 className="h-5 w-5" color="#fff" />
          </div>
          <div className="flex flex-col gap-1.5">
            <h4 className="text-sm font-semibold leading-none">Templates</h4>
            <p className="text-muted-foreground text-xs font-normal leading-4">
              Buat halaman dengan template yang telah disediakan
            </p>
          </div>
        </ToggleGroupItem>
        <Tooltip>
          <TooltipTrigger asChild className="h-full w-full">
            <ToggleGroupItem
              value="comunity"
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
            </ToggleGroupItem>
          </TooltipTrigger>
          <TooltipContent side="top">
            <div className="flex items-center gap-1">
              <Sparkles size={14} />
              Akan datang.
            </div>
          </TooltipContent>
        </Tooltip>
      </ToggleGroup>
      <ToggleGroup
        type="single"
        className="grid w-full grid-cols-1 gap-2 md:grid-cols-3"
        onValueChange={v => setValue(v)}
      >
        <BasicNotes />
        <RegularSaving />
        <Investment />
        <MonthlyExpenses />
        <Debt />
        <EmergencyFund />
      </ToggleGroup>
    </div>
  )
}

function UpdatePocket({
  value,
  isOpen,
  setIsOpen,
  onChange,
  // dataset,
  onOpenChange = () => null,
}: {
  value: number
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  onChange: (value: string) => void
  // dataset: PocketsValues[]
  onOpenChange: () => void
}) {
  return (
    <Dialog open={isOpen} onOpenChange={() => onOpenChange()}>
      <DialogTrigger></DialogTrigger>
      <DialogContent
        close={() => setIsOpen(false)}
        className="w-[80vw] md:w-[500px]"
      >
        <DialogHeader>
          <DialogTitle>Masuk</DialogTitle>
        </DialogHeader>
        <div className="mt-4 flex flex-col gap-4">
          <div className="text-sm font-medium">{rupiah(value)}</div>
          {/* <PocketGroup
            dataset={dataset}
            onChange={onChange}
            onClose={() => {
              setIsOpen(false)
            }}
          /> */}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export {CreatePostDialog, UpdatePocket, Content as CreatePostContent}
