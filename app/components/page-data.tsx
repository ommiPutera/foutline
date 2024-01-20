import LabelButton from './board/label-button.tsx'
import {Button} from './ui/button.tsx'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select.tsx'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet.tsx'

function PageData({children}: {children: React.ReactNode}) {
  return (
    <div>
      <div className="bg-background fixed inset-x-0 bottom-0 flex w-full justify-between gap-2 border-t px-3 md:hidden">
        <div className="border-border flex-1 border-r py-3 pb-12">
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
      <SheetContent side="bottom" className="h-3/4">
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
    <div className="lg:min-w-[250px] lg:max-w-[250px]">
      <div className="mt-0.5 flex flex-col items-start justify-start gap-4">
        <div className="flex gap-2">
          <LabelButton />
        </div>
        <div className="flex h-9 w-full items-center justify-between gap-1">
          <span className="flex w-24 items-center text-xs">Status</span>
          <Select defaultValue="not-started">
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
          <span className="flex w-24 items-center text-xs">Dibuat</span>
          <div className="text-accent-foreground w-full px-3 text-xs">
            17 Desember 2023 21.42
          </div>
        </div>
        <div className="flex h-9 w-full items-center justify-between gap-1">
          <span className="flex w-24 items-center text-xs">Diedit</span>
          <div className="text-accent-foreground w-full px-3 text-xs">
            17 Desember 2023 21.42
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageData
