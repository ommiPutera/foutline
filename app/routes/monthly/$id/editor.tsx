import React from 'react'
import { Header } from '~/components/page/header.tsx'

const Editor = React.lazy(async () => await import('~/components/editor/index.tsx'))

function MonthlyEditor() {
  return (
    <div className="flex w-full flex-col gap-4 md:gap-3 md:border-r md:pl-4 md:pr-10">
      <Header />
      <div className='mt-12'>
        <Editor />
      </div>
    </div>
  )
}

export default MonthlyEditor