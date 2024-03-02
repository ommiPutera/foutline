// import React from "react";

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
    type: 'MONTHLY_PLANNING',
    description:
      'Mulailah mencatat keuangan bulanan Anda dari halaman kosong dan perkirakan semua pemasukan dan pengeluaran. Dengan begitu, Anda akan memiliki gambaran yang lebih jelas untuk mengelola transaksi bulanan Anda.',
  },
  {
    title: 'Keuangan Pegawai',
    author: 'Foutline',
    imgSrc: '/templates/monthly-1.png',
    templateId: 'full_time_job',
    type: 'MONTHLY_PLANNING',
    description:
      'Kelola uang Anda dengan bijak, terutama jika Anda memiliki pekerjaan full-time. Tentukan anggaran pengeluaran Anda dengan cermat, dan catat setiap transfer pendapatan-biaya. Dengan langkah-langkah ini, Anda akan memiliki pemahaman yang lebih baik tentang setiap sen uang Anda.',
  },
  {
    title: 'Keuangan Freelancer',
    author: 'Foutline',
    imgSrc: '/templates/monthly-1.png',
    templateId: 'full_time_job',
    type: 'MONTHLY_PLANNING',
    description:
      'Manajemen finansial yang cerdas sangat krusial, terutama bagi para freelancer. Tetapkan anggaran pengeluaran secara detail, dan catat setiap transaksi pemasukan dan biaya. Dengan pendekatan ini, Anda akan mendapatkan pemahaman yang lebih mendalam tentang setiap aspek keuangan Anda.',
  },
]

function PageIndex() {
  const fetcher = useFetcher()

  return (
    <div className="px-3.5 py-6">
      <div className="mx-auto max-w-screen-md">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Keuangan Bulanan</h2>
          <div className="flex gap-2">
            <Button disabled variant="secondary" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Tooltip>
              <TooltipTrigger asChild>
                <ButtonLink
                  href="/note/templates"
                  variant="secondary"
                  size="icon"
                >
                  <ChevronRight className="h-4 w-4" />
                </ButtonLink>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Catatan</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col gap-8">
          <div className="flex max-w-xs flex-col gap-2">
            <h3 className="text-2xl font-bold leading-tight tracking-wide">
              Template Keuangan Bulanan
            </h3>
            <p className="text-muted-foreground text-sm">
              Rancang anggaran, lacak pengeluaran, dan tetapkan tujuan keuangan
              bulanan, semuanya di satu tempat yang terorganisir.
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
