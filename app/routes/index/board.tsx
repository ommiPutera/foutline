import { LayoutGrid, List, MoreHorizontal } from "lucide-react"
import CardItem from "~/components/board/card-item.tsx"
import FilterButton from "~/components/board/filter-button.tsx"
import SortButton from "~/components/board/sort-button.tsx"
import { Button } from "~/components/ui/button.tsx"

function Board() {
  return (
    <div className="h-full min-h-screen flex md:gap-3 lg:gap-6 py-6">
      <div className="flex flex-col gap-6 w-full md:border-r md:pr-3 lg:pr-6">
        <Tools />
        <Cards />
      </div>
      <div className="hidden md:block md:max-w-[200px] md:min-w-[200px] lg:max-w-[260px] lg:min-w-[260px]">
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

function Tools() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-1">
        <Button size="icon" variant="ghost">
          <LayoutGrid size={16} />
        </Button>
        <Button size="icon" variant="ghost">
          <List size={16} />
        </Button>
      </div>
      <div className="flex items-center gap-1">
        <FilterButton />
        <SortButton />
      </div>
    </div>
  )
}

function Cards() {
  return (
    <div className="grid w-full gap-3 lg:gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      <CardItem
        title="Desember 2023"
        content="asdsdasda ss sdasdasd ascascascsac asddds ascss ssssdca ascsss sascc ascascascs asca ass ss sssssa dsss ascascas as112 asscsmmms"
      />
      <CardItem
        title="Point - poitn diskusi tentang Omition"
        content="ascs"
      />
      <CardItem
        title="November 2023"
        content="asdsdasda ss sdasdasd ascascascsac sss ascascasc kkks asddds ascss ssssdca asc"
      />
      <CardItem
        title="September 2023"
        content="ascsss ssssa kklm asklaso1 askln1"
      />
      <CardItem
        title="Mei 2023"
        content="ascs"
      />
    </div>
  )
}

export default Board