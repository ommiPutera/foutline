import React from 'react'

import { useLoaderData } from '@remix-run/react'

import _ from 'lodash'

import type { Editor as EditorType, JSONContent } from '@tiptap/core'

import { usePositionStore } from '~/components/editor/extensions/monthly.tsx'

import { getNumberFromString } from '~/utils/get-number-from-string.ts'

import Content from './content.tsx'
import Header from './header.tsx'
import RightSheet from './right-sheet.tsx'

import type { LoaderData } from './route.tsx'

function PageIndex() {
  const { postId } = useLoaderData<LoaderData>()

  return (
    <main
      className="relative flex h-full w-full flex-col gap-6"
      state-data={postId}
    >
      <Header />
      <Wrapper />
    </main>
  )
}

function Wrapper() {
  const [editor, setEditor] = React.useState<EditorType | undefined>(undefined)

  const [incomesValues, setIncomesValues] = React.useState<number[]>([])
  const [expensesValues, setExpensesValues] = React.useState<number[]>([])

  const [currentPosition, setCurrentPosition] = React.useState<number>(0)

  const getEditor = (tiptapEditor: EditorType) => {
    setEditor(tiptapEditor)

    const json = tiptapEditor.getJSON()
    if (!json.content) return null

    const taskLists = _.filter(json.content, { type: 'taskList' })

    const position = usePositionStore.getState().postion
    const setPos = usePositionStore.getState().setPos
    setCurrentPosition(position)

    if (position) {
      tiptapEditor
        .chain()
        .command(({ tr }) => {
          const currentNode = tr.doc.nodeAt(position)
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
      attrs: { for: 'monthly-income', checked: true },
    })
    const expenses = _.filter(taskItems, {
      attrs: { for: 'monthly-expense', checked: true },
    })

    let incomesValues: number[] = []
    let expensesValues: number[] = []

    for (var income of incomes) {
      if (!income?.content) break
      const values = getValues(income.content[0])
      incomesValues.push(values)
    }
    for (var expense of expenses) {
      if (!expense?.content) break
      const values = getValues(expense.content[0])
      expensesValues.push(values)
    }

    let grouped = new Map<string, any>()
    let id: string = ''
    for (var item of json.content) {
      if (item.type === 'heading' && item?.content?.[0]) {
        id = item?.content[0].text ?? ''
        grouped.set(id, { title: item?.content[0].text, content: [] })
      }
      if (item.type === 'taskList' && item.content) {
        let prev = grouped.get(id)
        // console.log("prev: ", prev)
        grouped.set(id, { title: id, content: [...prev?.content, ...item?.content] })
        // grouped.
        // console.log(grouped)
        console.log('id: ', id)
        console.log('item: ', item)
      }
    }

    console.log('json: ', json.content)
    console.log('grouped: ', [...grouped.values()])

    setIncomesValues(incomesValues)
    setExpensesValues(expensesValues)
    return null
  }

  return (
    <div className="flex w-full gap-2 py-6">
      <Content editor={editor} setEditor={setEditor} getEditor={getEditor} />
      <RightSheet
        editor={editor}
        expensesValues={expensesValues}
        incomesValues={incomesValues}
      />
    </div>
  )
}

export const getValues = (content: JSONContent | undefined): number => {
  if (!content?.content?.[0]?.text) return 0
  return getNumberFromString(content.content[0].text)
}

export { PageIndex }
