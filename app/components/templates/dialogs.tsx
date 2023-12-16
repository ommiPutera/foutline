import {
  CalendarCheck2,
  Grid3X3,
  HeartHandshake,
  PenLine,
  ScrollText,
  ShoppingBag,
  Sparkles
} from "lucide-react";
import { Button } from "../ui/button.tsx";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger
} from "../ui/dialog.tsx";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group.tsx";
import { Toggle } from "../ui/toggle.tsx";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip.tsx";

function CreatePostDialog({ children, onTrigger }: { children: React.ReactNode } & { onTrigger?: () => void }) {
  return (
    <Dialog modal>
      <DialogTrigger asChild onClick={onTrigger}>
        {children}
      </DialogTrigger>
      <DialogPortal>
        <DialogContent className="h-full max-w-[580px] border border-muted md:h-fit">
          <DialogHeader>
            <DialogTitle>Buat halaman</DialogTitle>
            <div className="flex flex-col gap-4 py-4">
              <div className="flex w-full items-center gap-4">
                <Toggle className="flex h-full w-1/2 flex-1 flex-col items-start gap-4 rounded-md p-3 text-left data-[state=on]:border-slate-500">
                  <div className="flex h-7 w-7 items-center justify-center rounded-sm border border-slate-400 bg-gradient-to-br from-slate-500 to-slate-300">
                    <Grid3X3 className="h-5 w-5" color="#fff" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h4 className="text-sm font-semibold leading-none">Templates</h4>
                    <p className="text-xs font-normal leading-4 text-muted-foreground">Buat halaman dengan template yang telah disediakan</p>
                  </div>
                </Toggle>
                <Tooltip>
                  <TooltipTrigger className="h-full w-1/2">
                    <Toggle disabled className="flex h-full flex-1 flex-col items-start gap-4 rounded-md p-3 text-left data-[state=on]:border-teal-500">
                      <div className="flex h-7 w-7 items-center justify-center rounded-sm border border-teal-400 bg-gradient-to-br from-teal-500 to-teal-300">
                        <HeartHandshake className="h-5 w-5" color="#fff" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <h4 className="text-sm font-semibold leading-none">Komunitas</h4>
                        <p className="text-xs font-normal leading-4 text-muted-foreground">Buat halaman berdasarkan koleksi dari komunitas</p>
                      </div>
                    </Toggle>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <div className="flex items-center gap-1 text-xs">
                      <Sparkles size={14} />
                      Akan datang.
                    </div>
                  </TooltipContent>
                </Tooltip>
              </div>
              <ToggleGroup type="single" className="grid w-full grid-cols-1 gap-2 md:grid-cols-3">
                <ToggleGroupItem value="1" className="flex h-fit flex-1 items-center justify-start gap-2 rounded-md px-3 py-2 text-left data-[state=on]:border-blue-500">
                  <div className="flex h-5 w-5 items-center justify-center rounded-sm border border-blue-400 bg-gradient-to-tr from-blue-500 to-blue-300">
                    <PenLine className="h-3.5 w-3.5" color="#fff" />
                  </div>
                  <h4 className="text-xs font-medium leading-none">Catatan biasa</h4>
                </ToggleGroupItem>
                <ToggleGroupItem value="2" className="flex h-fit flex-1 items-center justify-start gap-2 rounded-md px-3 py-2 text-left data-[state=on]:border-orange-500">
                  <div className="flex h-5 w-5 items-center justify-center rounded-sm border border-orange-400 bg-gradient-to-tr from-orange-500 to-orange-300">
                    <ShoppingBag className="h-3.5 w-3.5" color="#fff" />
                  </div>
                  <h4 className="text-xs font-medium leading-none">Keuangan bulanan</h4>
                </ToggleGroupItem>
                <ToggleGroupItem value="3" className="flex h-fit flex-1 items-center justify-start gap-2 rounded-md px-3 py-2 text-left data-[state=on]:border-green-500">
                  <div className="flex h-5 w-5 items-center justify-center rounded-sm border border-green-400 bg-gradient-to-tr from-green-500 to-green-300">
                    <CalendarCheck2 className="h-3.5 w-3.5" color="#fff" />
                  </div>
                  <h4 className="text-xs font-medium leading-none">Tabungan rutin</h4>
                </ToggleGroupItem>
                <ToggleGroupItem value="4" className="flex h-fit flex-1 items-center justify-start gap-2 rounded-md px-3 py-2 text-left data-[state=on]:border-red-500">
                  <div className="flex h-5 w-5 items-center justify-center rounded-sm border border-red-400 bg-gradient-to-tr from-red-500 to-red-300">
                    <ScrollText className="h-3.5 w-3.5" color="#fff" />
                  </div>
                  <h4 className="text-xs font-medium leading-none">Hutang</h4>
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <DialogFooter className="flex w-full items-center justify-end gap-2 md:gap-0">
              <DialogClose asChild>
                <Button variant="transparent">Batalkan</Button>
              </DialogClose>
              <Button className="w-full md:w-fit">Buat</Button>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

export {
  CreatePostDialog
};
