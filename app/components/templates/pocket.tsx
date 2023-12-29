import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group.tsx"

function PocketGroup({
  onChange,
  onClose
}: {
  onChange: (value: string) => void,
  onClose: () => void
}) {
  return (
    <ToggleGroup
      type="single"
      onValueChange={(v) => {
        onChange(v)
        onClose()
      }}
      className="grid grid-cols-2 gap-3"
    >
      <ToggleItem value="MANDIRI" />
      <ToggleItem value="BNI" />
      <ToggleItem value="BCA" />
    </ToggleGroup>
  )
}

function ToggleItem({ value }: { value: string }) {
  return (
    <ToggleGroupItem
      value={value}
      className="w-full px-4 py-8"
    >
      <div className='flex w-full items-center gap-4'>
        <div className='flex w-full flex-col gap-1 text-left'>
          <h5 className='text-xs text-muted-foreground'>Bank Mandiri</h5>
          <p className='text-sm font-medium'>Rp. 3,690,000</p>
        </div>
        <img src="/logos/bank_mandiri.png" alt="" width="52px" height="auto" />
      </div>
    </ToggleGroupItem>
  )
}

function PocketItem() {
  return (
    <div className='flex w-full items-center gap-4'>
      <div className='flex w-full flex-col gap-1 text-left'>
        <h5 className='text-xs text-muted-foreground'>Bank Mandiri</h5>
        <p className='text-sm font-medium'>Rp. 3,690,000</p>
      </div>
      <img src="/logos/bank_mandiri.png" alt="" width="52px" height="auto" />
    </div>
  )
}

export { PocketGroup, ToggleItem, PocketItem }