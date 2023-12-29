import React from "react"
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group.tsx"

function PocketGroup() {
  const [value, setValue] = React.useState('')
  return (
    <ToggleGroup
      type="single"
      onValueChange={(v) => setValue(v)}
      className="grid grid-cols-2 gap-3"
    >
      <PocketItem value="123" />
      <PocketItem value="2" />
      <PocketItem value="3" />
    </ToggleGroup>
  )
}

function PocketItem({ value }: { value: string }) {
  return (
    <ToggleGroupItem value={value} className="w-full px-4 py-8">
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

export { PocketGroup, PocketItem }