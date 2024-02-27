import { rupiah } from '~/utils/currency.ts'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group.tsx'
import type { PocketsValues } from '~/routes/monthly/$id/route.tsx'

function PocketGroup({
  onChange,
  onClose,
  dataset,
}: {
  onChange: (value: string) => void
  onClose: () => void
  dataset: PocketsValues[]
}) {
  return (
    <ToggleGroup
      type="single"
      onValueChange={v => {
        onChange(v)
        onClose()
      }}
      className="grid grid-cols-1 gap-3 md:grid-cols-2"
    >
      {dataset.map(pocket => (
        <ToggleItem
          key={pocket.name}
          value={pocket.name}
          nominal={pocket.nominal}
        />
      ))}
    </ToggleGroup>
  )
}

function ToggleItem({ value, nominal }: { value: string; nominal: number }) {
  return (
    <ToggleGroupItem value={value} className="w-full px-4 py-8">
      <div className="flex w-full items-center gap-4">
        <div className="flex w-full flex-col gap-1 text-left">
          <h5 className="text-muted-foreground text-xs">{value}</h5>
          <p className="text-xs font-medium">{rupiah(nominal)}</p>
        </div>
        <img src="/logos/bank_mandiri.png" alt="" width="52px" height="auto" />
      </div>
    </ToggleGroupItem>
  )
}

function PocketItem({ name, nominal }: { name: string; nominal: number }) {
  return (
    <div className="flex w-full items-center gap-4">
      <div className="flex w-full flex-col gap-1 text-left">
        <h5 className="text-muted-foreground text-xs">{name}</h5>
        <p className="text-xs font-medium">{rupiah(nominal)}</p>
      </div>
      <img src="/logos/bank_mandiri.png" alt="" width="52px" height="auto" />
    </div>
  )
}

export { PocketGroup, ToggleItem, PocketItem }
