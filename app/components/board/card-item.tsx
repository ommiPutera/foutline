import { CalculatorIcon, MoreHorizontal, Star } from 'lucide-react'
import { Button } from '../ui/button.tsx'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card.tsx'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip.tsx'
import React from 'react'
import clsx from 'clsx'
import type { TooltipContentProps } from '@radix-ui/react-tooltip'
import _ from 'lodash'

function CardItem({ content, title }: { content: string; title: string }) {
  const [isHover, setIsHover] = React.useState(false)
  return (
    <Card
      onMouseEnter={() => _.delay(() => setIsHover(true), 30)}
      onMouseLeave={() => _.delay(() => setIsHover(false), 30)}
      className="col-span-1 h-full overflow-hidden cursor-pointer hover:border-ring md:h-fit"
    >
      <CardHeader className="bg-monthly-background pb-3">
        <CardTitle className="flex items-start gap-2">
          <div className="flex h-[18px] w-[18px] items-center justify-center">
            {isHover ? (
              <Favorite
                tooltipText={{ active: "Batalkan favorit", notActive: "Tambahkan ke favorit" }}
              />
            ) : (
              <CalculatorIcon size={18} />
            )}
          </div>
          <div className="mt-[1px] line-clamp-2 text-xs font-semibold">
            {title}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative bg-monthly-background pb-4">
        <ContentPreview content={content} />
        <div className="absolute bottom-0 left-0 -mt-1 h-full w-full bg-gradient-to-t from-monthly-background/70 to-monthly-background/10"></div>
      </CardContent>
      <CardFooter className="justify-between gap-2 py-2.5">
        <div className="flex flex-col gap-1.5">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="line-clamp-1 w-fit rounded-sm bg-ring px-1 py-[3px] text-[9px] leading-none text-white">
                Selesai
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Status halaman</p>
            </TooltipContent>
          </Tooltip>
          <div className="line-clamp-1 text-[10px] leading-none text-muted-foreground">
            Diedit 10 menit yang lalu
          </div>
        </div>
        <Tooltip>
          <div className="flex h-full">
            <TooltipTrigger asChild>
              <Button
                size="icon-sm"
                variant="transparent"
                className="rounded-sm"
              >
                <MoreHorizontal size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Lainnya</p>
            </TooltipContent>
          </div>
        </Tooltip>
      </CardFooter>
    </Card>
  )
}

function Favorite({
  tooltipText,
  defaultValue = false,
  side,
  callBack
}: {
  tooltipText?: { active: string, notActive: string },
  defaultValue?: boolean,
  side?: TooltipContentProps['side'],
  callBack?: () => void
}) {
  const [isFavorited, setIsFavorited] = React.useState(defaultValue)
  const [showTooltip, setShowTooltip] = React.useState(false)

  const handleClick = () => {
    setIsFavorited(!isFavorited)
    if (typeof callBack === 'function') {
      callBack()
    }
  }

  return (
    <Tooltip disableHoverableContent open={showTooltip}>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onClick={handleClick}
          variant="transparent"
          className={clsx("h-5 w-5 [&:hover>svg]:text-[#FFA500] hover:[&:has(svg)]:before:bg-[#FFA500]/10", {
            "h-5 w-5 [&:has(svg)]:text-[#FFA500]": isFavorited
          })}
        >
          <Star size={16} className={clsx({ "fill-[#FFA500]": isFavorited })} />
        </Button>
      </TooltipTrigger>
      <TooltipContent side={side} className='mb-1.5'>
        <p className="text-xs">{isFavorited ? tooltipText?.active : tooltipText?.notActive}</p>
      </TooltipContent>
    </Tooltip>
  )
}

function ContentPreview({ content }: { content: string | JSX.Element }) {
  if (typeof content === 'string')
    return (
      <div className="line-clamp-6 text-[11px] leading-4 md:text-xs md:leading-snug">
        {content}
      </div>
    )
  return (
    <div>
      <p className="text-xs">{content}</p>
    </div>
  )
}

export default CardItem
export { Favorite as FavoriteButton }