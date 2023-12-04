import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar.tsx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu.tsx'
import { Button } from './ui/button.tsx'
import type { UserType } from '@kinde-oss/kinde-typescript-sdk'
import { Link } from '@remix-run/react'
import { LogOut, Settings } from 'lucide-react'
import { ToggleTheme } from './footer.tsx'

export function UserNav({
  family_name,
  given_name,
  email,
  picture, // @ts-ignore
}: JsonifyObject<UserType> | undefined) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex cursor-pointer items-center gap-3">
          <Button variant="ghost" size="icon" className="relative rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={picture ?? ''} alt="@shadcn" />
              <AvatarFallback>
                {given_name[0].toUpperCase()}
                {family_name[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
          <div className="flex max-w-[100px] flex-col space-y-1 overflow-hidden">
            <div className="line-clamp-1 text-xs leading-none text-muted-foreground">
              Masuk sebagai
            </div>
            <div className="line-clamp-1 text-xs font-medium leading-none">
              {given_name + ' ' + family_name}
            </div>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-1 w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {given_name + ' ' + family_name}
            </p>
            <p className="truncate text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <ToggleTheme className="w-full" />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to="/">
            <DropdownMenuItem>
              <Settings size="16" className="mr-3" />
              <span>Pengaturan</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Link to="/logout">
          <DropdownMenuItem vaiant="destructive">
            <LogOut size="16" className="mr-3" />
            <span>Keluar</span>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
