import type {ActionFunction} from '@remix-run/node'
import {Form} from '@remix-run/react'
import React from 'react'

import {Button} from '~/components/ui/button.tsx'
import {ToggleGroup, ToggleGroupItem} from '~/components/ui/toggle-group.tsx'

import {createPost} from '~/utils/posts.server.ts'
import {getUser} from '~/utils/session.server.ts'

import {previewTemp1, previewTemp2, temp1, temp2} from './resource.tsx'
import {PageIcon} from '~/routes/home/card-item.tsx'

export const action: ActionFunction = async ({request}) => {
  const formData = await request.formData()

  const user = await getUser(request)
  if (!user) return {formError: 'invalid'}

  const {templateId} = Object.fromEntries(formData)

  if (typeof templateId !== 'string') {
    return {formError: `Form not submitted correctly.`}
  }

  let content
  let preview

  switch (templateId) {
    case 't_empty':
      content = temp1
      preview = previewTemp1
      break
    case 'temp2':
      content = temp2
      preview = previewTemp2
      break
  }

  return await createPost({
    title: 'tanpa judul',
    authorId: user.id,
    isPublished: true,
    content,
    preview,
    type: 'MONTHLY_PLANNING',
    redirectTo: '/monthly/',
  })
}

function Templates() {
  const [value, setValue] = React.useState('')

  return (
    <div className="relative flex flex-col gap-12 px-4">
      <div className="flex flex-col items-start gap-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
          <PageIcon />
        </div>
        <div className="flex max-w-[480px] flex-col gap-2">
          <h3 className="text-3xl font-bold">Template Keuangan Bulanan</h3>
          <p className="text-sm">
            Template Outline yang lengkap memudahkan Anda mengendalikan keuangan
            Anda. Rancang anggaran, lacak pengeluaran, dan tetapkan tujuan
            penghematan, semuanya di satu tempat yang terorganisir.
          </p>
        </div>
      </div>
      <Form method="POST">
        <ToggleGroup
          type="single"
          className="grid grid-cols-1 gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
          onValueChange={v => setValue(v)}
          value={value}
        >
          <Card
            value="temp1"
            title="Kosong"
            description="Catat keuangan Anda mulai dari halaman kosong"
          />
          <Card
            value="temp2"
            title="Freelance dan Gaji Pokok"
            description="Anda adalah Freelancer sekaligus Pegawai tetap?"
          />
        </ToggleGroup>
        <div className="bg-background sticky bottom-0 mt-12 border-t py-8">
          <div className="flex w-full items-center justify-between gap-3 md:justify-end">
            <Button
              type="button"
              variant="transparent"
              onClick={() => setValue('')}
            >
              Batalkan
            </Button>
            <Button type="submit" disabled={!value}>
              Gunakan
            </Button>
          </div>
        </div>
        <input type="hidden" name="templateId" value={value} />
      </Form>
    </div>
  )
}

function Card({
  value,
  title,
  description,
}: {
  value: string
  title: string
  description: string
}) {
  return (
    <div className="group col-span-1 flex h-full cursor-pointer flex-col gap-3">
      <ToggleGroupItem
        value={value}
        className="h-full w-full rounded-lg p-0 data-[state=on]:border-orange-500"
      >
        <div className="rounded-lg border border-transparent p-1.5">
          <img
            src="/templates/monthly-1.png"
            alt=""
            className="w-full rounded-lg object-cover p-0"
          />
        </div>
      </ToggleGroupItem>
      <div className="flex flex-col gap-1 md:px-4">
        <h5 className="text-sm font-medium">{title}</h5>
        <p className="text-xs">{description}</p>
      </div>
    </div>
  )
}

export default Templates
