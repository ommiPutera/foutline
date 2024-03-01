import {Info, PanelRightClose} from 'lucide-react'

import {Button} from '~/components/ui/button.tsx'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~/components/ui/tooltip.tsx'

import {type Props as EditorProps} from './content.tsx'

import {rupiah} from '~/utils/currency.ts'
import React from 'react'

type Props = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
} & Pick<EditorProps, 'editor' | 'setEditor'>

function Sum({isOpen, setIsOpen, editor, setEditor}: Props) {
  return (
    <>
      <div
        data-state={isOpen ? 'open' : 'closed'}
        className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:w-0 data-[state=open]:w-[340px] data-[state=closed]:duration-300 data-[state=open]:duration-500"
      ></div>
      <div
        data-state={isOpen ? 'open' : 'closed'}
        className="data-[state=open]:animate-in data-[state=closed]:animate-out fixed right-0 h-screen border-l bg-white transition-all ease-in-out data-[state=closed]:w-0 data-[state=open]:w-[340px] data-[state=closed]:duration-300 data-[state=open]:duration-500 dark:bg-zinc-900"
      >
        <div className="sticky top-20 flex w-[340px] flex-col gap-8 px-6">
          <ButtonHide setIsOpen={setIsOpen} />
          <Title />
          <Summary editor={editor} setEditor={setEditor} />
        </div>
      </div>
    </>
  )
}

function ButtonHide({setIsOpen}: Pick<Props, 'setIsOpen'>) {
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
      <div className="text-muted-foreground text-xs">
        Selalu pastikan pengeluaran anda tidak melebihi pemasukan anda
      </div>
    </div>
  )
}

function Summary({editor, setEditor}: Pick<Props, 'editor' | 'setEditor'>) {
  const totalIncome = 0
  const totalExpense = 0
  const freeCash = totalIncome - totalExpense

  React.useEffect(() => {
    console.log('editor: ', editor)
  }, [editor])

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h5 className="text-muted-foreground flex items-center gap-2 text-xs">
          <div className="h-2 w-2 rounded-full bg-green-300"></div>
          Pemasukan
        </h5>
        <p className="text-sm font-semibold tracking-tight">
          {!totalIncome ? rupiah(12000000) : rupiah(totalIncome)}
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <h5 className="text-muted-foreground flex items-center gap-2 text-xs">
          <div className="h-2 w-2 rounded-full bg-red-300"></div>
          Pengeluaran
        </h5>
        <p className="text-sm font-semibold tracking-tight">
          {!totalExpense ? rupiah(0) : rupiah(totalExpense)}
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <h5 className="text-muted-foreground flex items-center gap-2 text-xs">
          <div className="h-2 w-2 rounded-full bg-gray-200"></div>
          Belum dialokasikan (Free Cash)
        </h5>
        <p className="text-sm font-semibold tracking-tight">
          {!freeCash ? rupiah(12000000) : rupiah(freeCash)}
        </p>
      </div>
    </div>
  )
}

export default Sum
