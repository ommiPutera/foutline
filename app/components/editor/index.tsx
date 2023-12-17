'use client'

import type {Editor as EditorClass, Extension, JSONContent} from '@tiptap/core'
import {EditorContent, useEditor} from '@tiptap/react'
import va from '@vercel/analytics'
import {useCompletion} from 'ai/react'
import React from 'react'
import {toast} from 'sonner'
import {useDebouncedCallback} from 'use-debounce'
import {getPrevText} from '~/lib/editor.ts'
import {EditorBubbleMenu} from './bubble-menu/index.tsx'
import {ImageResizer} from './extensions/image-resizer.tsx'
import {defaultExtensions} from './extensions/index.tsx'
import {defaultEditorProps} from './props.ts'

type EditorProps = {
  submit: () => void
  content: JSONContent | null
  setContent: React.Dispatch<React.SetStateAction<JSONContent>>
  setSaveStatus: React.Dispatch<
    React.SetStateAction<'Saved' | 'Unsaved' | 'Saving..'>
  >
  focus?: boolean
  titletEl: React.RefObject<HTMLTextAreaElement>
  extensions?: Extension[]
  editorProps?: EditorProps
  onUpdate?: (editor?: EditorClass) => void | Promise<void>
  completionApi?: string
}

const Editor = React.forwardRef<HTMLDivElement, EditorProps>(function Editor(
  {
    submit,
    content,
    setContent,
    setSaveStatus,
    focus = false,
    titletEl,
    extensions = [],
    editorProps = {},
    onUpdate = () => {},
    completionApi = '/api/generate',
  },
  ref,
) {
  const [hydrated, setHydrated] = React.useState(false)

  const debouncedUpdates = useDebouncedCallback(
    async ({editor}: {editor: EditorClass}) => {
      const json = editor.getJSON()
      setSaveStatus('Saving..')
      setContent(json)

      // Simulate a delay in saving.
      setTimeout(() => {
        setSaveStatus('Saved')
        submit()
      }, 750)
    },
    750,
  )

  const editor = useEditor({
    extensions: [...defaultExtensions, ...extensions],
    editorProps: {
      ...defaultEditorProps,
      ...editorProps,
    },
    onUpdate: e => {
      const selection = e.editor.state.selection
      const lastTwo = getPrevText(e.editor, {
        chars: 2,
      })
      if (lastTwo === '++' && !isLoading) {
        e.editor.commands.deleteRange({
          from: selection.from - 2,
          to: selection.from,
        })
        complete(
          getPrevText(e.editor, {
            chars: 5000,
          }),
        )
        // complete(e.editor.storage.markdown.getMarkdown());
        va.track('Autocomplete Shortcut Used')
      } else {
        onUpdate(e.editor)
        debouncedUpdates(e)
      }
    },
    autofocus: false,
  })

  const {complete, completion, isLoading, stop} = useCompletion({
    id: 'novel',
    api: completionApi,
    onFinish: (_prompt, completion) => {
      editor?.commands.setTextSelection({
        from: editor.state.selection.from - completion.length,
        to: editor.state.selection.from,
      })
    },
    onError: err => {
      toast.error(err.message)
      if (err.message === 'You have reached your request limit for the day.') {
        va.track('Rate Limit Reached')
      }
    },
  })

  const prev = React.useRef('')

  // Insert chunks of the generated text
  React.useEffect(() => {
    const diff = completion.slice(prev.current.length)
    prev.current = completion
    editor?.commands.insertContent(diff)
  }, [isLoading, editor, completion])

  React.useEffect(() => {
    // if user presses escape or cmd + z and it's loading,
    // stop the request, delete the completion, and insert back the "++"
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || (e.metaKey && e.key === 'z')) {
        stop()
        if (e.key === 'Escape') {
          editor?.commands.deleteRange({
            from: editor.state.selection.from - completion.length,
            to: editor.state.selection.from,
          })
        }
        editor?.commands.insertContent('++')
      }
    }
    const mousedownHandler = (e: MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      stop()
      if (window.confirm('AI writing paused. Continue?')) {
        complete(editor?.getText() || '')
      }
    }
    if (isLoading) {
      document.addEventListener('keydown', onKeyDown)
      window.addEventListener('mousedown', mousedownHandler)
    } else {
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('mousedown', mousedownHandler)
    }
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('mousedown', mousedownHandler)
    }
  }, [stop, isLoading, editor, complete, completion.length])

  React.useEffect(() => {
    if (editor && content && !hydrated) {
      editor.commands.setContent(content)
      setHydrated(true)
    }
  }, [editor, content, hydrated])

  React.useEffect(() => {
    if (editor && focus) {
      const json = editor.getJSON()
      if (typeof json.content?.[1] === 'undefined') {
        console.log('here')
        editor.commands.focus()
      }
    }
  }, [editor, focus])

  return (
    <div
      // onClick={() => {
      //   editor?.chain().focus().run()
      // }}
      className="relative min-h-[500px] w-full px-6"
    >
      {editor && <EditorBubbleMenu editor={editor} />}
      {editor?.isActive('image') && <ImageResizer editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  )
})

export default Editor
