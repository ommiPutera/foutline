import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import {cn} from '~/lib/utils.ts'

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({className, ...props}, ref) => (
  <div className="h-[41px] overflow-hidden">
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        'no-scrollbar text-muted-foreground inline-flex w-full items-center justify-start gap-4 overflow-y-hidden overflow-x-scroll',
        className,
      )}
      {...props}
    />
    <div className="z-1 mt-[-1px] w-full border-b"></div>
  </div>
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({className, ...props}, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'z-2 hover:bg-muted data-[state=active]:border-border data-[state=active]:bg-background data-[state=active]:text-foreground mb-[-1px] inline-flex items-center justify-center whitespace-nowrap rounded-t-lg border px-6 py-2.5 text-xs font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b-transparent',
      className,
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({className, ...props}, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'ring-offset-background focus-visible:ring-ring mt-2 h-9 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      className,
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export {Tabs, TabsList, TabsTrigger, TabsContent}
