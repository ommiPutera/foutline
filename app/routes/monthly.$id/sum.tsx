import React from "react"

import { PanelRightClose } from "lucide-react"

import { Button } from "~/components/ui/button.tsx"
import { cn } from "~/lib/utils.ts"

function Sum() {
  const [isClose, setIsClose] = React.useState(false)

  if (isClose) {
    return (
      <div className="fixed top-20 right-4">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setIsClose(false)}
          className="flex items-center gap-2 rounded-lg"
        >
          <PanelRightClose className="h-4 w-4" strokeWidth={2.5} />
          <p className="text-[13px]">Buka</p>
        </Button>
      </div>
    )
  }

  return (
    <div className={cn("border bg-white", isClose ? "w-0" : "w-[490px]")}>
      <div className="h-[600px] sticky top-20 px-6">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setIsClose(true)}
          className="flex items-center gap-2 rounded-lg"
        >
          <PanelRightClose className="h-4 w-4" strokeWidth={2.5} />
          <p className="text-[13px]">Tutup</p>
        </Button>
      </div>
    </div>
  )
}

export default Sum