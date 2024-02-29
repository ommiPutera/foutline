import React from 'react'

import type {Content, Editor as EditorType} from '@tiptap/core'

import {useFetcher, useLoaderData} from '@remix-run/react'

import Editor from '~/components/editor/index.tsx'

import {FormType, type LoaderData, type TFocus} from './route.tsx'
import {type Post} from '@prisma/client'

function PageEditor({
  isFocus,
  setIsFocus,

  content,
  setContent,

  title,
  setTitle,

  getEditor,
}: TFocus &
  Pick<Post, 'title' | 'content'> & {
    setContent: React.Dispatch<React.SetStateAction<any>>
    setTitle: React.Dispatch<React.SetStateAction<string>>

    getEditor: (editor: EditorType) => void
  }) {
  const {post} = useLoaderData<LoaderData>()

  const fetcher = useFetcher()

  React.useEffect(() => {
    setTitle(post?.title ?? '')
  }, [post?.title, setTitle])

  React.useEffect(() => {
    setContent(post?.content)
  }, [post?.content, setContent])

  return (
    <div>
      <Editor
        type="MONTHLY"
        title={title}
        setTitle={setTitle}
        setContent={setContent}
        getEditor={getEditor}
        defaultContent={content as any}
        cbFocus={() => {
          setIsFocus(true)
        }}
        cbOnCancel={editor => {
          editor.chain().blur().run()
          editor.commands.setContent(post?.content as Content)
          setTimeout(() => {
            setIsFocus(false)
          }, 100)
        }}
        cbOnSave={editor => {
          fetcher.submit(
            {
              _action: FormType.UPDATE_CONTENT,
              id: post?.id as string,
              title: title,
              postJSON: JSON.stringify(content),
            },
            {method: 'POST'},
          )
          editor.chain().blur().run()
          setTimeout(() => {
            setIsFocus(false)
          }, 100)
        }}
        post={post as any as Post}
      />
    </div>
  )
}

export default PageEditor
