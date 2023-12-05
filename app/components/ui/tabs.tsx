import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "~/lib/utils.ts"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <div className="h-[41px] overflow-hidden">
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        "inline-flex items-center gap-4 w-full justify-start text-muted-foreground overflow-x-scroll overflow-y-hidden no-scrollbar",
        className
      )}
      {...props}
    />
    <div className="w-full border-b -mt-[1px] z-1"></div>
  </div>
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center rounded-t-lg -mb-[1px] hover:bg-muted z-2 justify-center whitespace-nowrap px-6 py-2.5 border text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground data-[state=active]:border-border data-[state=active]:border-b-transparent data-[state=active]:bg-background",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
