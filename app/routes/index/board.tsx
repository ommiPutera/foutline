import { MoreHorizontal } from "lucide-react"
import { Button } from "~/components/ui/button.tsx"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card.tsx"

function Board() {
  return (
    <div className="h-full min-h-screen flex gap-6 py-6">
      <div className="w-full lg:border-r lg:pr-6">
        <Cards />
      </div>
      <div className="hidden lg:block max-w-[200px] min-w-[200px]">
        <div className="flex items-center justify-between">
          <Button>
            Halaman baru
          </Button>
          <Button size="icon" variant="ghost">
            <MoreHorizontal />
          </Button>
        </div>
      </div>
    </div>
  )
}

function Cards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full gap-4">
      <CardItem />
      <CardItem />
      <CardItem />
      <CardItem />
    </div>
  )
}

function CardItem() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  )
}

export default Board