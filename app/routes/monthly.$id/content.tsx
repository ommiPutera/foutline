import React from 'react'

import {useFetcher, useLoaderData, useLocation} from '@remix-run/react'

import {type Post} from '@prisma/client'

import {formatDistance} from 'date-fns'
import {id as IDNLocale} from 'date-fns/locale'

import {ArrowRightLeft, PencilLine} from 'lucide-react'

import type {Editor as EditorType} from '@tiptap/core'

import {Button} from '~/components/ui/button.tsx'

import {capitalizeFirstLetter, cn} from '~/lib/utils.ts'

import PageEditor from './page-editor.tsx'
import {FormType, type LoaderData, type TFocus} from './route.tsx'

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
    <div className="flex w-full flex-col gap-8 px-0 pt-0 md:px-3.5 md:pt-24 lg:pr-0">
      <Topper />
      <div className="flex flex-col gap-4">
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
      <div className="bg-monthly-background flex h-12 w-12 items-center justify-center rounded-full">
        <ArrowRightLeft
          className="h-4 w-4 stroke-orange-500"
          strokeWidth={2.5}
        />
      </div>
      <div className="flex max-w-sm flex-col gap-2">
        <h3 className="text-2xl font-bold leading-tight">Keuangan Bulanan</h3>
        <p className="text-muted-foreground text-sm">
          Rencanakan dan kontrol pengeluaran - pemasukan Anda rutin setiap bulan
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
          {isFocus
            ? "Tekan '/' untuk perintah.."
            : 'Mulai mencatat atau perbarui catatan keuangan bulanan..'}
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

  const location = useLocation()

  const [content, setContent] = React.useState<any>(post?.content)
  const [preview, setPreview] = React.useState<any>(post?.preview)
  const [title, setTitle] = React.useState<any>(post?.content)
  const [characterLength, setCharacterLength] = React.useState<number>(0)

  React.useEffect(() => {
    if (location.pathname) {
      setCharacterLength(Number(editor?.getText().length))
    }
  }, [editor, location.pathname])

  return (
    <div className="mx-auto mb-4 flex w-full max-w-lg justify-center md:mb-52">
      <div
        className={cn(
          'border-border flex h-fit w-full flex-col gap-4 rounded-xl md:gap-3 md:border-2 md:border-dashed md:bg-white dark:md:bg-zinc-900',
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
          setCharacterLength={setCharacterLength}
          getEditor={getEditor}
        />
        <Footer
          characterLength={characterLength}
          isFocus={isFocus}
          setIsFocus={setIsFocus}
          content={content}
          preview={preview}
          title={title}
        />
      </div>
    </div>
  )
}

function Footer({
  characterLength,
  isFocus,
  setIsFocus,
  title,
  content,
  preview,
}: TFocus &
  Pick<Post, 'title' | 'content' | 'preview'> & {characterLength: number}) {
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
    <div className="bg-background sticky bottom-0 flex flex-col gap-2 rounded-b-xl md:bg-white dark:md:bg-zinc-900">
      <div className="bg-muted-foreground/30 mx-auto h-[0.5px] w-[93%]" />
      <div className="w-full px-4 pb-2">
        <div className="flex w-full items-center justify-between">
          <Button
            onClick={event => {
              event.stopPropagation()
              setIsFocus(false)
            }}
            size="sm"
            variant="ghost"
            className="w-fit"
            type="button"
          >
            <div className="flex items-center gap-2">
              <p className="text-muted-foreground text-xs">Batalkan</p>
              <kbd className="bg-muted text-muted-foreground pointer-events-none hidden h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 md:inline-flex">
                <span className="text-muted-foreground/90 text-xs font-semibold">
                  Esc
                </span>
              </kbd>
            </div>
          </Button>
          {characterLength > 0 && (
            <div className="text-muted-foreground hidden text-xs md:block">
              {990 - characterLength + ' karakter tersisa'}
            </div>
          )}
          <Button
            size="sm"
            className="w-fit"
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
              <p className="text-muted-foreground text-xs">Selesai</p>
              <div className="hidden gap-1 md:flex">
                <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100">
                  <span className="text-muted-foreground/90 text-base font-semibold">
                    ⌘
                  </span>
                </kbd>
                <p className="text-muted-foreground text-xs">+</p>
                <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100">
                  <span className="text-muted-foreground/90 text-xs font-semibold">
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
