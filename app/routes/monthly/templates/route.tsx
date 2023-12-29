import React from "react"
import { PageIcon } from "~/components/board/card-item.tsx"
import { Button } from "~/components/ui/button.tsx"
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group.tsx"

function Templates() {
  const [value, setValue] = React.useState('')
  return (
    <div className="relative flex flex-col gap-12 px-4">
      <div className="flex flex-col items-start gap-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
          <PageIcon />
        </div>
        <div className="flex max-w-[480px] flex-col gap-2">
          <h3 className="text-2xl font-bold">Template Keuangan Bulanan</h3>
          <p className="text-sm text-muted-foreground">Template Cparibus yang lengkap memudahkan Anda mengendalikan keuangan Anda. Rancang anggaran, lacak pengeluaran, dan tetapkan tujuan penghematan, semuanya di satu tempat yang terorganisir.</p>
        </div>
      </div>
      <ToggleGroup
        type="single"
        className="grid grid-cols-3 gap-x-8 gap-y-12"
        onValueChange={(v) => setValue(v)}
        value={value}
      >
        <Card value="item-1" />
        <Card value="item-2" />
        <Card value="item-3" />
        <Card value="item-4" />
      </ToggleGroup>
      <div className="sticky bottom-0 mt-12 flex justify-between gap-3 border-t bg-white py-8">
        <div className="flex items-center gap-3">
          <Button size="sm" variant="secondary" onClick={() => console.log('woi')}>Mulai upload template anda</Button>
        </div>
        <div className="flex items-center gap-3">
          <Button size="sm" variant="transparent" onClick={() => setValue('')}>Batalkan</Button>
          <Button size="sm" onClick={() => console.log('woi')} disabled={!value}>Gunakan template</Button>
        </div>
      </div>
    </div>
  )
}

function Card({ value }: { value: string }) {
  return (
    <div className="group col-span-1 flex h-full cursor-pointer flex-col gap-3">
      <ToggleGroupItem value={value} className="h-full w-full p-6 hover:border-orange-200 hover:bg-transparent data-[state=on]:border-orange-500 data-[state=on]:bg-orange-100/50">
        <div className="w-full rounded-md border border-transparent">
          <div className="rounded-lg">
            <img src="/templates/monthly-1.png" alt="" className="w-full object-cover" />
          </div>
        </div>
      </ToggleGroupItem>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <PageIcon />
          <h5 className="text-base font-semibold">Keuangan sederhana dengan pembelian saham rutin</h5>
        </div>
        <div>
          <p className="text-sm text-primary/60 group-hover:text-primary">Tracking your expenses regularly can help you visualize where your money is going and eliminate any wasteful spending habits in your financial life.</p>
        </div>
      </div>
    </div>
  )
}

export default Templates