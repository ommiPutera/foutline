import type {BubbleMenuProps} from '@tiptap/react'
import {BubbleMenu} from '@tiptap/react'
import {Banknote, icons} from 'lucide-react'
import React from 'react'
import {ColorSelector} from './color-selector.tsx'
import {Button} from '~/components/ui/button.tsx'
import {getNumberFromString} from '~/utils/get-number-from-string.ts'
import {rupiah} from '~/utils/currency.ts'

export interface BubbleMenuItem {
  name: string
  isActive: () => boolean
  command: () => void
  iconName: keyof typeof icons
}

type EditorBubbleMenuProps = Omit<BubbleMenuProps, 'children'>

export function EditorBubbleMenu({editor, ...rest}: EditorBubbleMenuProps) {
  const [isColorSelectorOpen, setIsColorSelectorOpen] = React.useState(false)

  if (!editor) return <></>
  const items: BubbleMenuItem[] = [
    {
      name: 'bold',
      isActive: () => editor.isActive('bold'),
      command: () => editor.chain().focus().toggleBold().run(),
      iconName: 'Bold',
    },
    {
      name: 'italic',
      isActive: () => editor.isActive('italic'),
      command: () => editor.chain().focus().toggleItalic().run(),
      iconName: 'Italic',
    },
    {
      name: 'underline',
      isActive: () => editor.isActive('underline'),
      command: () => editor.chain().focus().toggleUnderline().run(),
      iconName: 'Underline',
    },
    {
      name: 'strike',
      isActive: () => editor.isActive('strike'),
      command: () => editor.chain().focus().toggleStrike().run(),
      iconName: 'Strikethrough',
    },
    {
      name: 'code',
      isActive: () => editor.isActive('code'),
      command: () => editor.chain().focus().toggleCode().run(),
      iconName: 'Code',
    },
  ]

  const bubbleMenuProps: EditorBubbleMenuProps = {
    ...rest,
    editor,
    shouldShow: ({editor}) => {
      // don't show if image is selected
      if (editor.isActive('image')) {
        return false
      }
      return editor.view.state.selection.content().size > 0
    },
    tippyOptions: {
      moveTransition: 'transform 0.15s ease-out',
      onHidden: () => {
        setIsColorSelectorOpen(false)
      },
    },
  }

  return (
    <BubbleMenu
      {...bubbleMenuProps}
      className="border-input bg-background flex items-center justify-center gap-2 overflow-hidden rounded-sm border p-1 shadow-lg"
    >
      <Button
        onClick={() => {
          const text = String(editor.commands.getSelectedText())
          editor
            .chain()
            .insertContent(rupiah(getNumberFromString(text)))
            .run()
        }}
        variant="ghost"
        size="icon-sm"
        className="hover:bg-muted rounded-md p-1"
      >
        <Banknote className="h-3 w-3" />
      </Button>
      {items.map((item, index) => {
        const Icon = icons[item.iconName]
        return (
          <Button
            key={index}
            onClick={item.command}
            variant="ghost"
            size="icon-sm"
            className="hover:bg-muted rounded-md p-1"
          >
            <Icon className="h-3 w-3" />
          </Button>
        )
      })}
      <ColorSelector
        editor={editor}
        isOpen={isColorSelectorOpen}
        setIsOpen={() => {
          setIsColorSelectorOpen(!isColorSelectorOpen)
        }}
      />
    </BubbleMenu>
  )
}
