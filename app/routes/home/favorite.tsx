import {Star} from 'lucide-react'

import {useSubmit} from '@remix-run/react'

import type {Post} from '@prisma/client'

import React from 'react'

import _ from 'lodash'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~/components/ui/tooltip.tsx'
import {Button} from '~/components/ui/button.tsx'

import type {TooltipContentProps} from '@radix-ui/react-tooltip'

import {cn} from '~/lib/utils.ts'

import {FormType} from './route.tsx'

type Props = {
  tooltipText?: {active: string; notActive: string}
  side?: TooltipContentProps['side']
  size?: 'sm' | 'default'
}

function Favorite({
  tooltipText = {
    active: 'Batalkan favorit',
    notActive: 'Tambahkan ke favorit',
  },
  side = 'bottom',
  size = 'default',
  id,
  isFavorite: defaultValue,
}: Props & Pick<Post, 'id' | 'isFavorite'>) {
  const submit = useSubmit()

  const [isFavorited, setIsFavorited] = React.useState<boolean>(defaultValue)
  const [isHover, setIsHover] = React.useState(false)

  const handleClick = () => {
    setIsFavorited(!isFavorited)
    submit(
      {
        id,
        isFavorite: !isFavorited,
        _action: FormType.FAVORITE,
      },
      {method: 'POST', action: '/home'},
    )
  }

  return (
    <Tooltip disableHoverableContent open={isHover}>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          onMouseEnter={() => _.delay(() => setIsHover(true), 30)}
          onMouseLeave={() => _.delay(() => setIsHover(false), 60)}
          onClick={handleClick}
          variant="transparent"
          className={cn(
            'h-5 w-5 hover:[&:has(svg)]:before:bg-[#FFA500]/10 [&:hover>svg]:text-[#FFA500]',
            isFavorited && 'h-5 w-5 [&:has(svg)]:text-[#FFA500]',
          )}
        >
          <Star
            strokeWidth={2.5}
            size={size === 'sm' ? 12 : 14}
            className={cn(
              '',
              isFavorited
                ? 'fill-[#FFA500] stroke-[#FFA500]'
                : 'stroke-foreground/80 fill-transparent',
            )}
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent side={side}>
        <p>{isFavorited ? tooltipText?.active : tooltipText?.notActive}</p>
      </TooltipContent>
    </Tooltip>
  )
}

export default Favorite
