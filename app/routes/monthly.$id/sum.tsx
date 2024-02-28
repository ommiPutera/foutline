import React from "react"

import { PanelLeftClose, PanelRightClose } from "lucide-react"

import { Button } from "~/components/ui/button.tsx"

function Sum() {
  const [isOpen, setIsOpen] = React.useState(true)

  return (
    <>
      <div data-state={isOpen ? "open" : "closed"} className="fixed top-20 right-4 delay-500 duration-0 transition data-[state=open]:opacity-0 data-[state=closed]:opacity-100">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 rounded-lg"
        >
          <PanelLeftClose className="h-4 w-4" strokeWidth={2.5} />
          <p className="text-[13px]">Buka</p>
        </Button>
      </div>
      <div data-state={isOpen ? "open" : "closed"} className="data-[state=open]:w-[400px] data-[state=closed]:w-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500"></div>
      <div data-state={isOpen ? "open" : "closed"} className="bg-white dark:bg-zinc-900 h-screen fixed right-0 transition-all ease-in-out data-[state=open]:w-[300px] data-[state=closed]:w-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500">
        <div className="h-[600px] sticky top-20 px-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 rounded-lg"
          >
            <PanelRightClose className="h-4 w-4" strokeWidth={2.5} />
            <p className="text-[13px]">Tutup</p>
          </Button>
        </div>
      </div>
    </>
  )
}

export default Sum