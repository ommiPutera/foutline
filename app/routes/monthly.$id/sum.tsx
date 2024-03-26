import React from 'react'

import _ from 'lodash'

import {type Props as EditorProps} from './content.tsx'

import {rupiah} from '~/utils/currency.ts'

import {ButtonHide, Title} from './right-sheet.tsx'
import {Skeleton} from '~/components/ui/skeleton.tsx'
import {Button} from '~/components/ui/button.tsx'
import {ScrollArea} from '~/components/ui/scroll-area.tsx'
import {Separator} from '~/components/ui/separator.tsx'

type Props = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  groupedTaskItems: any
  incomesValues: number[]
  expensesValues: number[]
} & Pick<EditorProps, 'editor'>

function Sum({
  isOpen,
  setIsOpen,
  editor,
  groupedTaskItems,
  incomesValues,
  expensesValues,
}: Props) {
  return (
    <>
      <div
        data-state={isOpen ? 'open' : 'closed'}
        className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:w-0 data-[state=open]:w-[var(--sidebar-width-xl)] data-[state=closed]:duration-300 data-[state=open]:duration-500"
      ></div>
      <div
        data-state={isOpen ? 'open' : 'closed'}
        className="data-[state=open]:animate-in data-[state=closed]:animate-out no-scrollbar fixed right-0 h-screen overflow-y-scroll bg-white transition-all ease-in-out data-[state=closed]:w-0 data-[state=open]:w-[var(--sidebar-width-xl)] data-[state=closed]:duration-300 data-[state=open]:duration-500 dark:bg-zinc-900"
      >
        <ScrollArea className="relative h-[100vh] w-[var(--sidebar-width-xl)] px-6">
          <div className="sticky top-0 z-10 flex flex-col gap-4 bg-white pb-4 pt-16 dark:bg-zinc-900">
            <ButtonHide setIsOpen={setIsOpen} />
            <Title
              title="Perhitungan"
              tooltipDesc="Perhitungan akan bereaksi terhadap perubahan catatan keuangan bulanan"
              desc="Selalu pastikan pengeluaran tidak melampaui pemasukan Anda"
            />
            <Summary
              editor={editor}
              incomesValues={incomesValues}
              expensesValues={expensesValues}
            />
            <Separator className="my-3" />
            {(Boolean(incomesValues?.length) ||
              Boolean(expensesValues?.length)) && (
              <Title
                title="Detail"
                tooltipDesc="Selalu pastikan heading transaksi konsisten"
                desc="Secara lengkap transaksi anda terorganisir disini"
              />
            )}
          </div>
          <div className="mt-2">
            <Detail
              groupedTaskItems={groupedTaskItems}
              isHidden={Boolean(
                incomesValues?.length || expensesValues?.length,
              )}
              isPending={!editor}
            />
          </div>
        </ScrollArea>
      </div>
    </>
  )
}

function Summary({
  editor,
  incomesValues,
  expensesValues,
}: Pick<Props, 'editor' | 'incomesValues' | 'expensesValues'>) {
  const totalIncome = _.sum(incomesValues)
  const totalExpense = _.sum(expensesValues)
  const freeCash = totalIncome - totalExpense

  return (
    <div className="flex flex-col gap-5">
      <Income amount={totalIncome} isPending={!editor} />
      <Expense amount={totalExpense} isPending={!editor} />
      <FreeCash amount={freeCash} isPending={!editor} />
    </div>
  )
}

function Detail({
  groupedTaskItems,
  isHidden,
  isPending,
}: {
  groupedTaskItems: any
  isHidden: boolean
  isPending: boolean
}) {
  const [isOpen, setIsOpen] = React.useState(false)

  if (isPending)
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-5 w-[220px] rounded-sm" />
        <Skeleton className="h-5 w-[160px] rounded-sm" />
        <Skeleton className="h-4 w-[210px] rounded-sm" />
        <Skeleton className="h-8 w-[210px] rounded-sm" />
        <Skeleton className="h-4 w-full rounded-sm" />
      </div>
    )

  if (!isHidden) return <></>
  return (
    <div className="relative pb-24">
      <div
        data-state={isOpen ? 'open' : 'closed'}
        className="overflow-hidden data-[state=open]:h-fit data-[state=closed]:max-h-[140px]"
      >
        {groupedTaskItems.map(
          (item: {
            title: string
            incomeTotal: number
            expenseTotal: number
          }) => {
            if (
              Number(item.incomeTotal) === 0 &&
              Number(item.expenseTotal) === 0
            )
              return <div key={item.title}></div>
            return (
              <div className="mb-3 flex flex-col gap-1.5" key={item.title}>
                <h4 className="text-sm font-semibold">{item.title}</h4>
                <div>
                  {Number(item.incomeTotal) === 0 ? (
                    <></>
                  ) : (
                    <h5 className="text-muted-foreground flex items-center gap-2 text-xs">
                      <div className="h-2 w-2 rounded-full bg-green-300"></div>
                      {Number(item.incomeTotal)
                        ? rupiah(item.incomeTotal)
                        : 'Tunggu..'}
                    </h5>
                  )}
                  {Number(item.expenseTotal) === 0 ? (
                    <></>
                  ) : (
                    <h5 className="text-muted-foreground flex items-center gap-2 text-xs">
                      <div className="h-2 w-2 rounded-full bg-red-300"></div>
                      {Number(item.expenseTotal)
                        ? rupiah(item.expenseTotal)
                        : 'Tunggu..'}
                    </h5>
                  )}
                </div>
              </div>
            )
          },
        )}
      </div>
      {!isOpen && (
        <div className="text absolute bottom-0 left-0 -mt-2 h-full w-full bg-gradient-to-t from-white to-white/80 dark:from-zinc-900 dark:to-zinc-900/60"></div>
      )}
      <div className="flex w-full justify-center">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="sm"
          className="text-muted-foreground !h-6 w-full"
          variant="ghost"
        >
          {!isOpen ? 'Selengkapnya' : 'Tutup'}
        </Button>
      </div>
    </div>
  )
}

function Income({amount, isPending}: {amount: number; isPending: boolean}) {
  return (
    <div className="flex flex-col gap-1">
      <h5 className="text-muted-foreground flex items-center gap-2 text-xs">
        <div className="h-2 w-2 rounded-full bg-green-300"></div>
        Pemasukan
      </h5>
      {isPending ? (
        <Skeleton className="h-5 w-[120px] rounded-sm" />
      ) : (
        <p className="text-sm font-semibold tracking-tight">
          {!amount ? rupiah(0) : rupiah(amount)}
        </p>
      )}
    </div>
  )
}

function Expense({amount, isPending}: {amount: number; isPending: boolean}) {
  return (
    <div className="flex flex-col gap-1">
      <h5 className="text-muted-foreground flex items-center gap-2 text-xs">
        <div className="h-2 w-2 rounded-full bg-red-300"></div>
        Pengeluaran
      </h5>
      {isPending ? (
        <Skeleton className="h-5 w-[120px] rounded-sm" />
      ) : (
        <p className="text-sm font-semibold tracking-tight">
          {!amount ? rupiah(0) : rupiah(amount)}
        </p>
      )}
    </div>
  )
}

function FreeCash({amount, isPending}: {amount: number; isPending: boolean}) {
  return (
    <div className="flex flex-col gap-1">
      <h5 className="text-muted-foreground flex items-center gap-2 text-xs">
        <div className="h-2 w-2 rounded-full bg-gray-200"></div>
        Belum dialokasikan (Free Cash)
      </h5>
      {isPending ? (
        <Skeleton className="h-5 w-[120px] rounded-sm" />
      ) : (
        <p className="text-sm font-semibold tracking-tight">
          {!amount ? rupiah(0) : rupiah(amount)}
        </p>
      )}
    </div>
  )
}

export default Sum
