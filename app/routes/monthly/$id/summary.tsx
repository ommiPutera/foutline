import _ from "lodash"
import { Info } from "lucide-react"
import { PocketItem } from "~/components/templates/pocket.tsx"
import { Button } from "~/components/ui/button.tsx"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "~/components/ui/sheet.tsx"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip.tsx"
import { rupiah } from "~/utils/currency.ts"

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

function Summary({ incomesValues, expensesValues }: { incomesValues: number[], expensesValues: number[] }) {
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
          <div>
            <div className="rounded-md border p-3">
              <PocketItem />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Summary, SummaryMobile }
