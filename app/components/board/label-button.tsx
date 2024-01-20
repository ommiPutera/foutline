import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu.tsx'
import {Button} from '../ui/button.tsx'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select.tsx'
import {Tag} from 'lucide-react'

function LabelButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="sm" className="relative flex gap-1">
          <Tag className="mr-1 h-4 w-4" />
          Label
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-1 w-48" align="center" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-muted-foreground text-xs font-medium leading-none">
              Filter berdasarkan
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex items-center justify-between gap-2 p-2">
          <span className="text-xs">Halaman</span>
          <Select>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Semuanya" />
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

export default LabelButton
