import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu.tsx'
import {Button} from '../ui/button.tsx'
import {Link} from '@remix-run/react'
function SortButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative flex gap-1">
          Urutkan
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-1 w-44" align="center" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-xs font-medium leading-none text-muted-foreground">
              Urutkan berdasarkan
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to="/">
            <DropdownMenuItem>
              <span>Waktu dibuat: Terbaru</span>
            </DropdownMenuItem>
          </Link>
          <Link to="/">
            <DropdownMenuItem>
              <span>Waktu dibuat: Terlama</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to="/">
            <DropdownMenuItem>
              <span>Judul: A-Z</span>
            </DropdownMenuItem>
          </Link>
          <Link to="/">
            <DropdownMenuItem>
              <span>Judul: Z-A</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SortButton
