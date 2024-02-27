import {Star} from 'lucide-react'

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

function Favorite({
  tooltipText = {
    active: 'Batalkan favorit',
    notActive: 'Tambahkan ke favorit',
  },
  defaultValue = false,
  side = 'bottom',
  callBack,
  size = 'default',
}: {
  tooltipText?: {active: string; notActive: string}
  defaultValue?: boolean
  side?: TooltipContentProps['side']
  callBack?: () => void
  size?: 'sm' | 'default'
}) {
  const [isFavorited, setIsFavorited] = React.useState(defaultValue)
  const [isHover, setIsHover] = React.useState(false)

  const handleClick = () => {
    setIsFavorited(!isFavorited)
    if (typeof callBack === 'function') {
      callBack()
    }
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
            size={size === 'sm' ? 12 : 14}
            className={cn(
              '',
              isFavorited
                ? 'fill-[#FFA500] stroke-[#FFA500]'
                : 'fill-transparent stroke-black dark:stroke-white',
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
