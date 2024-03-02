import React from 'react'

import {PanelLeftClose, PanelRightClose, Info} from 'lucide-react'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~/components/ui/tooltip.tsx'
import {Button} from '~/components/ui/button.tsx'

import {type Props as EditorProps} from './content.tsx'

import Sum from './sum.tsx'

type Props = {incomesValues: number[]; expensesValues: number[]} & Pick<
  EditorProps,
  'editor'
>

function RightSheet({editor, incomesValues, expensesValues}: Props) {
  const [isOpen, setIsOpen] = React.useState(true)

  return (
    <div className="hidden lg:block">
      <ButtonOpen isOpen={isOpen} setIsOpen={setIsOpen} />
      <Sum
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        editor={editor}
        incomesValues={incomesValues}
        expensesValues={expensesValues}
      />
    </div>
  )
}

function ButtonOpen({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  return (
    <div
      data-state={isOpen ? 'open' : 'closed'}
      className="fixed right-4 top-20 transition delay-500 duration-0 data-[state=closed]:opacity-100 data-[state=open]:opacity-0"
    >
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-lg"
      >
        <PanelLeftClose className="h-4 w-4" strokeWidth={2.5} />
        <p className="text-[13px]">Buka</p>
      </Button>
    </div>
  )
}

function ButtonHide({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={() => setIsOpen(false)}
      className="bg-background hover:bg-background/50 flex w-fit items-center gap-2 rounded-lg"
    >
      <PanelRightClose className="h-4 w-4" strokeWidth={2.5} />
      <p className="text-[13px]">Tutup</p>
    </Button>
  )
}

function Title() {
  return (
    <div>
      <div className="flex items-center text-base font-bold">
        Perhitungan
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="transparent" size="icon">
              <Info className="h-4 w-4 fill-blue-500 text-white" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p className="max-w-[200px] text-xs font-normal leading-4">
              Perhitungan akan bereaksi terhadap perubahan catatan keuangan
              bulanan
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="text-muted-foreground max-w-[200px] text-xs">
        Selalu pastikan pengeluaran tidak melampaui pemasukan Anda
      </div>
    </div>
  )
}

export {ButtonHide, Title, RightSheet as default}
