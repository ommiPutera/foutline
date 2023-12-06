import { CalculatorIcon, MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button.tsx";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card.tsx";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip.tsx";

function CardItem({ content, title }: { content: string, title: string }) {
  return (
    <Card className="col-span-1 overflow-hidden h-full md:h-fit hover:border-ring cursor-default">
      <CardHeader className="bg-monthly-background pb-3">
        <CardTitle className="flex items-start gap-2.5">
          <div className="flex items-center justify-center">
            <CalculatorIcon size={18} />
          </div>
          <div className="text-xs font-semibold line-clamp-2">{title}</div>
        </CardTitle>
      </CardHeader>
      <CardContent className="bg-monthly-background relative pb-4">
        <ContentPreview content={content} />
        <div className="absolute left-0 bottom-0 -mt-1 h-full w-full bg-gradient-to-t to-monthly-background/10 from-monthly-background/70"></div>
      </CardContent>
      <CardFooter className="gap-2 py-2.5 justify-between">
        <div className="flex flex-col gap-1.5">
          <div className="text-[9px] rounded-sm leading-none line-clamp-1 bg-ring w-fit px-1 py-[3px] text-white">Selesai</div>
          <div className="text-muted-foreground text-[10px] leading-none line-clamp-1">Diedit 10 menit yang lalu</div>
        </div>
        <TooltipProvider delayDuration={50}>
          <Tooltip>
            <div className="flex h-full">
              <TooltipTrigger asChild>
                <Button size="icon-sm" variant="transparent" className="rounded-sm">
                  <MoreHorizontal size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Lainnya</p>
              </TooltipContent>
            </div>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  )
}

function ContentPreview({ content }: { content: string | JSX.Element }) {
  if (typeof content === 'string') return <div className="text-xs line-clamp-6">{content}</div>
  return (
    <div>
      <p className="text-xs">{content}</p>
    </div>
  )
}

export default CardItem;