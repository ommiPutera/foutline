import { Info, LayoutGrid, List, Plus } from 'lucide-react'
import CardItem from '~/components/board/card-item.tsx'
import FilterButton from '~/components/board/filter-button.tsx'
import SortButton from '~/components/board/sort-button.tsx'
import { Button } from '~/components/ui/button.tsx'

function Board() {
  return (
    <div className="flex h-full min-h-screen py-6 md:gap-3 lg:gap-6">
      <div className="flex w-full flex-col gap-6 md:border-r md:pr-3 lg:pr-6">
        <Tools />
        <Cards />
      </div>
      <div className="hidden md:block md:min-w-[140px] md:max-w-[140px] lg:min-w-[220px] lg:max-w-[220px]">
        <div className="flex items-center justify-between">
          <Button className="flex items-center gap-2">
            <Plus size={16} />
            Halaman baru
          </Button>
          <Button size="icon" variant="transparent">
            <Info size={18} />
          </Button>
        </div>
      </div>
    </div>
  )
}

function Tools() {
  return (
    <div className="flex items-center justify-between">
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
    <div className="grid w-full grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-2.5 xl:grid-cols-4 2xl:grid-cols-5">
      <CardItem
        title="Desember 2023"
        content="asdsdasda ss sdasdasd ascascascsac asddds ascss ssssdca ascsss sascc ascascascs asca ass ss sssssa dsss ascascas as112 asscsmmms"
      />
      <CardItem title="Point - poitn diskusi tentang Omition" content="ascs" />
      <CardItem
        title="November 2023"
        content="asdsdasda ss sdasdasd ascascascsac sss ascascasc kkks asddds ascss ssssdca asc"
      />
      <CardItem
        title="September 2023"
        content="ascsss ssssa kklm asklaso1 askln1"
      />
      <CardItem title="Mei 2023" content="ascs" />
      <CardItem
        title="November 2023"
        content="asdsdasda ss sdasdasd ascascascsac sss ascascasc kkks asddds ascss ssssdca asc"
      />
      <CardItem
        title="September 2023"
        content="ascsss ssssa kklm asklaso1 askln1"
      />
      <CardItem title="Mei 2023" content="ascs" />
      <CardItem
        title="November 2023"
        content="asdsdasda ss sdasdasd ascascascsac sss ascascasc kkks asddds ascss ssssdca asc"
      />
      <CardItem
        title="September 2023"
        content="ascsss ssssa kklm asklaso1 askln1"
      />
      <CardItem title="Mei 2023" content="ascs" />
    </div>
  )
}

export default Board
