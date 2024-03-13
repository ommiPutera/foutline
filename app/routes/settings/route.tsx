import {Outlet, useLocation} from '@remix-run/react'

import {GeneralErrorBoundary} from '~/components/error-boundry.tsx'
import {ErrorPage} from '~/components/errors.tsx'
import {NavItem} from '~/components/sidebar.tsx'

function Settings() {
  return (
    <div className="">
      <div className="border-border fixed left-[var(--sidebar-width)] hidden h-full w-full max-w-[var(--sidebar-width)] border-r px-3.5 py-6 md:block">
        <div className="flex flex-col gap-4">
          <div className="ml-5">
            <h4 className="text-xl font-bold">Pengaturan</h4>
          </div>
          <div className="flex flex-1 flex-col place-content-end py-2">
            <NavItem
              iconName="CircleUser"
              title="Pusat Akun"
              href="/settings/account"
            />
            <NavItem
              iconName="Infinity"
              title="Tagihan - Go Unlimited"
              href="/settings/billing"
            />
            <NavItem
              href="/settings"
              iconName="Settings2"
              title="Preferensi Pengguna"
            />
            <NavItem iconName="Trash2" title="Hapus Akun" disabled />
          </div>
        </div>
      </div>
      <div className="relative h-full w-full md:ml-auto md:w-[calc(100%_-_var(--sidebar-width))]">
        <div className="mx-auto mt-[var(--header-height)] max-w-screen-2xl px-8 md:mt-0">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export function ErrorBoundary() {
  const location = useLocation()
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        404: () => (
          <ErrorPage
            title="404 - Terjadi kesalahan"
            subtitle={`"${location.pathname}" bukanlah sebuah halaman di outline.com`}
          />
        ),
      }}
    />
  )
}

export default Settings
