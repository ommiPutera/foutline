import {icons} from 'lucide-react'
import {ButtonLink} from '~/components/ui/button.tsx'
import {Separator} from '~/components/ui/separator.tsx'
import {cn} from '~/lib/utils.ts'

function Explore() {
  return (
    <div className="px-3.5 py-4">
      <div className="mx-auto max-w-screen-lg">
        <h2 className="text-base font-semibold">Jelajahi</h2>
        <Separator className="my-8" />
        <div className="flex flex-col gap-8">
          <div className="flex max-w-xs flex-col gap-2">
            <h3 className="text-2xl font-bold leading-tight tracking-wide">
              Foutline Templates
            </h3>
            <p className="text-muted-foreground text-sm">
              Buat halaman keuangan anda dengan template yang telah disediakan
            </p>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <Card
              href="/monthly/templates"
              iconName="ArrowRightLeft"
              title="Keuangan Bulanan"
              description="Rencanakan dan kontrol pengeluaran - pemasukan anda rutin setiap bulan"
              className="bg-monthly-background [&>svg]:stroke-orange-500"
            />
            <Card
              href="/monthly/templates"
              iconName="ArrowRightLeft"
              title="Keuangan Bulanan"
              description="Rencanakan dan kontrol pengeluaran - pemasukan anda rutin setiap bulan"
              className="bg-monthly-background [&>svg]:stroke-orange-500"
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
}: {
  href: string
  iconName: keyof typeof icons
  title: string
  description: string
  className: React.HTMLProps<HTMLElement>['className']
}) {
  const Icon = icons[iconName]
  return (
    <ButtonLink
      href={href}
      variant="outline"
      className="!h-full flex-col items-start gap-4 rounded-lg bg-white py-6 dark:bg-zinc-900"
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
    </ButtonLink>
  )
}

export default Explore
