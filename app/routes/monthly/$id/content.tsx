import React from "react"

import { useFetcher, useLoaderData } from "@remix-run/react"

import { Button } from "~/components/ui/button.tsx"

import { cn } from "~/lib/utils.ts"

import { FormType, type TFocus, type LoaderData } from "./route.tsx"
import PageEditor from "./editor.tsx"

import { ArrowRightLeft, PencilLine } from "lucide-react"

function Wrapper() {
  const [isFocus, setIsFocus] = React.useState<boolean>(false)

  return (
    <div className="w-full flex flex-col gap-8">
      <Topper />
      <div className="flex flex-col gap-4">
        <Continue
          isFocus={isFocus}
          setIsFocus={setIsFocus}
        />
        <Content
          isFocus={isFocus}
          setIsFocus={setIsFocus}
        />
      </div>
    </div>
  )
}

function Topper() {
  return (
    <div className="max-w-lg mx-auto w-full flex flex-col gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-monthly-background">
        <ArrowRightLeft className="h-4 w-4 stroke-orange-500" strokeWidth={2.5} />
      </div>
      <div className="max-w-sm flex flex-col gap-2">
        <h3 className="text-2xl font-bold leading-tight">Keuangan Bulanan</h3>
        <p className="text-sm text-muted-foreground">Rencanakan dan kontrol pengeluaran - pemasukan anda rutin setiap bulan</p>
      </div>
    </div>
  )
}

function Continue({ isFocus, setIsFocus }: TFocus) {
  if (isFocus) return <></>
  return (
    <div className="max-w-lg mx-auto w-full">
      <Button variant="secondary" onClick={() => setIsFocus(true)} className="w-full justify-start text-muted-foreground font-normal rounded-xl py-6 dark:bg-zinc-900 dark:hover:bg-zinc-800">
        <span><PencilLine className="h-3.5 w-3.5 mr-2" /></span>
        <span>Mulai mencatat atau perbarui catatan keuangan bulanan..</span>
      </Button>
    </div>
  )
}

function Content({ isFocus, setIsFocus }: TFocus) {
  return (
    <div className="mb-44 flex w-full justify-center max-w-lg mx-auto">
      <div className={cn(
        'border-border flex h-fit w-full flex-col gap-4 rounded-xl border bg-white dark:bg-zinc-900 md:gap-3',
        isFocus && 'shadow-border border-muted-foreground/30 shadow-3xl',
      )}
      >
        <PageEditor
          isFocus={isFocus}
          setIsFocus={setIsFocus}
        />
        <Footer
          isFocus={isFocus}
          setIsFocus={setIsFocus}
        />
      </div>
    </div>
  )
}

function Footer({ isFocus, setIsFocus }: TFocus) {
  const { postId } = useLoaderData<LoaderData>()

  const fetcher = useFetcher()

  return (
    <div className="sticky bottom-0 flex flex-col gap-2 rounded-b-xl bg-white dark:bg-zinc-900">
      <div
        className={cn(
          'bg-muted-foreground/30 h-[0.5px] w-full',
          !isFocus && 'hidden',
        )}
      ></div>
      <div className={cn('w-full px-4 pb-2', !isFocus && 'hidden')}>
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
                <span className="text-xs">Esc</span>
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
                  <span className="text-base">⌘</span>
                </kbd>
                <p className="text-muted-foreground text-xs">+</p>
                <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100">
                  <span className="text-xs">S</span>
                </kbd>
              </div>
            </div>
          </Button>
          <input
            type="hidden"
            name="_action"
            value={FormType.UPDATE_CONTENT}
          />
          <input type="hidden" name="postId" value={postId} />
        </fetcher.Form>
      </div>
    </div>
  )
}

export default Wrapper