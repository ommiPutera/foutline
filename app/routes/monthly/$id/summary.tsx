import _ from "lodash"
import { Info } from "lucide-react"
import { PocketItem as PocketToggle } from "~/components/templates/pocket.tsx"
import { Button } from "~/components/ui/button.tsx"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "~/components/ui/sheet.tsx"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip.tsx"
import { rupiah } from "~/utils/currency.ts"
import { getValues, type PocketsValues } from "./route.tsx"

function SummaryMobile({ children }: { children: React.ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="transparent" size="default">
          Data halaman
        </Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="h-3/4"
      >
        <SheetHeader className="mb-8">
          <SheetTitle>Data halaman</SheetTitle>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  )
}

function Summary({
  incomesValues,
  expensesValues,
  pocketsValues
}: {
  incomesValues: number[],
  expensesValues: number[],
  pocketsValues: PocketsValues[]
}) {
  const totalIncome = _.sum(incomesValues)
  const totalExpense = _.sum(expensesValues)
  const freeCash = totalIncome - totalExpense

  return (
    <div className="mt-[1px] h-full md:border-r md:pr-4 lg:min-w-[210px] lg:max-w-[210px]">
      <div className="flex flex-col gap-12">
        <div className='flex flex-col gap-6'>
          <div>
            <div className='flex items-center text-xs font-semibold'>
              Data halaman anda
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="transparent" size="icon">
                    <Info className='h-4 w-4 fill-blue-500 text-white' />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Buat halaman baru</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className='text-[11px] text-muted-foreground'>
              Selalu pastikan pengeluaran anda tidak melebihi pemasukan anda
            </div>
          </div>
          <div className='flex flex-col gap-5'>
            <div className='flex flex-col gap-1'>
              <h5 className='text-xs text-muted-foreground'>Pemasukan</h5>
              <p className='text-xs font-medium'>{!totalIncome ? rupiah(0) : rupiah(totalIncome)}</p>
            </div>
            <div className='flex flex-col gap-1'>
              <h5 className='text-xs text-muted-foreground'>Pengeluaran</h5>
              <p className='text-xs font-medium'>{!totalExpense ? rupiah(0) : rupiah(totalExpense)}</p>
            </div>
            <div className='flex flex-col gap-1'>
              <h5 className='text-xs text-muted-foreground'>Belum dialokasikan</h5>
              <p className='text-xs font-medium'>{!freeCash ? rupiah(0) : rupiah(freeCash)}</p>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-3'>
          <div className='flex items-center text-xs font-semibold'>
            Kantong
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="transparent" size="icon">
                  <Info className='h-4 w-4 fill-blue-500 text-white' />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Buat halaman baru</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Pockets pocketsValues={pocketsValues} />
        </div>
      </div>
    </div>
  )
}

function Pockets({ pocketsValues }: { pocketsValues: PocketsValues[] }) {
  return (
    <div className="flex flex-col gap-3">
      {pocketsValues.map((pocket) => <PocketItem key={pocket.name} {...pocket} />)}
    </div>
  )
}

function PocketItem({ nominal, name, dataIncomes, dataExpenses }: PocketsValues) {
  const incomes = dataIncomes;
  const expenses = dataExpenses;

  let incomesValues: number[] = []
  for (var income of incomes) {
    if (!income?.content) break;
    const values = getValues(income.content[0])
    incomesValues.push(values)
  }

  let expensesValues: number[] = []
  for (var expense of expenses) {
    if (!expense?.content) break;
    const values = getValues(expense.content[0])
    expensesValues.push(values)
  }

  const totalIncome = _.sum(incomesValues)
  const totalExpense = _.sum(expensesValues)
  const total = totalIncome - totalExpense

  return (
    <div className="rounded-md border p-3">
      <PocketToggle
        name={name}
        nominal={total + nominal}
      />
    </div>
  )
}

export { Summary, SummaryMobile }
