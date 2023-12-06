import { CalculatorIcon, MoreHorizontal } from "lucide-react"
import { Button } from "~/components/ui/button.tsx"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card.tsx"

function Board() {
  return (
    <div className="h-full min-h-screen flex gap-6 py-6">
      <div className="w-full lg:border-r lg:pr-6">
        <Cards />
      </div>
      <div className="hidden lg:block max-w-[260px] min-w-[260px]">
        <div className="flex items-center justify-between">
          <Button>
            Halaman baru
          </Button>
          <Button size="icon" variant="ghost">
            <MoreHorizontal size={18} />
          </Button>
        </div>
      </div>
    </div>
  )
}

function Cards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-full gap-3 lg:gap-4">
      <CardItem content="asdsdasda ss sdasdasd ascascascsac asddds ascss ssssdca asc" />
      <CardItem content="ascs" />
    </div>
  )
}

function CardItem({ content }: { content: string }) {
  return (
    <Card className="col-span-1 overflow-hidden h-fit hover:border-ring cursor-default">
      <CardHeader className="bg-monthly-background">
        <CardTitle className="flex items-start gap-2.5">
          <div className="flex items-center justify-center">
            <CalculatorIcon size={16} />
          </div>
          <div className="text-xs -mt-[2px] font-semibold line-clamp-2">
            Tech Startup Pitch Deck Outline
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="bg-monthly-background relative pb-4">
        <p className="text-xs">{content}</p>
        <div className="absolute left-0 bottom-0 -mt-1 h-full w-full bg-gradient-to-t to-monthly-background/10 from-monthly-background/70"></div>
      </CardContent>
      <CardFooter className="gap-2 py-3 justify-between">
        <div className="text-muted-foreground text-[11px] leading-none line-clamp-1">Diedit 10 menit yang lalu</div>
        <div className="flex items-center">
          <Button size="icon-sm" variant="ghost" className="rounded-sm">
            <MoreHorizontal size={16} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default Board