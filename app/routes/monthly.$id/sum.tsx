import React from 'react'

import {Info, PanelLeftClose, PanelRightClose} from 'lucide-react'

import {Button} from '~/components/ui/button.tsx'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~/components/ui/tooltip.tsx'

import {rupiah} from '~/utils/currency.ts'

function Sum() {
  const [isOpen, setIsOpen] = React.useState(true)

  return (
    <div className="hidden lg:block">
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
      <Wrapper isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}

function Wrapper({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const totalIncome = 0
  const totalExpense = 0
  const freeCash = totalIncome - totalExpense

  return (
    <>
      <div
        data-state={isOpen ? 'open' : 'closed'}
        className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:w-0 data-[state=open]:w-[340px] data-[state=closed]:duration-300 data-[state=open]:duration-500"
      ></div>
      <div
        data-state={isOpen ? 'open' : 'closed'}
        className="data-[state=open]:animate-in data-[state=closed]:animate-out fixed right-0 h-screen border-l bg-white transition-all ease-in-out data-[state=closed]:w-0 data-[state=open]:w-[340px]  data-[state=closed]:opacity-0 data-[state=closed]:duration-300 data-[state=open]:duration-500 dark:bg-zinc-900"
      >
        <div className="sticky top-20 flex w-[340px] flex-col gap-8 px-6">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="flex w-fit items-center gap-2 rounded-lg"
          >
            <PanelRightClose className="h-4 w-4" strokeWidth={2.5} />
            <p className="text-[13px]">Tutup</p>
          </Button>
          <div>
            <div className="flex items-center text-base font-semibold">
              Perhitungan
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="transparent" size="icon">
                    <Info className="h-4 w-4 fill-blue-500 text-white" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p className="max-w-[200px] text-xs font-normal leading-4">
                    Perhitungan akan bereaksi terhadap perubahan catatan
                    keuangan bulanan
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="text-muted-foreground text-xs">
              Selalu pastikan pengeluaran anda tidak melebihi pemasukan anda
            </div>
          </div>
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
        </div>
      </div>
    </>
  )
}

export default Sum
