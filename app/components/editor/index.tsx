import { EditorContent, useEditor } from '@tiptap/react'
import React from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { BasicExtensions } from './extensions/index.tsx'
import Placeholder from '@tiptap/extension-placeholder'
import { TiptapEditorProps } from './props.ts'
import { EditorBubbleMenu } from './bubble-menu/index.tsx'
import { MonthlyExtensions } from './extensions/monthly.tsx'
import type { Editor as EditorType } from '@tiptap/core'
import type { Post } from '@prisma/client'
import { useLocation } from '@remix-run/react'

import { Skeleton } from '~/components/ui/skeleton.tsx'

function Editor({
  type,
  title,
  setTitle,
  setContent,
  setPreview,
  setCharacterLength,

  getEditor,
  defaultContent,
  post,
  cbFocus = () => null,
  cbOnSave = () => null,
  cbOnCancel = () => null,
}: {
  type?: 'MONTHLY' | 'BASIC'
  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
  setContent: React.Dispatch<React.SetStateAction<any>>
  setPreview: React.Dispatch<React.SetStateAction<any>>
  setCharacterLength: React.Dispatch<React.SetStateAction<number>>

  getEditor: (editor: EditorType) => void
  defaultContent: Pick<Post, 'content'>
  post?: Post
  cbFocus: () => void
  cbOnSave: (editor: EditorType) => void
  cbOnCancel: (editor: EditorType) => void
}) {
  const location = useLocation()

  const titletRef = React.useRef<HTMLTextAreaElement>(null)
  const topFileRef = React.useRef(null)

  const [hydrated, setHydrated] = React.useState(false)

  const getExtensions = () => {
    switch (type) {
      case 'MONTHLY':
        return MonthlyExtensions
      default:
        return BasicExtensions
    }
  }

  const CustomPlaceholder = Placeholder.configure({
    placeholder: "Tekan / untuk perintah..",
  })

  const editor = useEditor({
    extensions: [CustomPlaceholder, ...getExtensions()],
    editorProps: TiptapEditorProps,
    onUpdate({ editor }) {
      if (editor) {
        const json = editor.getJSON()
        const text = editor.getText()

        setContent(json.content)
        setCharacterLength(editor?.getText().length)
        setPreview(text)
        getEditor(editor)
      }
    },
  })

  React.useEffect(() => {
    if (editor && defaultContent && !hydrated) {
      // getEditor(editor)
      editor.commands.setContent(defaultContent as any)
      setCharacterLength(editor.getText().length)
      setHydrated(true)
    }
  }, [editor, defaultContent, hydrated, setCharacterLength])

  React.useEffect(() => {
    if (location.pathname && editor) {
      // 1. setContent and then 2 getEditor
      editor.commands.setContent(post?.content as any)
      getEditor(editor)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, location.pathname, post?.content])

  React.useEffect(() => {
    if (editor?.isFocused) {
      cbFocus()
    }
  }, [cbFocus, editor?.isFocused])

  return (
    <div className="relative">
      {editor ? (
        <div>
          <div className="w-full px-5 py-3">
            <TextareaAutosize
              ref={titletRef}
              value={title}
              onChange={e => {
                setTitle(e.target.value)
              }}
              onKeyDown={e => {
                if (editor) {
                  if (e.key === 'Escape') {
                    e.preventDefault()
                    cbOnCancel(editor)
                  }
                  if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault()
                    cbOnSave(editor)
                  }
                  if (e.key === 'Enter' || e.key === 'ArrowDown') {
                    e.preventDefault()
                    editor?.chain().focus().run()
                  }
                }
              }}
              maxLength={512}
              onFocus={() => {
                cbFocus()
              }}
              autoComplete="off"
              placeholder="Judul"
              className="placeholder:text-muted-foreground h-fit w-full resize-none appearance-none overflow-hidden bg-transparent text-3xl font-bold leading-tight placeholder:font-semibold focus:outline-none"
            />
          </div>
          <div ref={topFileRef}></div>
          <div
            onClick={() => {
              editor?.chain().focus().run()
              cbFocus()
            }}
            className="max-w-screen-l relative w-full px-5 pb-2 pr-6"
          >
            <div>
              <EditorBubbleMenu editor={editor} />
              <EditorContent
                editor={editor}
                onKeyUp={e => {
                  if (e.key === 'ArrowUp') {
                    e.preventDefault()
                    if (editor?.state.selection.$anchor.pos === 1) {
                      titletRef.current?.focus()
                    }
                  }
                }}
                onKeyDown={e => {
                  if (e.key === 'Escape') {
                    e.preventDefault()
                    cbOnCancel(editor)
                  }
                  if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault()
                    cbOnSave(editor)
                  }
                }}
                onFocus={() => {
                  cbFocus()
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <SkeletonCard />
      )}
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-4 p-4">
      <Skeleton className="h-[90px] w-full rounded-xl" />
      <div className="space-y-6">
        <Skeleton className="h-6 w-[250px] rounded-lg" />
        <Skeleton className="h-6 w-full rounded-lg" />
        <Skeleton className="h-6 w-[200px] rounded-lg" />
        <Skeleton className="h-6 w-[320px] rounded-lg" />
        <Skeleton className="h-6 w-full rounded-lg" />
        <Skeleton className="h-6 w-[280px] rounded-lg" />
        <Skeleton className="h-6 w-[320px] rounded-lg" />
        <Skeleton className="h-6 w-full rounded-lg" />
      </div>
    </div>
  )
}

export default Editor
