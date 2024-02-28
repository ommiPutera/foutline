import React from 'react'

import { useFetcher, useLoaderData, useLocation } from '@remix-run/react'

import { formatDistance } from 'date-fns'
import { id as IDNLocale } from 'date-fns/locale'

import { Button } from '~/components/ui/button.tsx'

import { capitalizeFirstLetter, cn } from '~/lib/utils.ts'

import { FormType, type TFocus, type LoaderData } from './route.tsx'
import PageEditor from './editor.tsx'

import { ArrowRightLeft, PencilLine } from 'lucide-react'

function Wrapper() {
  const [isFocus, setIsFocus] = React.useState<boolean>(false)
  const location = useLocation()

  React.useEffect(() => {
    if (location.pathname) {
      // Close editor when navigate to another page
      setIsFocus(false)
    }
  }, [location.pathname])

  return (
    <div className="flex w-full flex-col gap-8 pt-24 pl-3.5">
      <Topper />
      <div className="flex flex-col gap-4">
        <StartWriting isFocus={isFocus} setIsFocus={setIsFocus} />
        <Content isFocus={isFocus} setIsFocus={setIsFocus} />
      </div>
    </div>
  )
}

function Topper() {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-4">
      <div className="bg-monthly-background flex h-12 w-12 items-center justify-center rounded-full">
        <ArrowRightLeft
          className="h-4 w-4 stroke-orange-500"
          strokeWidth={2.5}
        />
      </div>
      <div className="flex max-w-sm flex-col gap-2">
        <h3 className="text-2xl font-bold leading-tight">Keuangan Bulanan</h3>
        <p className="text-muted-foreground text-sm">
          Rencanakan dan kontrol pengeluaran - pemasukan anda rutin setiap bulan
        </p>
      </div>
    </div>
  )
}

function StartWriting({ isFocus, setIsFocus }: TFocus) {
  if (isFocus) return <></>
  return (
    <div className="mx-auto w-full max-w-lg">
      <Button
        variant="secondary"
        onClick={() => setIsFocus(true)}
        className="text-muted-foreground w-full justify-start rounded-xl py-6 font-normal dark:bg-zinc-900 dark:hover:bg-zinc-800"
      >
        <span>
          <PencilLine className="mr-2 h-3.5 w-3.5" />
        </span>
        <span>Mulai mencatat atau perbarui catatan keuangan bulanan..</span>
      </Button>
    </div>
  )
}

function Content({ isFocus, setIsFocus }: TFocus) {
  return (
    <div className="mx-auto mb-52 flex w-full max-w-lg justify-center">
      <div
        className={cn(
          'border-border flex h-fit w-full flex-col gap-4 rounded-xl border bg-white dark:bg-zinc-900 md:gap-3',
          isFocus && 'shadow-border border-muted-foreground/30 shadow-3xl',
        )}
      >
        <PageEditor isFocus={isFocus} setIsFocus={setIsFocus} />
        <Footer isFocus={isFocus} setIsFocus={setIsFocus} />
      </div>
    </div>
  )
}

function Footer({ isFocus, setIsFocus }: TFocus) {
  const { postId, post } = useLoaderData<LoaderData>()

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
    <div className="sticky bottom-0 flex flex-col gap-2 rounded-b-xl bg-white dark:bg-zinc-900">
      <div className="bg-muted-foreground/30 h-[0.5px] w-full" />
      <div className="w-full px-4 pb-2">
        <fetcher.Form
          method="POST"
          className="flex w-full items-center justify-between"
        >
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
              <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100">
                <span className="text-muted-foreground/90 text-xs font-semibold">
                  Esc
                </span>
              </kbd>
            </div>
          </Button>
          <Button
            size="sm"
            className="w-fit"
            variant="ghost"
            type="submit"
            onClick={event => {
              event.stopPropagation()
              setIsFocus(false)
            }}
          >
            <div className="flex items-center gap-2">
              <p className="text-muted-foreground text-xs">Selesai</p>
              <div className="flex gap-1">
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
        </fetcher.Form>
      </div>
    </div>
  )
}

export default Wrapper
