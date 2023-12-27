import { Button } from "./ui/button.tsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select.tsx"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet.tsx"

function PageData({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="fixed inset-x-0 bottom-0 flex w-full justify-between gap-2 border-t bg-background px-3 md:hidden">
        <div className="flex-1 border-r border-border py-3 pb-12">
          {children}
        </div>
        <div className="flex-1 py-3 pb-12">
          <PageMobile />
        </div>
      </div>
      <div className="hidden h-full xl:block xl:border-l xl:pl-4">
        <Page />
      </div>
    </div>
  )
}

function PageMobile() {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="transparent" size="default">
          Informasi halaman
        </Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="h-3/4"
      >
        <SheetHeader className="mb-8">
          <SheetTitle>Informasi halaman</SheetTitle>
        </SheetHeader>
        <Page />
      </SheetContent>
    </Sheet>
  )
}

function Page() {
  return (
    <div className="lg:min-w-[230px] lg:max-w-[230px]">
      <div className="flex flex-col items-start justify-start gap-2">
        <div className="flex h-9 w-full items-center justify-between gap-1">
          <span className="flex w-40 items-center text-xs">
            Halaman
          </span>
          <Select defaultValue='monthly'>
            <SelectTrigger className="w-full" withoutIcon>
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
          <span className="flex w-40 items-center text-xs">
            Status
          </span>
          <Select defaultValue='not-started'>
            <SelectTrigger className="w-full" withoutIcon>
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
          <span className="flex w-40 items-center text-xs">
            Dibuat
          </span>
          <div className='w-full px-3 text-xs text-accent-foreground'>
            17 Desember 2023 21.42 WIB
          </div>
        </div>
        <div className="flex h-9 w-full items-center justify-between gap-1">
          <span className="flex w-40 items-center text-xs">
            Diedit
          </span>
          <div className='w-full px-3 text-xs text-accent-foreground'>
            17 Desember 2023 21.42 WIB
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageData