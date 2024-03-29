import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import {cn} from '~/lib/utils.ts'

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
    noIndicator?: boolean
  }
>(
  (
    {className, children, sideOffset = 4, noIndicator = false, ...props},
    ref,
  ) => (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'bg-muted animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 overflow-hidden rounded-sm px-2.5 py-1.5 text-[11px] dark:bg-zinc-900',
        className,
      )}
      {...props}
    >
      {children}
      {!noIndicator && (
        <TooltipPrimitive.TooltipArrow className="fill-muted h-1.5 w-3 dark:fill-zinc-800" />
      )}
    </TooltipPrimitive.Content>
  ),
)
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export {Tooltip, TooltipTrigger, TooltipContent, TooltipProvider}
