import { Button } from './ui/button.tsx'
import { Laptop, MoonStar, Sun } from 'lucide-react'
import { Theme, getSystemTheme, useTheme } from '~/utils/theme-provider.tsx'
import { cn } from '~/lib/utils.ts'

function ToggleTheme({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const [, setTheme] = useTheme()
  const systemTheme = getSystemTheme()

  return (
    <div className={cn('flex gap-4 p-2 w-fit rounded-md border', className)}>
      <Button
        size="icon-sm"
        variant="ghost"
        className="w-full"
        onClick={() => setTheme(Theme.LIGHT)}
      >
        <Sun size="16" className="text-foreground" />
      </Button>
      <Button
        size="icon-sm"
        variant="ghost"
        className="w-full"
        onClick={() => setTheme(Theme.DARK)}
      >
        <MoonStar size="16" />
      </Button>
      <Button
        size="icon-sm"
        variant="ghost"
        className="w-full"
        onClick={() => setTheme(systemTheme)}
      >
        <Laptop size="16" />
      </Button>
    </div>
  )
}

export { ToggleTheme }
