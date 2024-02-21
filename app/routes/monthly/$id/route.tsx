import {
  json,
  redirect,
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
} from '@remix-run/node'
import {useFetcher, useLoaderData, useLocation} from '@remix-run/react'
import type {Editor as EditorType, JSONContent} from '@tiptap/core'

import _ from 'lodash'
import React from 'react'
import {create} from 'zustand'

import {usePositionStore} from '~/components/editor/extensions/monthly.tsx'
import Editor from '~/components/editor/index.tsx'
import {GeneralErrorBoundary} from '~/components/error-boundry.tsx'
import {ErrorPage} from '~/components/errors.tsx'
import PageData from '~/components/page-data.tsx'
import {UpdatePocket} from '~/components/templates/dialogs.tsx'
import {Button} from '~/components/ui/button.tsx'

import type {Post} from '@prisma/client'

import {getNumberFromString} from '~/utils/get-number-from-string.ts'
import {getKindeSession, getUser} from '~/utils/session.server.ts'

import {Summary, SummaryMobile} from './summary.tsx'
import {cn} from '~/lib/utils.ts'
import {updateContent, updateTitle} from '~/utils/posts.server.ts'

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

export enum FormType {
  UPDATE_CONTENT = 'UPDATE_CONTENT',
}

export async function action({request}: ActionFunctionArgs) {
  const formData = await request.formData()
  const formPayload = Object.fromEntries(formData)

  switch (formPayload._action) {
    case FormType.UPDATE_CONTENT: {
      if (
        typeof formPayload.title !== 'string' ||
        typeof formPayload.postId !== 'string' ||
        typeof formPayload.postJSON !== 'string'
      ) {
        return {formError: `Form not submitted correctly.`}
      }
      await updateTitle({
        id: formPayload.postId,
        title: formPayload.title,
      })
      return await updateContent({
        id: formPayload.postId,
        content: JSON.parse(formPayload.postJSON),
      })
    }
  }
}

export async function loader({request, params}: LoaderFunctionArgs) {
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

function Index() {
  const {postId, post} = useLoaderData<LoaderData>()

  const fetcher = useFetcher()

  const formRef = React.useRef(null)

  const {valueToFire, setValueToFire} = useMonthlyStore()

  const [pageTitle, setPageTitle] = React.useState<string>(post?.title ?? '')
  const [isFocus, setIsFocus] = React.useState<boolean>(false)
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
          // console.log({
          //   ...currentNode?.attrs,
          //   pocket: value,
          // })
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
    <div className="flex h-full lg:mb-0" stat-data={postId}>
      <div className="hidden md:fixed md:top-9 md:block">
        <Summary
          incomesValues={incomesValues}
          expensesValues={expensesValues}
          pocketsValues={pocketsValues}
        />
      </div>
      <div className="mb-44 flex w-full justify-center">
        <div
          className={cn(
            'border-border flex h-fit w-full max-w-lg flex-col gap-4 rounded-xl border bg-white dark:bg-zinc-950 md:gap-3',
            isFocus && 'shadow-border border-muted-foreground/30 shadow-3xl',
          )}
        >
          <div>
            <Editor
              type="MONTHLY"
              getData={getData}
              defaultContent={content}
              setPageTitle={setPageTitle}
              cbFocus={() => {
                setIsFocus(true)
              }}
              cbOnCancel={editor => {
                editor.chain().blur().run()
                // @ts-ignore
                editor.commands.setContent(post?.content)
                setTimeout(() => {
                  setIsFocus(false)
                }, 100)
              }}
              cbOnSave={editor => {
                fetcher.submit(formRef.current)
                editor.chain().blur().run()
                setTimeout(() => {
                  setIsFocus(false)
                }, 100)
              }}
              // @ts-ignore
              post={post}
            />
          </div>
          <div className="sticky bottom-0 flex flex-col gap-2 rounded-b-xl bg-white dark:bg-zinc-950">
            <div
              className={cn(
                'bg-muted-foreground/30 h-[1px] w-full',
                !isFocus && 'hidden',
              )}
            ></div>
            <div className={cn('w-full px-4 pb-3', !isFocus && 'hidden')}>
              <fetcher.Form
                ref={formRef}
                method="POST"
                className="flex w-full items-center justify-between"
              >
                <Button
                  onClick={event => {
                    event.stopPropagation()
                    if (data) {
                      // @ts-ignore
                      data?.commands.setContent(post?.content)
                    }
                    setIsFocus(false)
                  }}
                  size="sm"
                  variant="ghost"
                  className="w-fit"
                  type="button"
                >
                  <div className="flex items-center gap-2">
                    <p className="text-muted-foreground text-xs">Batalkan</p>
                    <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100">
                      <span className="text-xs">Esc</span>
                    </kbd>
                  </div>
                </Button>
                <Button
                  size="sm"
                  className="w-fit"
                  variant="ghost"
                  type="submit"
                  onClick={event => {
                    event.stopPropagation()
                    setIsFocus(false)
                  }}
                >
                  <div className="flex items-center gap-2">
                    <p className="text-muted-foreground text-xs">Selesai</p>
                    <div className="flex gap-1">
                      <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100">
                        <span className="text-base">⌘</span>
                      </kbd>
                      <p className="text-muted-foreground text-xs">+</p>
                      <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100">
                        <span className="text-xs">S</span>
                      </kbd>
                    </div>
                  </div>
                </Button>
                <input
                  type="hidden"
                  name="_action"
                  value={FormType.UPDATE_CONTENT}
                />
                <input
                  defaultValue={JSON.stringify(content)}
                  type="hidden"
                  name="postJSON"
                />
                <input type="hidden" name="postId" value={postId} />
                <input type="hidden" name="title" value={pageTitle} />
              </fetcher.Form>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:fixed md:right-0 md:top-9 md:mr-3 md:block">
        <PageData>
          <SummaryMobile>
            <Summary
              incomesValues={incomesValues}
              expensesValues={expensesValues}
              pocketsValues={pocketsValues}
            />
          </SummaryMobile>
        </PageData>
      </div>
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
