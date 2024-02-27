import {ArrowRightLeft} from 'lucide-react'
import {cn} from '~/lib/utils.ts'

function PageIcon({className}: {className?: string}) {
  return (
    <div
      className={cn(
        'flex h-4 w-4 items-center justify-center rounded-sm border border-orange-400 bg-gradient-to-tr from-orange-500 to-orange-300',
        className,
      )}
    >
      <ArrowRightLeft className="h-2.5 w-2.5" color="#fff" />
    </div>
  )
}

export default PageIcon
