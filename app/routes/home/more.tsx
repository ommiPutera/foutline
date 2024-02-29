import {ArrowUpRight, Copy, MoreHorizontal, Trash2} from 'lucide-react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover.tsx'
import {Button, ButtonLink} from '~/components/ui/button.tsx'

import type {Post} from '@prisma/client'

import {useSubmit} from '@remix-run/react'

import {getPostType} from '~/utils/get-post-type.ts'

import {FormType} from './route.tsx'
import {useCardStore} from './card-item.tsx'

function More({id, type}: Pick<Post, 'id' | 'type'>) {
  const {setIdCardFocus} = useCardStore()
  return (
    <Popover onOpenChange={v => (v ? setIdCardFocus(id) : setIdCardFocus(''))}>
      <div className="flex h-full">
        <PopoverTrigger asChild>
          <Button size="icon" variant="transparent" className="rounded-full">
            <MoreHorizontal
              className="stroke-foreground/80 h-4 w-4"
              strokeWidth={2.5}
            />
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent
        className="border-muted-foreground/60 h-fit w-48 px-2 py-1"
        align="end"
        side="right"
        forceMount
      >
        <Open id={id} type={type} />
        <Duplicate id={id} />
        <Remove id={id} />
      </PopoverContent>
    </Popover>
  )
}

function Open({id, type}: Pick<Post, 'id' | 'type'>) {
  return (
    <div className="my-1">
      <ButtonLink
        to={`/${getPostType(type)}/${id}`}
        variant="ghost"
        size="sm"
        className="w-full justify-start rounded-md px-3"
      >
        <ArrowUpRight size="16" className="mr-2" />
        <span>Buka halaman</span>
      </ButtonLink>
    </div>
  )
}

function Remove({id}: Pick<Post, 'id'>) {
  const submit = useSubmit()
  return (
    <div className="my-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => submit({id, _action: FormType.DELETE}, {method: 'POST'})}
        className="w-full justify-start rounded-md px-3"
      >
        <Trash2 size="16" className="mr-2" />
        <span>Pindahkan ke sampah</span>
      </Button>
    </div>
  )
}

function Duplicate({id}: Pick<Post, 'id'>) {
  const submit = useSubmit()
  return (
    <div className="my-1">
      <Button
        disabled
        variant="ghost"
        size="sm"
        onClick={() => submit({id, _action: FormType.DELETE}, {method: 'POST'})}
        className="w-full justify-start rounded-md px-3"
      >
        <Copy size="16" className="mr-2" />
        <span>Duplikat</span>
      </Button>
    </div>
  )
}

export default More
