import React from 'react'

import {Avatar, AvatarFallback, AvatarImage} from './ui/avatar.tsx'
import {Button, ButtonLink} from './ui/button.tsx'
import {Popover, PopoverContent, PopoverTrigger} from './ui/popover.tsx'

import type {UserType} from '@kinde-oss/kinde-typescript-sdk'

import {LogOut, UserCircle} from 'lucide-react'

export function UserNav({
  family_name,
  given_name,
  email,
  picture, // @ts-ignore
}: JsonifyObject<UserType> | undefined) {
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    setIsOpen(false)
  }, [])

  return (
    <Popover onOpenChange={v => setIsOpen(!isOpen)} open={isOpen}>
      <div className="flex h-full">
        <PopoverTrigger asChild>
          <div className="my-2 flex cursor-pointer items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={picture ?? ''} alt={given_name} />
                <AvatarFallback>
                  {given_name[0].toUpperCase()}
                  {family_name[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
            <div className="flex w-full flex-col space-y-1">
              <div className="text-muted-foreground line-clamp-1 overflow-visible text-xs leading-none">
                Masuk sebagai
              </div>
              <div className="line-clamp-1 text-sm font-medium leading-none">
                {given_name + ' ' + family_name}
              </div>
            </div>
          </div>
        </PopoverTrigger>
      </div>
      <PopoverContent
        className="-ml-1 mb-3 h-fit w-[calc(var(--sidebar-width)_-_25px)] px-2 py-1"
        align="start"
        side="top"
        forceMount
      >
        <div className="mx-3 mb-4 mt-3 flex flex-col space-y-2">
          <p className="text-sm font-bold leading-none">
            {given_name + ' ' + family_name}
          </p>
          <p className="text-muted-foreground truncate text-sm leading-none">
            {email}
          </p>
        </div>
        <UserSettings />
        <Logout />
      </PopoverContent>
    </Popover>
  )
}

function UserSettings() {
  return (
    <div className="my-2">
      <Button
        variant="ghost"
        size="default"
        disabled
        className="w-full justify-start rounded-md px-3"
      >
        <UserCircle size="19" className="mr-3" />
        <span>Pusat Akun</span>
      </Button>
    </div>
  )
}

function Logout() {
  return (
    <div className="my-2">
      <ButtonLink
        variant="ghost"
        size="default"
        href="/logout"
        className="w-full justify-start rounded-md px-3"
      >
        <LogOut size="17" className="mr-3" />
        <span>Keluar</span>
      </ButtonLink>
    </div>
  )
}
