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

function Template() {
  return (
    <div className="border-border mx-auto max-w-screen-md rounded-xl border bg-white p-4 dark:bg-zinc-900">
      <h2 className="text-lg font-medium">Jelajahi</h2>
      <Separator className="my-4" />
    </div>
  )
}

export default Template
