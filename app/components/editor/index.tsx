import { EditorContent, useEditor } from '@tiptap/react'
import { defaultExtensions } from './extensions/index.tsx';
import { defaultEditorProps } from './props.ts';
import React from 'react';
import TextareaAutosize from 'react-textarea-autosize'
import { ScrollArea } from '../ui/scroll-area.tsx';


function Editor() {
  const titletRef = React.useRef<HTMLTextAreaElement>(null)
  const editorRef = React.useRef<HTMLDivElement>(null)

  const editor = useEditor({
    extensions: [...defaultExtensions],
    editorProps: {
      ...defaultEditorProps,
    },
  })

  return (
    <div className='relative'>
      <div className='top-0 z-20 w-full bg-background pr-4 md:sticky'>
        <TextareaAutosize
          ref={titletRef}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === 'ArrowDown') {
              e.preventDefault()
              editor?.chain().focus().run()
            }
          }}
          maxLength={512}
          autoComplete='off'
          placeholder="Untitled"
          className="w-full resize-none appearance-none overflow-hidden bg-transparent text-2xl font-semibold leading-tight placeholder:font-medium focus:outline-none"
        />
      </div>
      <React.Suspense fallback={<div>Loading woi...</div>}>
        <ScrollArea className="h-[70vh]">
          <div
            onClick={() => {
              editor?.chain().focus().run();
            }}
            className="max-w-screen-l relative mt-2 h-fit w-full sm:mb-[calc(20vh)]"
          >
            {editor ? (
              <>
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
      </React.Suspense>
    </div>
  )
}

export default Editor
