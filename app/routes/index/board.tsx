import { Info, LayoutGrid, List, Plus } from 'lucide-react'
import CardItem from '~/components/board/card-item.tsx'
import FilterButton from '~/components/board/filter-button.tsx'
import SortButton from '~/components/board/sort-button.tsx'
import { useMediaQuery } from '~/components/hooks/use-media-query.ts'
import MasonryLayout from '~/components/masonry.tsx'
import { CreatePostDialog } from '~/components/templates/dialogs.tsx'
import { Button } from '~/components/ui/button.tsx'

function Board() {
  return (
    <div className="flex min-h-screen py-6 md:gap-4">
      <div className="flex w-full flex-col gap-4 md:gap-3 md:border-r md:pr-4">
        <Tools />
        <Cards />
      </div>
      <div className="hidden md:block md:min-w-[140px] md:max-w-[140px] lg:min-w-[240px] lg:max-w-[240px]">
        <div className="sticky flex items-center justify-between gap-2">
          <CreatePostDialog withoutTooltip>
            <Button size="sm" className="flex items-center gap-2">
              <Plus size={14} />
              Halaman baru
            </Button>
          </CreatePostDialog>
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
    <div className="flex items-center justify-between bg-background">
      <div className="hidden md:flex md:items-center md:gap-1">
        <Button size="icon" variant="ghost">
          <LayoutGrid size={16} />
        </Button>
        <Button size="icon" variant="ghost">
          <List size={16} />
        </Button>
      </div>
      <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
        <div className='flex items-center gap-2'>
          <FilterButton />
          <SortButton />
        </div>
        <CreatePostDialog withoutTooltip>
          <Button size="sm" className="flex items-center gap-2 md:hidden">
            <Plus size={14} />
            Halaman baru
          </Button>
        </CreatePostDialog>
      </div>
    </div>
  )
}

function Cards() {
  const md = useMediaQuery('(min-width: 425px)')
  const lg = useMediaQuery('(min-width: 1024px)')
  const xl = useMediaQuery('(min-width: 1440px)')
  const xl2 = useMediaQuery('(min-width: 1540px)')

  const getColumns = () => {
    if (xl2) return 5
    if (xl) return 4
    if (lg) return 3
    if (md) return 3
    return 2
  }

  return (
    <MasonryLayout columns={getColumns()}>
      <CardItem
        order={1}
        title="1 Desember 2023"
        content="asdsdasda ss sdasdasd ascascascsac asddds ascss ssssdca ascsss sascc ascascascs asca ass ss sssssa dsss ascascas as112 asscsmmms"
      />
      <CardItem
        order={2}
        title="2 Point - poitn diskusi tentang Omition"
        content="ascs"
      />
      <CardItem
        order={3}
        title="3 November 2023"
        content="asdsdasda ss sdasdasd ascascascsac sss ascascasc kkks asddds ascss ssssdca asc"
      />
      <CardItem
        order={4}
        title="4 September 2023"
        content="asdsdasda ss sdasdasd ascascascsac asddds ascss ssssdca ascsss sascc ascascascs asca ass ss sssssa dsss ascascas as112 asscsmmms"
      />
      <CardItem order={5} title="5 Mei 2023" content="ascs" />
      <CardItem
        order={6}
        title="6 November 2023"
        content="asdsdasda ss sdasdasd ascascascsac sss ascascasc kkks asddds ascss ssssdca asc"
      />
      <CardItem
        order={7}
        title="7 September 2023"
        content="asdsdasda ss sdasdasd ascascascsac sss ascascasc kkks asddds ascss ssssdca asc"
      />
      <CardItem
        order={4}
        title="4 September 2023"
        content="asdsdasda ss sdasdasd ascascascsac asddds ascss ssssdca ascsss sascc ascascascs asca ass ss sssssa dsss ascascas as112 asscsmmms"
      />
      <CardItem
        order={8}
        title="8 Mei 2023"
        content="asdsdasda ss sdasdasd ascascascsac sss ascascasc kkks asddds ascss ssssdca asc"
      />
      <CardItem
        order={9}
        title="9 November 2023"
        content="asdsdasda ss sdasdasd ascascascsac sss ascascasc kkks asddds ascss ssssdca asc"
      />
      <CardItem
        order={10}
        title="10 September 2023"
        content="ascsss ssssa kklm asklaso1 askln1"
      />
      <CardItem
        order={4}
        title="4 September 2023"
        content="asdsdasda ss sdasdasd ascascascsac asddds ascss ssssdca ascsss sascc ascascascs asca ass ss sssssa dsss ascascas as112 asscsmmms"
      />
      <CardItem order={11} title="11 Mei 2023" content="ascs" />
      <CardItem order={11} title="11 Mei 2023" content="ascs" />
      <CardItem
        order={6}
        title="6 November 2023"
        content="asdsdasda ss sdasdasd ascascascsac sss ascascasc kkks asddds ascss ssssdca asc"
      />
      <CardItem
        order={7}
        title="7 September 2023"
        content="asdsdasda ss sdasdasd ascascascsac sss ascascasc kkks asddds ascss ssssdca asc"
      />
      <CardItem order={11} title="11 Mei 2023" content="ascs" />
      <CardItem
        order={4}
        title="4 September 2023"
        content="asdsdasda ss sdasdasd ascascascsac asddds ascss ssssdca ascsss sascc ascascascs asca ass ss sssssa dsss ascascas as112 asscsmmms"
      />
    </MasonryLayout>
  )
}

export default Board
