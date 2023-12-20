import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu.tsx'
import { Button } from '../ui/button.tsx'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select.tsx'
function FilterButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative flex gap-1">
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-1 w-64" align="center" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-xs font-medium leading-none text-muted-foreground">
              Filter berdasarkan
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex items-center justify-between gap-1 p-2">
          <span className="text-xs">Halaman</span>
          <Select>
            <SelectTrigger className="w-[160px]">
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
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default FilterButton
