// import { ButtonLink } from '../ui/button.tsx'

import React from 'react'
import {
  BasicNotes,
  Debt,
  EmergencyFund,
  Investment,
  MonthlyExpenses,
  RegularSaving,
} from '../templates/selects.tsx'
import {ToggleGroup} from '../ui/toggle-group.tsx'

function Hero() {
  const [value, setValue] = React.useState('')

  return (
    <div className="px-5vw mx-auto max-w-screen-xl py-4 md:pb-44 md:pt-16">
      content
    </div>
  )
  return (
    <div className="px-5vw mx-auto max-w-screen-xl py-4 md:pb-44 md:pt-16">
      <div className="mx-auto flex flex-col items-center gap-12 text-center md:gap-14">
        <div className="flex flex-col items-center gap-3">
          <h2 className="max-w-xl text-4xl font-semibold md:max-w-4xl md:text-5xl md:leading-none">
            Finance, Notes & Habbit
          </h2>
          <p className="text-lg font-normal text-black/70 dark:text-white/70 md:max-w-xl md:font-light">
            Solusi keuangan yang berbasis pada{' '}
            <b className="font-semibold">Note-Taking</b> yang memudahkan dalam
            mempelajari dan merekem data keuangan Anda
          </p>
        </div>
        {value ? (
          <div className="h-44 w-[684px] rounded-lg border bg-white shadow-2xl  shadow-cyan-500/50">
            {value}
          </div>
        ) : (
          <></>
        )}
        <div>
          <ToggleGroup
            type="single"
            className="grid w-full grid-cols-1 gap-2 md:grid-cols-3"
            onValueChange={v => setValue(v)}
          >
            <BasicNotes disabled={false} />
            <RegularSaving disabled={false} />
            <Investment disabled={false} />
            <MonthlyExpenses disabled={false} />
            <Debt disabled={false} />
            <EmergencyFund disabled={false} />
          </ToggleGroup>
        </div>
      </div>
    </div>
  )
}

export default Hero
