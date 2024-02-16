import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select.tsx'
import {Separator} from '~/components/ui/separator.tsx'
import {Theme, getSystemTheme, useTheme} from '~/utils/theme-provider.tsx'
import {useRootLoader} from '~/utils/use-root-loader.tsx'

function Settings() {
  return (
    <div className="border-border mx-auto max-w-screen-md rounded-xl border bg-white p-4 dark:bg-black/90">
      <h2 className="text-lg font-medium">Pengaturan</h2>
      <Separator className="my-4" />
      <ThemeSetting />
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
      <div className="flex flex-col gap-0.5">
        <h3 className="text-sm font-medium">{title}</h3>
        <p className="text-muted-foreground text-xs">{description}</p>
      </div>
      <div className="w-fit">{children}</div>
    </div>
  )
}

export default Settings
