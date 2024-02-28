import { useLoaderData } from '@remix-run/react'
import { type LoaderData } from './route.tsx'
import { ChevronRight, Menu, Trash } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover.tsx'
import { Button } from '~/components/ui/button.tsx'
import { SelectSeparator } from '~/components/ui/select.tsx'
import React from 'react'

function Header() {
  const { post } = useLoaderData<LoaderData>()

  if (!post) return <></>
  return (
    <header className="bg-background fixed left-[var(--sidebar-width)] right-0 top-0 z-10 w-[calc(100%_-_var(--sidebar-width))] border-b">
      <div className="flex h-16 items-center justify-between gap-6 px-3.5">
        <div className="flex items-center gap-2">
          <p className="line-clamp-1 text-sm font-medium">Keuangan bulanan</p>
          <ChevronRight className="h-4 w-4" />
          <p className="text-muted-foreground line-clamp-1 text-sm font-medium">
            {post.title.length > 56
              ? `${post.title.substring(0, 56)}..`
              : post.title}
          </p>
        </div>
        <div>
          <More />
        </div>
      </div>
    </header>
  )
}

function More() {
  const [isFocus, setIsFocus] = React.useState(false)
  return (
    <Popover onOpenChange={v => setIsFocus(v)}>
      <div className="flex h-full">
        <PopoverTrigger asChild>
          <Button
            variant={isFocus ? 'secondary' : 'ghost'}
            size="sm"
            className="flex items-center gap-2 rounded-lg"
          >
            <Menu className="h-4 w-4" strokeWidth={2.5} />
            <p className="text-[13px]">Lainnya</p>
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent
        className="border-muted-foreground/60 h-fit w-48 p-0"
        align="end"
        side="bottom"
        forceMount
      >
        <Remove />
        <SelectSeparator className="z-0" />
        <Remove />
      </PopoverContent>
    </Popover>
  )
}

function Remove() {
  // const submit = useSubmit()
  return (
    <div className="my-2">
      <Button
        variant="ghost"
        size="sm"
        // onClick={() => submit({ id, _action: FormType.DELETE }, { method: 'POST' })}
        className="w-full justify-start rounded-none px-3"
      >
        <Trash size="16" className="mr-2" />
        <span>Pindahkan ke sampah</span>
      </Button>
    </div>
  )
}

export default Header
