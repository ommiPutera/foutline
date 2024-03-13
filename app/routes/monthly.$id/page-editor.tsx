import React from 'react'

import type { Content, Editor as EditorType } from '@tiptap/core'

import { useFetcher, useLoaderData } from '@remix-run/react'

import Editor from '~/components/editor/index.tsx'

import { type Post } from '@prisma/client'
import { FormType, type LoaderData, type TFocus } from './route.tsx'

type Props = Pick<Post, 'title' | 'content' | 'preview'> & {
  setContent: React.Dispatch<React.SetStateAction<any>>
  setPreview: React.Dispatch<React.SetStateAction<any>>
  setTitle: React.Dispatch<React.SetStateAction<string>>
  getEditor: (editor: EditorType) => void
} & TFocus

function PageEditor({
  isFocus,
  setIsFocus,

  content,
  setContent,

  preview,
  setPreview,

  title,
  setTitle,

  getEditor,
}: Props) {
  const { post } = useLoaderData<LoaderData>()

  const fetcher = useFetcher()

  const handleCancel = (editor: EditorType) => {
    editor.chain().blur().run()
    editor.commands.setContent(post?.content as Content)
    setTimeout(() => {
      setIsFocus(false)
    }, 100)
  }

  const handleSave = (editor: EditorType) => {
    fetcher.submit(
      {
        _action: FormType.UPDATE_CONTENT,
        id: post?.id as string,
        title: title,
        preview: preview,
        postJSON: JSON.stringify(content),
      },
      { method: 'POST' },
    )
    editor.chain().blur().run()
    setTimeout(() => {
      setIsFocus(false)
    }, 100)
  }

  React.useEffect(() => {
    setTitle(post?.title ?? '')
  }, [post?.title, setTitle])

  React.useEffect(() => {
    setContent(post?.content)
  }, [post?.content, setContent])

  return (
    <Editor
      type="MONTHLY"
      title={title}
      setTitle={setTitle}
      setContent={setContent}
      setPreview={setPreview}
      getEditor={getEditor}
      cbFocus={() => setIsFocus(true)}
      cbOnCancel={handleCancel}
      cbOnSave={handleSave}
      defaultContent={content as any}
      post={post as any as Post}
    />
  )
}

export default PageEditor
