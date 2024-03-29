import {type MetaFunction} from '@remix-run/node'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select.tsx'

import {Theme, getSystemTheme, useTheme} from '~/utils/theme-provider.tsx'
import {useRootLoader} from '~/utils/use-root-loader.tsx'

export const meta: MetaFunction = ({data}) => {
  return [{title: 'Preferensi Pengguna | Foutline'}]
}

function Settings() {
  return (
    <div className="py-6">
      <div className="flex max-w-screen-sm flex-col gap-6">
        <h2 className="text-lg font-bold">Preferensi Pengguna</h2>
        <div>
          <ThemeSetting />
        </div>
      </div>
    </div>
  )
}

function ThemeSetting() {
  const {requestInfo} = useRootLoader()
  const [theme, setTheme] = useTheme()

  const systemTheme = getSystemTheme()

  return (
    <Item
      title="Mode Tampilan"
      description="Sesuaikan tampilan warna Foutline di perangkat Anda"
    >
      <>
        <Select
          value={theme ?? requestInfo.session.theme}
          defaultValue={requestInfo.session.theme}
          onValueChange={value => {
            switch (value) {
              case Theme.LIGHT:
                setTheme(Theme.LIGHT)
                break
              case Theme.DARK:
                setTheme(Theme.DARK)
                break
              default:
                setTheme(systemTheme)
                break
            }
          }}
        >
          <SelectTrigger className="w-full font-medium" withoutIcon>
            <SelectValue />
          </SelectTrigger>
          <SelectContent side="right" align="center">
            <SelectItem value={Theme.LIGHT}>Light Mode</SelectItem>
            <SelectItem value={Theme.DARK}>Dark Mode</SelectItem>
            <SelectItem value="System">System Mode</SelectItem>
          </SelectContent>
        </Select>
      </>
    </Item>
  )
}

function Item({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-medium">{title}</h3>
        <p className="text-muted-foreground text-xs">{description}</p>
      </div>
      <div className="w-fit">{children}</div>
    </div>
  )
}

export default Settings
