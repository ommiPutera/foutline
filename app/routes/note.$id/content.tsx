import React from 'react'

import {useFetcher, useLoaderData, useLocation} from '@remix-run/react'

import {type Post} from '@prisma/client'

import {formatDistance} from 'date-fns'
import {id as IDNLocale} from 'date-fns/locale'

import {PencilLine} from 'lucide-react'

import type {Editor as EditorType} from '@tiptap/core'

import {Button} from '~/components/ui/button.tsx'

import {capitalizeFirstLetter, cn} from '~/lib/utils.ts'

import PageEditor from './page-editor.tsx'
import {FormType, type LoaderData, type TFocus} from './route.tsx'

import {MAX_CHARACTER_EDITOR} from '~/config.ts'

export type Props = {
  editor: EditorType | undefined
  setEditor: React.Dispatch<React.SetStateAction<EditorType | undefined>>
  getEditor: (data: EditorType) => void
}

function Wrapper({editor, getEditor}: Props) {
  const [isFocus, setIsFocus] = React.useState<boolean>(false)

  const location = useLocation()

  React.useEffect(() => {
    // Close editor when navigate to another page
    if (location.pathname) {
      setIsFocus(false)
    }
  }, [location.pathname])

  return (
    <div className="flex w-full flex-col gap-8 pt-0 md:px-5 md:pt-24 lg:pr-0">
      <Topper />
      <div className="flex flex-col gap-6">
        <StartWriting
          isFocus={isFocus}
          setIsFocus={setIsFocus}
          editor={editor}
        />
        <Content
          isFocus={isFocus}
          setIsFocus={setIsFocus}
          editor={editor}
          getEditor={getEditor}
        />
      </div>
    </div>
  )
}

function Topper() {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-4 px-3.5 md:px-0">
      <div className="bg-note-background flex h-12 w-12 items-center justify-center rounded-full">
        <PencilLine className="stroke-note h-4 w-4" strokeWidth={2.5} />
      </div>
      <div className="flex max-w-sm flex-col gap-2">
        <h3 className="text-muted-foreground text-lg font-semibold leading-tight">
          Catatan Pribadi Anda
        </h3>
        <p className="text-muted-foreground text-sm">
          Lacak tujuan, kebiasaan, dan rutinitas harian Anda.
        </p>
      </div>
    </div>
  )
}

function StartWriting({
  isFocus,
  setIsFocus,
  editor,
}: TFocus & Pick<Props, 'editor'>) {
  return (
    <div className="mx-auto w-full max-w-lg px-3.5 md:px-0">
      <Button
        variant="outline"
        onClick={() => {
          editor?.chain().focus().run()
          setIsFocus(true)
        }}
        disabled={isFocus}
        type="button"
        className="text-muted-foreground w-full justify-start rounded-xl py-6 font-normal dark:bg-zinc-900 dark:hover:bg-zinc-800"
      >
        <span>
          <PencilLine className="mr-2 h-3.5 w-3.5" />
        </span>
        <span className="line-clamp-1">
          {isFocus ? (
            <div className="flex items-center gap-2">
              <p className="text-muted-foreground text-sm">
                Ketik apapun atau tekan{' '}
              </p>
              <kbd className="bg-muted text-muted-foreground pointer-events-none hidden h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 md:inline-flex">
                <span className="text-muted-foreground/90 text-[11px] font-semibold">
                  /
                </span>
              </kbd>
              <p className="text-muted-foreground text-sm"> untuk perintah..</p>
            </div>
          ) : (
            'Mulai mencatat atau perbarui catatan Anda..'
          )}
        </span>
      </Button>
    </div>
  )
}

function Content({
  editor,
  isFocus,
  setIsFocus,
  getEditor,
}: TFocus & Pick<Props, 'getEditor' | 'editor'>) {
  const {post} = useLoaderData<LoaderData>()

  const [content, setContent] = React.useState<any>(post?.content)
  const [preview, setPreview] = React.useState<any>(post?.preview)
  const [title, setTitle] = React.useState<any>(post?.content)

  return (
    <div className="mx-auto mb-4 flex w-full max-w-lg justify-center md:mb-52">
      <div
        className={cn(
          'border-border/60 flex h-fit w-full flex-col gap-4 rounded-xl md:gap-3 md:border-2 md:border-dashed md:bg-white/60 dark:md:bg-zinc-900/60',
          isFocus && 'shadow-border border-muted-foreground/30 md:shadow-xl',
        )}
      >
        <PageEditor
          isFocus={isFocus}
          setIsFocus={setIsFocus}
          content={content}
          setContent={setContent}
          preview={preview}
          setPreview={setPreview}
          title={title}
          setTitle={setTitle}
          getEditor={getEditor}
        />
        <Footer
          isFocus={isFocus}
          setIsFocus={setIsFocus}
          content={content}
          preview={preview}
          title={title}
          editor={editor}
        />
      </div>
    </div>
  )
}

function Footer({
  editor,

  isFocus,
  setIsFocus,
  title,
  content,
  preview,
}: TFocus &
  Pick<Post, 'title' | 'content' | 'preview'> & {
    editor: Props['editor']
  }) {
  const {postId, post} = useLoaderData<LoaderData>()

  const fetcher = useFetcher()

  if (!isFocus && post)
    return (
      <div className="px-5 pb-4">
        <p className="text-muted-foreground text-xs">
          {capitalizeFirstLetter(
            formatDistance(new Date(post?.updatedAt), new Date(), {
              addSuffix: true,
              includeSeconds: true,
              locale: IDNLocale,
            }),
          )}
        </p>
      </div>
    )

  return (
    <div className="sticky bottom-0 flex flex-col gap-2 rounded-b-xl md:bg-white dark:md:bg-zinc-900">
      <div className="bg-muted-foreground/10 mx-auto h-[1px] w-[93%]" />
      <div className="w-full px-4 pb-2">
        <div className="flex w-full items-center justify-between">
          <Button
            onClick={event => {
              event.stopPropagation()
              editor?.chain().blur().run()
              editor?.commands.setContent(post?.content as any)
              setTimeout(() => {
                setIsFocus(false)
              }, 100)
            }}
            size="sm"
            variant="ghost"
            className="w-fit px-2"
            type="button"
          >
            <div className="flex items-center gap-2">
              <p className="text-muted-foreground text-[11px]">Batalkan</p>
              <kbd className="bg-muted text-muted-foreground pointer-events-none hidden h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 md:inline-flex">
                <span className="text-muted-foreground/90 text-[9px] font-semibold">
                  Esc
                </span>
              </kbd>
            </div>
          </Button>
          {editor?.storage.characterCount.characters() > 0 && (
            <div className="text-muted-foreground hidden text-[11px] md:block">
              {editor?.storage.characterCount.characters() +
                '/' +
                MAX_CHARACTER_EDITOR +
                ' karakter tersisa'}
            </div>
          )}
          <Button
            size="sm"
            className="w-fit px-2"
            variant="ghost"
            type="button"
            onClick={event => {
              event.stopPropagation()
              fetcher.submit(
                {
                  _action: FormType.UPDATE_CONTENT,
                  id: post?.id as string,
                  title: title,
                  preview: preview,
                  postJSON: JSON.stringify(content),
                },
                {method: 'POST'},
              )
              setIsFocus(false)
            }}
          >
            <div className="flex items-center gap-2">
              <p className="text-muted-foreground text-[11px]">Selesai</p>
              <div className="hidden gap-1 md:flex">
                <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100">
                  <span className="text-muted-foreground/90 text-[14px] font-semibold">
                    ⌘
                  </span>
                </kbd>
                <p className="text-muted-foreground text-[11px]">+</p>
                <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100">
                  <span className="text-muted-foreground/90 text-[9px] font-semibold">
                    S
                  </span>
                </kbd>
              </div>
            </div>
          </Button>
          <input type="hidden" name="_action" value={FormType.UPDATE_CONTENT} />
          <input type="hidden" name="postId" value={postId} />
        </div>
      </div>
    </div>
  )
}

export default Wrapper
