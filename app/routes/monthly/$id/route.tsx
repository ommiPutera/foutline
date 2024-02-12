import {redirect, type DataFunctionArgs, json} from '@remix-run/node'
import {useLoaderData, useLocation} from '@remix-run/react'
import type {Editor as EditorType, JSONContent} from '@tiptap/core'

import _ from 'lodash'
import React from 'react'
import {create} from 'zustand'

import {usePositionStore} from '~/components/editor/extensions/monthly.tsx'
import {GeneralErrorBoundary} from '~/components/error-boundry.tsx'
import {ErrorPage} from '~/components/errors.tsx'
import PageData from '~/components/page-data.tsx'
import {Header} from '~/components/page/header.tsx'
import {UpdatePocket} from '~/components/templates/dialogs.tsx'
import {Button} from '~/components/ui/button.tsx'

import {getNumberFromString} from '~/utils/get-number-from-string.ts'
import {getKindeSession, getUser} from '~/utils/session.server.ts'
import {Summary, SummaryMobile} from './summary.tsx'
import type {Post} from '@prisma/client'
import Editor from '~/components/editor/index.tsx'
import {Save} from 'lucide-react'

type LoaderData = {
  post?: Post
  postId?: string
}

type MonthlyState = {
  valueToFire: number
  setValueToFire: (value: number) => void
}

export type PocketsValues = {
  name: string
  nominal: number
  dataIncomes: (JSONContent | undefined)[]
  dataExpenses: (JSONContent | undefined)[]
}

export async function loader({request, params}: DataFunctionArgs) {
  const {isAuthenticated} = await getKindeSession(request)
  if (!isAuthenticated) throw new Response('Not found', {status: 404})

  const {id} = params
  const user = await getUser(request)
  const post: Post = await user.posts.filter(
    (item: {id: string}) => item.id === id,
  )[0]

  if (!id || !post) return redirect('/')
  const data: LoaderData = {post: post, postId: id}
  return json(data)
}

export const useMonthlyStore = create<MonthlyState>(set => ({
  valueToFire: 0,
  setValueToFire: value => set(() => ({valueToFire: value})),
}))

function Index() {
  const {postId, post} = useLoaderData<LoaderData>()

  const dataset = [
    {
      name: 'MANDIRI',
      nominal: 0,
      dataIncomes: [undefined],
      dataExpenses: [undefined],
    },
    {
      name: 'BCA',
      nominal: 0,
      dataIncomes: [undefined],
      dataExpenses: [undefined],
    },
  ]

  const {valueToFire, setValueToFire} = useMonthlyStore()

  const [content, setContent] = React.useState<any>(post?.content)
  const [data, setData] = React.useState<EditorType | undefined>(undefined)

  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [currentPosition, setCurrentPosition] = React.useState<number>(0)

  const [incomesValues, setIncomesValues] = React.useState<number[]>([])
  const [expensesValues, setExpensesValues] = React.useState<number[]>([])

  const [pocketsValues, setPocketsValues] =
    React.useState<PocketsValues[]>(dataset)

  const getPocket = (value: string) => {
    if (data) {
      data
        .chain()
        .command(({tr}) => {
          const currentNode = tr.doc.nodeAt(currentPosition)
          tr.setNodeMarkup(currentPosition, undefined, {
            ...currentNode?.attrs,
            pocket: value,
          })
          console.log({
            ...currentNode?.attrs,
            pocket: value,
          })
          return true
        })
        .run()
    }
  }

  const getData = (data: EditorType) => {
    setData(data)
    const json = data.getJSON()
    const taskLists = _.filter(json.content, {type: 'taskList'})

    const position = usePositionStore.getState().postion
    const setPos = usePositionStore.getState().setPos
    setCurrentPosition(position)

    if (position) {
      data
        .chain()
        .command(({tr}) => {
          const currentNode = tr.doc.nodeAt(position)
          // @ts-ignore
          const value = getValues(currentNode?.content?.content[0]?.content)
          if (currentNode?.attrs.checked) {
            setIsOpen(true)
            setValueToFire(value)
          }
          if (
            currentNode?.attrs?.pocket !== 'none' &&
            !currentNode?.attrs?.checked
          ) {
            tr.setNodeMarkup(currentPosition, undefined, {
              ...currentNode?.attrs,
              pocket: 'none',
            })
          }
          setPos(0)
          return true
        })
        .run()
    }

    let taskItems = []
    for (var taskList of taskLists) {
      if (!taskList.content) break
      if (taskList.content?.length === 1) taskItems.push(taskList.content[0])
      if (taskList.content?.length > 1)
        for (var item of taskList.content) {
          taskItems.push(item)
        }
    }

    const incomes = _.filter(taskItems, {
      attrs: {for: 'monthly-income', checked: true},
    })
    const expenses = _.filter(taskItems, {
      attrs: {for: 'monthly-expense', checked: true},
    })

    let incomesValues: number[] = []
    for (var income of incomes) {
      if (!income?.content) break
      const values = getValues(income.content[0])
      incomesValues.push(values)
    }

    let expensesValues: number[] = []
    for (var expense of expenses) {
      if (!expense?.content) break
      const values = getValues(expense.content[0])
      expensesValues.push(values)
    }

    setIncomesValues(incomesValues)
    setExpensesValues(expensesValues)
    setContent(json.content)
    getPocketData(data)
    return null
  }

  const getPocketData = (data: EditorType) => {
    const json = data.getJSON()
    const taskLists = _.filter(json.content, {type: 'taskList'})

    let taskItems = []
    for (var taskList of taskLists) {
      if (!taskList.content) break
      if (taskList.content?.length === 1) taskItems.push(taskList.content[0])
      if (taskList.content?.length > 1)
        for (var item of taskList.content) {
          taskItems.push(item)
        }
    }

    const pockets = []

    for (var pocket of dataset) {
      if (!taskItems) break
      const itemIncomes = _.filter(taskItems, {
        attrs: {pocket: pocket.name, for: 'monthly-income', checked: true},
      })
      const itemExpenses = _.filter(taskItems, {
        attrs: {pocket: pocket.name, for: 'monthly-expense', checked: true},
      })
      pockets.push({
        name: pocket.name,
        nominal: pocket.nominal,
        dataIncomes: itemIncomes,
        dataExpenses: itemExpenses,
      })
    }
    setPocketsValues(pockets)
    return null
  }

  return (
    <div className="flex max-h-[90vh]" stat-data={postId}>
      <div className="hidden md:block ">
        <Summary
          incomesValues={incomesValues}
          expensesValues={expensesValues}
          pocketsValues={pocketsValues}
        />
      </div>
      <div className="flex w-full flex-col gap-4 md:gap-3 md:px-4">
        <Header>
          <Button size="sm" className="w-full">
            <div className="flex items-center gap-2">
              <Save size={16} />
              Save
            </div>
          </Button>
        </Header>
        <div className="mt-2">
          <Editor
            type="MONTHLY"
            getData={getData}
            defaultContent={content}
            // @ts-ignore
            post={post}
          />
        </div>
      </div>
      <PageData>
        <SummaryMobile>
          <Summary
            incomesValues={incomesValues}
            expensesValues={expensesValues}
            pocketsValues={pocketsValues}
          />
        </SummaryMobile>
      </PageData>
      <UpdatePocket
        value={valueToFire}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onChange={getPocket}
        dataset={dataset}
      ></UpdatePocket>
    </div>
  )
}

export const getValues = (content: JSONContent | undefined): number => {
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
            subtitle={`"${location.pathname}" is not a page on outline.com. So sorry.`}
          />
        ),
      }}
    />
  )
}

export default Index
