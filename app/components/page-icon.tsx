import {PostType, type Post} from '@prisma/client'

import {icons} from 'lucide-react'

import {cn} from '~/lib/utils.ts'

function PageIcon({type}: Pick<Post, 'type'>) {
  const getIconName = (): keyof typeof icons => {
    switch (type) {
      case 'MONTHLY_PLANNING':
        return 'ArrowRightLeft'
      case 'BASIC_NOTES':
        return 'PencilLine'
      default:
        return 'ArrowRightLeft'
    }
  }

  const Icon = icons[getIconName()]

  return (
    <div
      className={cn(
        'flex h-4 w-4 items-center justify-center rounded-sm border  bg-gradient-to-tr',
        type === PostType.MONTHLY_PLANNING &&
          'border-orange-400 from-orange-500 to-orange-300',
        type === PostType.BASIC_NOTES &&
          'border-blue-400 from-blue-500 to-blue-300',
      )}
    >
      <Icon className="h-2.5 w-2.5" color="#fff" />
    </div>
  )
}

export default PageIcon
