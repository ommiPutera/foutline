import {cn} from '~/lib/utils.ts'

function Skeleton({className, ...props}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'bg-muted animate-pulse rounded-md dark:bg-zinc-800',
        className,
      )}
      {...props}
    />
  )
}

export {Skeleton}
