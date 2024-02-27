import { EditorContent, useEditor } from '@tiptap/react'
import React from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { BasicExtensions } from './extensions/index.tsx'
import Placeholder from '@tiptap/extension-placeholder'
import { TiptapEditorProps } from './props.ts'
import { EditorBubbleMenu } from './bubble-menu/index.tsx'
import { MonthlyExtensions } from './extensions/monthly.tsx'
import type { Editor as EditorType, JSONContent } from '@tiptap/core'
import type { Post } from '@prisma/client'
import { useLocation } from '@remix-run/react'

function Editor({
  type,
  getData,
  defaultContent,
  post,
  setPageTitle,
  cbFocus = () => null,
  cbOnSave = () => null,
  cbOnCancel = () => null,
}: {
  type?: 'MONTHLY' | 'BASIC'
  getData: (data: EditorType) => null
  defaultContent: JSONContent | undefined
  post?: Post
  setPageTitle: React.Dispatch<React.SetStateAction<string>>
  cbFocus: () => void
  cbOnSave: (editor: EditorType) => void
  cbOnCancel: (editor: EditorType) => void
}) {
  const location = useLocation()

  const titletRef = React.useRef<HTMLTextAreaElement>(null)
  const editorRef = React.useRef<HTMLDivElement>(null)
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
    placeholder: "Buat catatan.., '/' untuk perintah..",
  })

  const editor = useEditor({
    editorProps: TiptapEditorProps,
    extensions: [CustomPlaceholder, ...getExtensions()],
    onUpdate({ editor }) {
      if (editor) {
        getData(editor)
      }
    },
  })

  React.useEffect(() => {
    if (editor && defaultContent && !hydrated) {
      editor.commands.setContent(defaultContent)
      setHydrated(true)
    }
  }, [editor, defaultContent, hydrated, getData])

  React.useEffect(() => {
    if (location.pathname && editor) {
      getData(editor)
      // @ts-ignore
      editor.commands.setContent(post?.content)
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
          <div className="top-0 z-10 w-full rounded-t-xl bg-white px-5 py-3 dark:bg-zinc-900 md:sticky">
            <TextareaAutosize
              ref={titletRef}
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
              onChange={e => {
                setPageTitle(e.target.value)
              }}
              defaultValue={post?.title}
              maxLength={512}
              onFocus={() => {
                cbFocus()
              }}
              autoComplete="off"
              placeholder="Judul"
              className="placeholder:text-muted-foreground w-full resize-none appearance-none overflow-hidden bg-transparent text-2xl font-bold leading-tight placeholder:font-semibold focus:outline-none"
            />
          </div>
          <div ref={topFileRef}></div>
          <div
            onClick={() => {
              editor?.chain().focus().run()
              cbFocus()
            }}
            className="max-w-screen-l relative w-full px-5 pr-6 sm:pb-4"
          >
            <div>
              <EditorBubbleMenu editor={editor} />
              <EditorContent
                ref={editorRef}
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
        <div>loading..</div>
      )}
    </div>
  )
}

export default Editor
