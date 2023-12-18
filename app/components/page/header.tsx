import { PageIcon } from '../board/card-item.tsx'
import { Button } from '../ui/button.tsx'

function Header() {
  return (
    <div className="flex h-9 items-center justify-between">
      <div className="flex items-center gap-2">
        <PageIcon />
        <h4 className="text-sm font-medium">Keuangan bulanan</h4>
      </div>
      <div className='ml-3 flex flex-1 justify-end gap-3'>
        <Button size="sm" variant="transparent">Cancel</Button>
        <Button size="sm">Save</Button>
      </div>
    </div>
  )
}

export { Header }
