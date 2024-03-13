import {type MetaFunction} from '@remix-run/node'

import {Avatar, AvatarFallback, AvatarImage} from '~/components/ui/avatar.tsx'
import {Input} from '~/components/ui/input.tsx'
import {Label} from '~/components/ui/label.tsx'
import {Separator} from '~/components/ui/separator.tsx'

import {useRootLoader} from '~/utils/use-root-loader.tsx'

export const meta: MetaFunction = ({data}) => {
  return [{title: 'Pusat Akun | Foutline'}]
}

function Billing() {
  return (
    <div className="py-6">
      <div className="flex max-w-screen-sm flex-col gap-6">
        <h2 className="text-lg font-bold">Pusat Akun</h2>
        <div>
          <Profile />
        </div>
      </div>
    </div>
  )
}

function Profile() {
  const {profile} = useRootLoader()

  if (!profile) return <></>
  return (
    <div className="">
      <div className="flex items-center gap-6">
        <Avatar className="h-14 w-14">
          <AvatarImage src={profile?.picture ?? ''} alt={profile?.given_name} />
          <AvatarFallback>
            {profile?.given_name[0]?.toUpperCase()}
            {profile?.family_name[0]?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="line-clamp-1 text-base font-semibold leading-none">
          {profile.given_name + ' ' + profile.family_name}
        </div>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="p1-email">Email</Label>
          <Input defaultValue={profile.email} disabled id="p1-email" />
        </div>
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="flex w-full flex-col gap-2">
            <Label htmlFor="p1-first-name">Nama Depan</Label>
            <Input
              defaultValue={profile.given_name}
              disabled
              id="p1-first-name"
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <Label htmlFor="p1-last-name">Nama Belakang</Label>
            <Input
              defaultValue={profile.family_name}
              disabled
              id="p1-last-name"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Billing
