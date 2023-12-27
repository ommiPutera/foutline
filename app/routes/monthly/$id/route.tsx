import { type DataFunctionArgs } from '@remix-run/node'
import { useLoaderData, useLocation } from '@remix-run/react'
import type { Editor as EditorType, JSONContent } from '@tiptap/core'
import _ from "lodash"
import { Info } from 'lucide-react'
import React from 'react'
import { GeneralErrorBoundary } from '~/components/error-boundry.tsx'
import { ErrorPage } from '~/components/errors.tsx'
import PageData from '~/components/page-data.tsx'
import { Header } from '~/components/page/header.tsx'
import { Button, ButtonLink } from '~/components/ui/button.tsx'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '~/components/ui/sheet.tsx'
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip.tsx'
import { rupiah } from '~/utils/currency.ts'
import { getNumberFromString } from '~/utils/get-number-from-string.ts'
import { getKindeSession } from '~/utils/session.server.ts'

const Editor = React.lazy(async () => await import('~/components/editor/index.tsx'))

type LoaderData = {
  postId?: string
}

export async function loader({ request, params }: DataFunctionArgs) {
  const { isAuthenticated } = await getKindeSession(request)
  if (!isAuthenticated) throw new Response('Not found', { status: 404 })

  const { id } = params
  const data: LoaderData = { postId: id }
  return data
}

function Index() {
  const { postId } = useLoaderData<LoaderData>()
  const [incomesValues, setIncomesValues] = React.useState<number[]>([])
  const [expensesValues, setExpensesValues] = React.useState<number[]>([])

  const getData = (data: EditorType) => {
    const json = data.getJSON()
    const taskLists = _.filter(json.content, { type: "taskList" })

    let taskItems = []
    for (var taskList of taskLists) {
      if (!taskList.content) break;
      if (taskList.content?.length === 1) taskItems.push(taskList.content[0])
      if (taskList.content?.length > 1) for (var item of taskList.content) { taskItems.push(item) }
    }

    const incomes = _.filter(taskItems, { attrs: { for: 'monthly-income', checked: true } })
    const expenses = _.filter(taskItems, { attrs: { for: 'monthly-expense', checked: true } })

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
    setIncomesValues(incomesValues)
    setExpensesValues(expensesValues)
    return null
  }

  return (
    <div className="flex max-h-[90vh]" stat-data={postId}>
      <div className='hidden md:block '>
        <Summary
          incomesValues={incomesValues}
          expensesValues={expensesValues}
        />
      </div>
      <div className="flex w-full flex-col gap-4 md:gap-3 md:px-4">
        <Header>
          <Button size="sm">Save</Button>
        </Header>
        <div className='mt-12'>
          <Editor type='MONTHLY' getData={getData} />
        </div>
      </div>
      <PageData>
        <SummaryMobile>
          <Summary
            incomesValues={incomesValues}
            expensesValues={expensesValues}
          />
        </SummaryMobile>
      </PageData>
    </div>
  )
}

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
  expensesValues
}: {
  incomesValues: number[],
  expensesValues: number[]
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
              <p className='text-xs font-medium'>{rupiah(totalIncome)}</p>
            </div>
            <div className='flex flex-col gap-1'>
              <h5 className='text-xs text-muted-foreground'>Pengeluaran</h5>
              <p className='text-xs font-medium'>{rupiah(totalExpense)}</p>
            </div>
            <div className='flex flex-col gap-1'>
              <h5 className='text-xs text-muted-foreground'>Belum dialokasikan</h5>
              <p className='text-xs font-medium'>{rupiah(freeCash)}</p>
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
          <div className='flex flex-col gap-2'>
            <ButtonLink
              asChild
              variant="transparent"
              to='/'
              className='overflow-hidden border border-input bg-muted px-3.5 py-7'
            >
              <div className='flex w-full items-center gap-4'>
                <div className='flex w-full flex-col gap-1'>
                  <h5 className='text-[11px] text-muted-foreground'>Bank Mandiri</h5>
                  <p className='text-xs font-medium'>Rp. 3,690,000</p>
                </div>
                <img src="/logos/bank_mandiri.png" alt="" width="34px" height="auto" />
              </div>
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  )
}

const getValues = (content: JSONContent | undefined): number => {
  if (!content?.content?.[0]?.text) return 0
  return getNumberFromString(content.content[0].text)
}

export function ErrorBoundary() {
  const location = useLocation()
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        404: () => (
          <ErrorPage
            title="404 - Oh no, you found a page that's missing stuff."
            subtitle={`"${location.pathname}" is not a page on omition.com. So sorry.`}
          />
        ),
      }}
    />
  )
}

export default Index
