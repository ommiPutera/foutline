import { type DataFunctionArgs } from '@remix-run/node'
import { useLoaderData, useLocation } from '@remix-run/react'
import type { Editor as EditorType, JSONContent } from '@tiptap/core'
import _ from "lodash"
import React from 'react'
import { create } from 'zustand'
import { usePositionStore } from '~/components/editor/extensions/monthly.tsx'
import { GeneralErrorBoundary } from '~/components/error-boundry.tsx'
import { ErrorPage } from '~/components/errors.tsx'
import PageData from '~/components/page-data.tsx'
import { Header } from '~/components/page/header.tsx'
import { UpdatePocket } from '~/components/templates/dialogs.tsx'
import { Button } from '~/components/ui/button.tsx'
import { getNumberFromString } from '~/utils/get-number-from-string.ts'
import { getKindeSession } from '~/utils/session.server.ts'
import { Summary, SummaryMobile } from './summary.tsx'

const Editor = React.lazy(async () => await import('~/components/editor/index.tsx'))

type LoaderData = {
  postId?: string
}

type MonthlyState = {
  incomesValues: number[]
  setIncomesValues: (data: number[]) => void

  expensesValues: number[]
  setExpensesValues: (data: number[]) => void
}

export async function loader({ request, params }: DataFunctionArgs) {
  const { isAuthenticated } = await getKindeSession(request)
  if (!isAuthenticated) throw new Response('Not found', { status: 404 })

  const { id } = params
  const data: LoaderData = { postId: id }
  return data
}

export const useMonthlyStore = create<MonthlyState>((set) => ({
  incomesValues: [],
  setIncomesValues: (data) => set(() => ({ incomesValues: data })),

  expensesValues: [],
  setExpensesValues: (data) => set(() => ({ expensesValues: data })),
}))

function Index() {
  const { postId } = useLoaderData<LoaderData>()
  const { setIncomesValues, setExpensesValues } = useMonthlyStore()

  const [content, setContent] = React.useState<JSONContent | undefined>(undefined);
  const [isOpen, setIsOpen] = React.useState<boolean>(true);

  const getData = (data: EditorType) => {
    const json = data.getJSON()
    const taskLists = _.filter(json.content, { type: "taskList" })
    const position = usePositionStore.getState().postion
    const setPos = usePositionStore.getState().setPos

    if (position) {
      data.chain().command(({ tr }) => {
        const currentNode = tr.doc.nodeAt(position)
        console.log('woii disini: ', currentNode?.attrs.checked)
        if (currentNode?.attrs.checked) {
          setIsOpen(true)
        }
        setPos(0)
        return true
      }).run()
    }

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
    setContent(json.content)
    return null
  }

  return (
    <div className="flex max-h-[90vh]" stat-data={postId}>
      <div className='hidden md:block '>
        <Summary />
      </div>
      <div className="flex w-full flex-col gap-4 md:gap-3 md:px-4">
        <Header>
          <Button size="sm" onClick={() => console.log(content)}>Save</Button>
        </Header>
        <div className='mt-2'>
          <Editor
            type='MONTHLY'
            getData={getData}
            defaultContent={content}
          />
        </div>
      </div>
      <PageData>
        <SummaryMobile>
          <Summary />
        </SummaryMobile>
      </PageData>
      <UpdatePocket
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      ></UpdatePocket>
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
            subtitle={`"${location.pathname}" is not a page on cparibus.com. So sorry.`}
          />
        ),
      }}
    />
  )
}

export default Index
