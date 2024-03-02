import {type Post} from '@prisma/client'
import {useFetcher} from '@remix-run/react'
import {ChevronLeft, ChevronRight} from 'lucide-react'

import DetailTemplate from '~/components/dialogs/detail-template.tsx'
import {Button, ButtonLink} from '~/components/ui/button.tsx'
import {Separator} from '~/components/ui/separator.tsx'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~/components/ui/tooltip.tsx'

type CardProps = {
  title: string
  author: string
  imgSrc: string
  description: string
  templateId: string
} & Pick<Post, 'type'>

const templates: CardProps[] = [
  {
    title: 'Halaman Kosong',
    author: 'Foutline',
    imgSrc: '/templates/monthly-1.png',
    templateId: 't_empty',
    type: 'BASIC_NOTES',
    description:
      'Mulailah mencatat semua aspek kebiasaan dan pikiran Anda. Dengan cara ini, Anda dapat lebih memahami pola pikiran yang memengaruhi kebiasaan sehari-hari dan meningkatkan kesadaran mental Anda.',
  },
]

function PageIndex() {
  const fetcher = useFetcher()

  return (
    <div className="px-3.5 py-6">
      <div className="mx-auto max-w-screen-md">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Catatan</h2>
          <div className="flex gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <ButtonLink
                  href="/monthly/templates"
                  variant="secondary"
                  size="icon"
                >
                  <ChevronLeft className="h-4 w-4" />
                </ButtonLink>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Keuangan Bulanan</p>
              </TooltipContent>
            </Tooltip>
            <Button disabled variant="secondary" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col gap-8">
          <div className="flex max-w-xs flex-col gap-2">
            <h3 className="text-2xl font-bold leading-tight tracking-wide">
              Template Catatan Pribadi Anda
            </h3>
            <p className="text-muted-foreground text-sm">
              Lacak tujuan, kebiasaan, dan rutinitas harian Anda. Buatlah
              jurnal, atur pengingat, dan pantau kemajuan untuk mencapai diri
              terbaik Anda!
            </p>
          </div>
          <fetcher.Form method="POST">
            <div className="mb-32 grid grid-cols-1 gap-6 md:grid-cols-2">
              {templates.map(props => (
                <Card key={props.title} {...props} />
              ))}
            </div>
          </fetcher.Form>
        </div>
      </div>
    </div>
  )
}

function Card(props: CardProps) {
  const {title, author, imgSrc, templateId} = props

  const fetcher = useFetcher()

  const handleSubmit = () => {
    fetcher.submit(
      {
        templateId: templateId,
      },
      {method: 'POST', action: '.'},
    )
  }

  return (
    <DetailTemplate
      {...props}
      onSubmit={handleSubmit}
      isPending={fetcher.state !== 'idle'}
    >
      <Button asChild variant="transparent" className="!h-full w-full !p-0">
        <div className="flex flex-col gap-3">
          <img
            src={imgSrc}
            alt=""
            className="w-full cursor-pointer rounded-lg border object-cover p-0 hover:opacity-70 dark:hover:opacity-90"
          />
          <div className="flex w-full items-start justify-between px-3">
            <div className="w-full text-left">
              <p className="text-sm">{title}</p>
              <p className="text-muted-foreground text-xs font-normal">
                {author}
              </p>
            </div>
            <p className="text-muted-foreground text-xs">Gratis</p>
          </div>
        </div>
      </Button>
    </DetailTemplate>
  )
}

export {PageIndex}
