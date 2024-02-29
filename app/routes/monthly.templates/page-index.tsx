// import React from "react";

import {useFetcher} from '@remix-run/react'

import DetailTemplate from '~/components/dialogs/detail-template.tsx'
import {Button} from '~/components/ui/button.tsx'
import {Separator} from '~/components/ui/separator.tsx'

type CardProps = {
  title: string
  author: string
  imgSrc: string
  description: string
  templateId: string
}

const templates: CardProps[] = [
  {
    title: 'Halaman Kosong',
    author: 'Foutline',
    imgSrc: '/templates/monthly-1.png',
    templateId: 'temp1',
    description:
      'Mulailah mencatat keuangan bulanan Anda dari halaman kosong dan perkirakan semua pemasukan dan pengeluaran. Dengan begitu, Anda akan memiliki gambaran yang lebih jelas untuk mengelola transaksi bulanan Anda.',
  },
]

function PageIndex() {
  const fetcher = useFetcher()

  return (
    <div className="px-3.5 py-4">
      <div className="mx-auto max-w-screen-lg">
        <h2 className="text-base font-semibold">Keuangan Bulanan</h2>
        <Separator className="my-8" />
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
            <div className="mb-32 grid grid-cols-2 gap-6">
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
      isPending={fetcher.state === 'loading'}
    >
      <Button asChild variant="transparent" className="!h-full w-full !p-0">
        <div className="flex flex-col gap-3">
          <img
            src={imgSrc}
            alt=""
            className="w-full cursor-pointer rounded-xl border object-cover p-0 hover:opacity-70 dark:hover:opacity-90"
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
