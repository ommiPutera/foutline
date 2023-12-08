import {CalculatorIcon, MoreHorizontal, Star} from 'lucide-react'
import {Button} from '../ui/button.tsx'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card.tsx'
import {Tooltip, TooltipContent, TooltipTrigger} from '../ui/tooltip.tsx'
import React from 'react'

function CardItem({content, title}: {content: string; title: string}) {
  const [isHover, setIsHover] = React.useState(false)
  return (
    <Card
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="col-span-1 h-full cursor-default overflow-hidden hover:border-ring md:h-fit"
    >
      <CardHeader className="bg-monthly-background pb-3">
        <CardTitle className="flex items-start gap-2">
          <div className="flex h-[18px] w-[18px] items-center justify-center">
            {isHover ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="transparent"
                    className="h-5 w-5 [&:hover>svg]:fill-[#FFA500] [&:hover>svg]:text-[#FFA500]"
                  >
                    <Star size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Tambahkan ke halaman favorit</p>
                </TooltipContent>
              </Tooltip>
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

function ContentPreview({content}: {content: string | JSX.Element}) {
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
