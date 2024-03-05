import React from 'react'

import {useLoaderData} from '@remix-run/react'

import type {Editor as EditorType, JSONContent} from '@tiptap/core'

import {getNumberFromString} from '~/utils/get-number-from-string.ts'

import Content from './content.tsx'
import Header from './header.tsx'

import type {LoaderData} from './route.tsx'

function PageIndex() {
  const {postId} = useLoaderData<LoaderData>()

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

  const getEditor = (tiptapEditor: EditorType) => {
    setEditor(tiptapEditor)
  }

  return (
    <div className="flex w-full gap-2 py-6">
      <Content editor={editor} setEditor={setEditor} getEditor={getEditor} />
    </div>
  )
}

export const getValues = (content: JSONContent | undefined): number => {
  if (!content?.content?.[0]?.text) return 0
  return getNumberFromString(content.content[0].text)
}

export {PageIndex}
