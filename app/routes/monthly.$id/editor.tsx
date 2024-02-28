import React from 'react'

import type {Content, Editor as EditorType} from '@tiptap/core'

import {useFetcher, useLoaderData} from '@remix-run/react'

import Editor from '~/components/editor/index.tsx'

import {FormType, type LoaderData, type TFocus} from './route.tsx'
import {type Post} from '@prisma/client'

function PageEditor({isFocus, setIsFocus}: TFocus) {
  const {post} = useLoaderData<LoaderData>()

  const [content, setContent] = React.useState<any>(post?.content)
  // const [data, setData] = React.useState<EditorType | undefined>(undefined)
  const [title, setTitle] = React.useState<any>(post?.content)

  const fetcher = useFetcher()

  React.useEffect(() => {
    setTitle(post?.title)
  }, [post?.title])

  React.useEffect(() => {
    setContent(post?.content)
  }, [post?.content])

  return (
    <div>
      <Editor
        type="MONTHLY"
        title={title}
        setTitle={setTitle}
        setContent={setContent}
        getData={() => null}
        defaultContent={content}
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
          console.log('content: ', content)

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
