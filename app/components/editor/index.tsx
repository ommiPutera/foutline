import { EditorContent, useEditor } from '@tiptap/react';
import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { ScrollArea } from '../ui/scroll-area.tsx';
import { TiptapExtensions } from './extensions/index.tsx';
import { TiptapEditorProps } from './props.ts';
import { EditorBubbleMenu } from './bubble-menu/index.tsx';


function Editor({ type }: { type?: 'MONTHLY' | 'BASIC' }) {
  const titletRef = React.useRef<HTMLTextAreaElement>(null)
  const editorRef = React.useRef<HTMLDivElement>(null)

  const editor = useEditor({
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
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
          placeholder="Judul"
          className="w-full resize-none appearance-none overflow-hidden bg-transparent text-2xl font-semibold leading-tight placeholder:font-normal placeholder:text-muted-foreground focus:outline-none"
        />
      </div>
      <React.Suspense fallback={<div>Loading woi...</div>}>
        <ScrollArea className="h-[70vh]">
          <div
            onClick={() => {
              editor?.chain().focus().run();
            }}
            className="max-w-screen-l relative mt-4 h-fit w-full pr-6 sm:mb-[calc(20vh)]"
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
      </React.Suspense>
    </div>
  )
}

export default Editor
