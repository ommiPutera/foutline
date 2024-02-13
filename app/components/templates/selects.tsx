import clsx from 'clsx'
import {icons} from 'lucide-react'
import {ToggleGroupItem} from '../ui/toggle-group.tsx'

function BasicNotes({disabled = true}: {disabled?: boolean}) {
  return (
    <PageSelectItem
      disabled={disabled}
      title="Catatan biasa"
      color="blue"
      value="basic-notes"
      iconName="PenLine"
    />
  )
}
function RegularSaving({disabled = true}: {disabled?: boolean}) {
  return (
    <PageSelectItem
      disabled={disabled}
      title="Tabungan rutin"
      color="green"
      value="regular-saving"
      iconName="CalendarCheck2"
    />
  )
}
function Investment({disabled = true}: {disabled?: boolean}) {
  return (
    <PageSelectItem
      disabled={disabled}
      title="Investasi"
      color="teal"
      value="investment"
      iconName="AreaChart"
    />
  )
}
function MonthlyExpenses({disabled = false}: {disabled?: boolean}) {
  return (
    <PageSelectItem
      disabled={disabled}
      title="Keuangan bulanan"
      color="orange"
      value="monthly"
      iconName="ShoppingBag"
    />
  )
}
function Debt({disabled = true}: {disabled?: boolean}) {
  return (
    <PageSelectItem
      disabled={disabled}
      title="Hutang"
      color="red"
      value="debt"
      iconName="ScrollText"
    />
  )
}
function EmergencyFund({disabled = true}: {disabled?: boolean}) {
  return (
    <PageSelectItem
      disabled={disabled}
      title="Dana darurat"
      color="cyan"
      value="emergency-fund"
      iconName="ShieldCheck"
    />
  )
}

function PageSelectItem({
  value,
  title,
  color,
  iconName,
  disabled,
}: {
  value: string
  title: string
  color: string
  iconName: keyof typeof icons
  disabled: boolean
}) {
  const LucideIcon = icons[iconName]
  return (
    <ToggleGroupItem
      value={value}
      disabled={disabled}
      data-color={color}
      className={clsx(
        'flex h-fit flex-1 items-center justify-start gap-2 rounded-md px-4 py-3 text-left',
        'data-[color=blue]:data-[state=on]:border-blue-500',
        'data-[color=red]:data-[state=on]:border-red-500',
        'data-[color=orange]:data-[state=on]:border-orange-500',
        'data-[color=cyan]:data-[state=on]:border-cyan-500',
        'data-[color=green]:data-[state=on]:border-green-500',
        'data-[color=teal]:data-[state=on]:border-teal-500',
      )}
    >
      <div
        data-color={color}
        className={clsx(
          'flex h-5 w-5 items-center justify-center rounded-sm border bg-gradient-to-tr',
          'data-[color=blue]:border-blue-400 data-[color=blue]:from-blue-500 data-[color=blue]:to-blue-300',
          'data-[color=red]:border-red-400 data-[color=red]:from-red-500 data-[color=red]:to-red-300',
          'data-[color=orange]:border-orange-400 data-[color=orange]:from-orange-500 data-[color=orange]:to-orange-300',
          'data-[color=cyan]:border-cyan-400 data-[color=cyan]:from-cyan-500 data-[color=cyan]:to-cyan-300',
          'data-[color=green]:border-green-400 data-[color=green]:from-green-500 data-[color=green]:to-green-300',
          'data-[color=teal]:border-teal-400 data-[color=teal]:from-teal-500 data-[color=teal]:to-teal-300',
        )}
      >
        <LucideIcon className="h-3.5 w-3.5" color="#fff" />
      </div>
      <h4 className="text-xs font-medium leading-none">{title}</h4>
    </ToggleGroupItem>
  )
}

export {
  BasicNotes,
  RegularSaving,
  Investment,
  MonthlyExpenses,
  Debt,
  EmergencyFund,
}
