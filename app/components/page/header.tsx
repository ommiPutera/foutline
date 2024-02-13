import {PageIcon} from '~/routes/home/card-item.tsx'
import {Button} from '../ui/button.tsx'

function Header({children}: {children: React.ReactNode}) {
  return (
    <div className="flex max-h-9 items-center justify-between">
      <div className="flex items-center gap-2">
        <PageIcon />
        <h4 className="text-sm font-medium">Keuangan bulanan</h4>
      </div>
      <div className="ml-3 flex flex-1 justify-end gap-3">
        <div className="flex items-center gap-3">
          <Button size="sm" variant="transparent">
            Cancel
          </Button>
          {children}
        </div>
      </div>
    </div>
  )
}

export {Header}
