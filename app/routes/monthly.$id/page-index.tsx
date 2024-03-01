import React from 'react'

import {useLoaderData} from '@remix-run/react'

import type {Editor as EditorType} from '@tiptap/core'

import Content from './content.tsx'
import Header from './header.tsx'
import RightSheet from './right-sheet.tsx'
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

  return (
    <div className="flex w-full gap-2 py-6">
      <Content editor={editor} setEditor={setEditor} />
      <RightSheet editor={editor} setEditor={setEditor} />
    </div>
  )
}

export {PageIndex}
