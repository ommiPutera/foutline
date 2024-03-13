import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import {cn} from '~/lib/utils.ts'

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({className, children, sideOffset = 4, ...props}, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'bg-muted z-50 overflow-hidden rounded-sm px-2.5 py-1.5 text-[11px] dark:bg-zinc-800',
      className,
    )}
    {...props}
  >
    {children}
    <TooltipPrimitive.TooltipArrow className="fill-muted h-1.5 w-3 dark:fill-zinc-800" />
  </TooltipPrimitive.Content>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export {Tooltip, TooltipTrigger, TooltipContent, TooltipProvider}
