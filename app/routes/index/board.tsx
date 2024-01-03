import { Info, LayoutGrid, List, Plus, WalletCards } from 'lucide-react'
import CardItem from '~/components/board/card-item.tsx'
import FilterButton from '~/components/board/filter-button.tsx'
import SortButton from '~/components/board/sort-button.tsx'
import { CreatePostDialog } from '~/components/templates/dialogs.tsx'
import { Button, ButtonLink } from '~/components/ui/button.tsx'
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip.tsx'

function Board() {
  return (
    <div className="flex min-h-screen py-6 md:gap-4">
      <div className="flex w-full flex-col gap-4 md:gap-3 md:border-r md:pr-4">
        <Tools />
        <Cards />
      </div>
      <div className="hidden md:block md:min-w-[140px] md:max-w-[140px] lg:min-w-[240px] lg:max-w-[240px]">
        <div className="relative flex h-full flex-col justify-between gap-6">
          <div className='flex flex-col gap-3'>
            <div className='flex items-center text-xs font-semibold'>
              Kantong
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="transparent" size="icon">
                    <Info className='h-4 w-4 fill-blue-500 text-white' />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Buat halaman baru</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className='flex flex-col gap-4'>
              <ButtonLink
                asChild
                variant="transparent"
                to='/'
                className='overflow-hidden border border-input bg-muted px-3.5 py-7'
              >
                <div className='flex w-full items-center gap-4'>
                  <div className='flex w-full flex-col gap-1'>
                    <h5 className='text-[11px] text-muted-foreground'>Bank Mandiri</h5>
                    <p className='text-xs font-medium'>Rp. 3,690,000</p>
                  </div>
                  <img src="/logos/bank_mandiri.png" alt="" width="34px" height="auto" />
                </div>
              </ButtonLink>
              <div className='flex flex-col gap-2'>
                <CreatePostDialog withoutTooltip>
                  <Button size="sm" asChild className="flex w-full items-center gap-2">
                    Atur kantong
                  </Button>
                </CreatePostDialog>
                <CreatePostDialog withoutTooltip>
                  <Button
                    variant="ghost"
                    asChild
                    size="sm"
                    className="flex w-full items-center gap-2"
                  >
                    <span>
                      <WalletCards size={16} />
                      Buat kantong
                    </span>
                  </Button>
                </CreatePostDialog>
              </div>
            </div>
          </div>
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
          <Button size="sm" asChild className="flex w-full items-center gap-2">
            <span>
              <Plus size={16} />
              Halaman baru
            </span>
          </Button>
        </CreatePostDialog>
      </div>
    </div>
  )
}

function Cards() {
  return (
    <div className='grid grid-cols-2 gap-3 lg:grid-cols-4 xl:grid-cols-5'>
      <CardItem
        order={1}
        title="1 Desember 2023"
        content="asdsdasda ss sdasdasd ascascascsac asddds ascss ssssdca ascsss sascc ascascascs asca ass ss sssssa dsss ascascas as112 asscsmmms"
      />
      <CardItem
        order={2}
        title="2 Point - poitn diskusi tentang Outline"
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
    </div>
  )
}

export default Board
