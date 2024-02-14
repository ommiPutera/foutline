import {EditorContent, useEditor} from '@tiptap/react'
import React from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import {ScrollArea} from '../ui/scroll-area.tsx'
import {BasicExtensions} from './extensions/index.tsx'
import Placeholder from '@tiptap/extension-placeholder'
import {TiptapEditorProps} from './props.ts'
import {EditorBubbleMenu} from './bubble-menu/index.tsx'
import {MonthlyExtensions} from './extensions/monthly.tsx'
import type {Editor as EditorType, JSONContent} from '@tiptap/core'
import type {Post} from '@prisma/client'
import {useLocation} from '@remix-run/react'

function Editor({
  type,
  getData,
  defaultContent,
  post,
  setPageTitle,
  cbFocus = () => null,
  cbBlur = () => null,
}: {
  type?: 'MONTHLY' | 'BASIC'
  getData: (data: EditorType) => null
  defaultContent: JSONContent | undefined
  post?: Post
  setPageTitle: React.Dispatch<React.SetStateAction<string>>
  cbFocus: () => void
  cbBlur: () => void
}) {
  const location = useLocation()

  const titletRef = React.useRef<HTMLTextAreaElement>(null)
  const editorRef = React.useRef<HTMLDivElement>(null)
  const topFileRef = React.useRef(null)

  const [isScroll, setIsScroll] = React.useState(false)
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
    onUpdate({editor}) {
      if (editor) {
        getData(editor)
      }
    },
  })

  React.useEffect(() => {
    if (editor && defaultContent && !hydrated) {
      console.log('GASSSS')
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
  }, [editor, location.pathname, post?.content])

  React.useEffect(() => {
    if (!topFileRef?.current) return
    const observer = new IntersectionObserver(function (entries) {
      for (let entry of entries) {
        if (entry.isIntersecting) setIsScroll(false)
        else setIsScroll(true)
      }
    })
    observer.observe(topFileRef.current)
  }, [])

  return (
    <div className="relative">
      <div className="top-0 w-full bg-white px-5 py-3 md:sticky">
        <TextareaAutosize
          ref={titletRef}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === 'ArrowDown') {
              e.preventDefault()
              editor?.chain().focus().run()
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
          onBlur={() => {
            cbBlur()
          }}
          autoComplete="off"
          placeholder="Judul"
          className="placeholder:text-muted-foreground w-full resize-none appearance-none overflow-hidden bg-transparent text-2xl font-bold leading-tight placeholder:font-semibold focus:outline-none"
        />
      </div>
      <ScrollArea className="h-[50vh] lg:h-[70vh]">
        {isScroll && (
          <div className="from-background/30 absolute top-0 z-20 -mt-1 h-8 w-full bg-gradient-to-t to-gray-200/60"></div>
        )}
        {isScroll && (
          <div className="from-background/30 absolute bottom-0 z-20 -mt-1 h-8 w-full bg-gradient-to-b to-gray-200/60"></div>
        )}
        <div ref={topFileRef}></div>
        <div
          onClick={() => {
            editor?.chain().focus().run()
            cbFocus()
          }}
          onBlur={() => {
            cbBlur()
          }}
          className="max-w-screen-l relative w-full px-5 pr-6 sm:mb-[calc(20vh)]"
        >
          {editor ? (
            <>
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
              />
            </>
          ) : (
            <></>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

export default Editor
