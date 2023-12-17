import { ChevronDownCircle, Clock4, Info } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select.tsx"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip.tsx"
import { Button } from "./ui/button.tsx"
import { Textarea } from "./ui/textarea.tsx"

function PageData() {
  return (
    <div className="hidden md:block md:min-w-[140px] md:max-w-[140px] lg:min-w-[250px] lg:max-w-[250px]">
      <div className="flex flex-col items-start justify-start gap-4">
        <div className="flex h-9 w-full items-center justify-between gap-1">
          <span className="flex items-center text-xs">
            <ChevronDownCircle className='mr-1.5 h-3.5 w-3.5' />
            Halaman
          </span>
          <Select defaultValue='monthly'>
            <SelectTrigger className="w-[140px]" withoutIcon>
              <SelectValue placeholder="Pilih halaman" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="basic-notes">Catatan biasa</SelectItem>
              <SelectItem value="monthly">Keuangan bulanan</SelectItem>
              <SelectItem value="saving">Tabungan</SelectItem>
              <SelectItem value="debt">Hutang</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex h-9 w-full items-center justify-between gap-1">
          <span className="flex items-center text-xs">
            <ChevronDownCircle className='mr-1.5 h-3.5 w-3.5' />
            Status
          </span>
          <Select defaultValue='not-started'>
            <SelectTrigger className="w-[140px]" withoutIcon>
              <SelectValue placeholder="Pilih Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="underway">Sedang berjalan</SelectItem>
              <SelectItem value="completed">Selesai</SelectItem>
              <SelectItem value="not-started">Belum berjalan</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex h-9 w-full items-center justify-between gap-1">
          <span className="flex w-32 items-center text-xs">
            <Clock4 className='mr-1.5 h-3.5 w-3.5' />
            Dibuat
          </span>
          <div className='text-xs text-accent-foreground'>
            14 Desember 2023 18.00 WIB
          </div>
        </div>
        <div className="flex h-9 w-full items-center justify-between gap-1">
          <span className="flex w-32 items-center text-xs">
            <Clock4 className='mr-1.5 h-3.5 w-3.5' />
            Diedit
          </span>
          <div className='text-xs text-accent-foreground'>
            17 Desember 2023 21.42 WIB
          </div>
        </div>
        <div className='mt-6 flex w-full flex-col gap-2'>
          <div className='flex items-center gap-1 text-xs font-semibold'>
            Tidak ada komen
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
          <Textarea className='w-full' placeholder='Tinggalkan komen disini' />
        </div>
      </div>
    </div>
  )
}

export default PageData