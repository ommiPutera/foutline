import React from 'react'

import _ from 'lodash'

import {type Props as EditorProps} from './content.tsx'

import {rupiah} from '~/utils/currency.ts'

import {ButtonHide, Title} from './right-sheet.tsx'

type Props = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  incomesValues: number[]
  expensesValues: number[]
} & Pick<EditorProps, 'editor'>

function Sum({
  isOpen,
  setIsOpen,
  editor,
  incomesValues,
  expensesValues,
}: Props) {
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
          <Summary
            editor={editor}
            incomesValues={incomesValues}
            expensesValues={expensesValues}
          />
        </div>
      </div>
    </>
  )
}

function Summary({
  incomesValues,
  expensesValues,
}: Pick<Props, 'editor' | 'incomesValues' | 'expensesValues'>) {
  const totalIncome = _.sum(incomesValues)
  const totalExpense = _.sum(expensesValues)
  const freeCash = totalIncome - totalExpense

  return (
    <div className="flex flex-col gap-5">
      <Income amount={totalIncome} />
      <Expense amount={totalExpense} />
      <FreeCash amount={freeCash} />
    </div>
  )
}

function Income({amount}: {amount: number}) {
  return (
    <div className="flex flex-col gap-1">
      <h5 className="text-muted-foreground flex items-center gap-2 text-xs">
        <div className="h-2 w-2 rounded-full bg-green-300"></div>
        Pemasukan
      </h5>
      <p className="text-sm font-semibold tracking-tight">
        {!amount ? rupiah(0) : rupiah(amount)}
      </p>
    </div>
  )
}

function Expense({amount}: {amount: number}) {
  return (
    <div className="flex flex-col gap-1">
      <h5 className="text-muted-foreground flex items-center gap-2 text-xs">
        <div className="h-2 w-2 rounded-full bg-red-300"></div>
        Pengeluaran
      </h5>
      <p className="text-sm font-semibold tracking-tight">
        {!amount ? rupiah(0) : rupiah(amount)}
      </p>
    </div>
  )
}

function FreeCash({amount}: {amount: number}) {
  return (
    <div className="flex flex-col gap-1">
      <h5 className="text-muted-foreground flex items-center gap-2 text-xs">
        <div className="h-2 w-2 rounded-full bg-gray-200"></div>
        Belum dialokasikan (Free Cash)
      </h5>
      <p className="text-sm font-semibold tracking-tight">
        {!amount ? rupiah(0) : rupiah(amount)}
      </p>
    </div>
  )
}

export default Sum
