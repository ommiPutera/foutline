import { cn } from "~/lib/utils.ts"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md dark:bg-zinc-700 bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
