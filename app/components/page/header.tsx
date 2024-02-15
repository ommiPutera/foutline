import {cn} from '~/lib/utils.ts'
import {Button} from '../ui/button.tsx'

function Header({
  children,
  className,
  ...props
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn('mx-5 mb-3 flex items-center justify-between', className)}
      {...props}
    >
      <Button size="sm" variant="secondary">
        Cancel
      </Button>
      <div>{children}</div>
    </div>
  )
}

export {Header}
