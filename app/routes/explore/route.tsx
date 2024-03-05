import {type MetaFunction} from '@remix-run/node'

import {icons} from 'lucide-react'

import {Button, ButtonLink} from '~/components/ui/button.tsx'
import {Separator} from '~/components/ui/separator.tsx'

import {cn} from '~/lib/utils.ts'

export const meta: MetaFunction = ({data}) => {
  return [{title: 'Jelajahi | Foutline'}]
}

function Explore() {
  return (
    <div className="px-3.5 py-6">
      <div className="mx-auto max-w-screen-md">
        <h2 className="text-lg font-bold">Jelajahi</h2>
        <Separator className="my-6" />
        <div className="flex flex-col gap-8">
          <div className="flex max-w-xs flex-col gap-2">
            <h3 className="text-2xl font-bold leading-tight tracking-wide">
              Foutline Templates
            </h3>
            <p className="text-muted-foreground text-sm">
              Buat halaman keuangan Anda dengan template yang telah disediakan
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card
              href="/monthly/templates"
              iconName="ArrowRightLeft"
              title="Keuangan Bulanan"
              description="Catat pengeluaran dan pemasukan Anda setiap bulan agar lebih teratur dan terkendali."
              className="bg-monthly-background [&>svg]:stroke-monthly"
            />
            <Card
              href="/note/templates"
              iconName="PencilLine"
              title="Catatan"
              description="Lacak kebiasaan, dan rutinitas harian Anda, sambil membuat jurnal, mengatur pengingat."
              className="bg-note-background [&>svg]:stroke-note"
            />
            <Card
              disabled
              iconName="CalendarCheck2"
              title="Tabungan Rutin"
              description="Untuk mencapai keuangan yang sehat, penting untuk membentuk kebiasaan menabung secara rutin."
              className="bg-green-100 [&>svg]:stroke-green-600"
            />
            <Card
              disabled
              iconName="ScrollText"
              title="Hutang"
              description="Merencanakan secara cermat dan membuat catatan hutang dapat mencapai kebebasan finansial"
              className="bg-red-100 [&>svg]:stroke-red-600"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function Card({
  href,
  iconName,
  title,
  description,
  className,
  disabled,
}: {
  href?: string
  iconName: keyof typeof icons
  title: string
  description: string
  className: React.HTMLProps<HTMLElement>['className']
  disabled?: boolean
}) {
  const Icon = icons[iconName]

  const Comp = href ? ButtonLink : Button

  return (
    <Comp
      disabled={disabled}
      href={href}
      variant="outline"
      className="border-border !h-full flex-col items-start gap-4 rounded-lg bg-white py-6 dark:bg-zinc-900"
    >
      <div
        className={cn(
          'flex h-12 w-12 items-center justify-center rounded-full',
          className,
        )}
      >
        <Icon className="h-5 w-5" strokeWidth={2.5} />
      </div>
      <div className="flex flex-col gap-1.5 text-left">
        <h3 className="text-base font-bold leading-tight">{title}</h3>
        <p className="text-muted-foreground whitespace-pre-wrap text-xs font-normal">
          {description}
        </p>
      </div>
    </Comp>
  )
}

export default Explore
