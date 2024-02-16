import {Avatar, AvatarFallback, AvatarImage} from './ui/avatar.tsx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu.tsx'
import {Button} from './ui/button.tsx'
import type {UserType} from '@kinde-oss/kinde-typescript-sdk'
import {Link} from '@remix-run/react'
import {CircleUser, LogOut} from 'lucide-react'
import {ToggleTheme} from './toggle-theme.tsx'

export function UserNav({
  family_name,
  given_name,
  email,
  picture, // @ts-ignore
}: JsonifyObject<UserType> | undefined) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex cursor-pointer items-center gap-2">
          <Button variant="ghost" size="icon" className="relative rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={picture ?? ''} alt="@shadcn" />
              <AvatarFallback>
                {given_name[0].toUpperCase()}
                {family_name[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
          <div className="flex w-full flex-col space-y-1">
            <div className="text-muted-foreground line-clamp-1 overflow-visible text-[10px] leading-none">
              Masuk sebagai
            </div>
            <div className="line-clamp-1 text-xs font-medium leading-none">
              {given_name}
            </div>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-1 w-44" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-xs font-semibold leading-none">
              {given_name + ' ' + family_name}
            </p>
            <p className="text-muted-foreground truncate text-xs leading-none">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="block md:hidden" />
        <DropdownMenuItem className="block md:hidden">
          <ToggleTheme className="w-full" />
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <ToggleTheme className="w-full" />
        <DropdownMenuGroup>
          <Link to="/user/account" prefetch="intent">
            <DropdownMenuItem>
              <CircleUser className="mr-3 h-4 w-4" />
              <span>Akun anda</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Link to="/logout">
          <DropdownMenuItem vaiant="destructive" preventDefault>
            <LogOut className="mr-3 h-4 w-4" />
            <span>Keluar</span>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
