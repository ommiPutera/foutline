import React from 'react'

import {PanelLeftClose} from 'lucide-react'

import {Button} from '~/components/ui/button.tsx'

import {type Props as EditorProps} from './content.tsx'

import Sum from './sum.tsx'

function RightSheet({
  editor,
  setEditor,
}: Pick<EditorProps, 'editor' | 'setEditor'>) {
  const [isOpen, setIsOpen] = React.useState(true)

  return (
    <div className="hidden lg:block">
      <div
        data-state={isOpen ? 'open' : 'closed'}
        className="fixed right-4 top-20 transition delay-500 duration-0 data-[state=closed]:opacity-100 data-[state=open]:opacity-0"
      >
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
      <Sum
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        editor={editor}
        setEditor={setEditor}
      />
    </div>
  )
}

export default RightSheet
