import type {Editor, Range} from '@tiptap/core'
import {Extension} from '@tiptap/core'
import {ReactRenderer} from '@tiptap/react'
import Suggestion from '@tiptap/suggestion'
import clsx from 'clsx'
import {icons} from 'lucide-react'
import React from 'react'
import tippy from 'tippy.js'

type CommandItemProps = {
  title: string
  icon: {
    iconName: keyof typeof icons
    color: 'green' | 'red' | 'orange' | 'default'
  }
}

type Command = {
  editor: Editor
  range: Range
}

const CommandExtension = Extension.create({
  name: 'slash-command',
  addOptions() {
    return {
      suggestion: {
        char: '/',
        command: ({
          editor,
          range,
          props,
        }: {
          editor: Editor
          range: Range
          props: any
        }) => {
          props.command({editor, range})
        },
      },
    }
  },
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ]
  },
})

const getSuggestionItems = ({query}: {query: string}) => {
  return [
    {
      title: 'Text',
      icon: {
        iconName: 'Text',
        color: 'default',
      },
      command: ({editor, range}: Command) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .toggleNode('paragraph', 'paragraph')
          .run()
      },
    },
    {
      title: 'To-do List',
      searchTerms: ['todo', 'task', 'list', 'check', 'checkbox'],
      icon: {
        iconName: 'CheckSquare',
        color: 'default',
      },
      command: ({editor, range}: Command) => {
        editor.chain().focus().deleteRange(range).toggleTaskList().run()
      },
    },
    {
      title: 'Heading 1',
      icon: {
        iconName: 'Heading1',
        color: 'default',
      },
      command: ({editor, range}: Command) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode('heading', {level: 1})
          .run()
      },
    },
    {
      title: 'Heading 2',
      icon: {
        iconName: 'Heading2',
        color: 'default',
      },
      command: ({editor, range}: Command) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode('heading', {level: 2})
          .run()
      },
    },
    {
      title: 'Heading 3',
      icon: {
        iconName: 'Heading3',
        color: 'default',
      },
      command: ({editor, range}: Command) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode('heading', {level: 3})
          .run()
      },
    },
    {
      title: 'Bullet List',
      icon: {
        iconName: 'Heading',
        color: 'default',
      },
      command: ({editor, range}: Command) => {
        editor.chain().focus().deleteRange(range).toggleBulletList().run()
      },
    },
    {
      title: 'Numbered List',
      icon: {
        iconName: 'ListOrdered',
        color: 'default',
      },
      command: ({editor, range}: Command) => {
        editor.chain().focus().deleteRange(range).toggleOrderedList().run()
      },
    },
    {
      title: 'Quote',
      icon: {
        iconName: 'TextQuote',
        color: 'default',
      },
      command: ({editor, range}: Command) =>
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .toggleNode('paragraph', 'paragraph')
          .toggleBlockquote()
          .run(),
    },
  ].filter(item => {
    if (typeof query === 'string' && query.length > 0) {
      return item.title.toLowerCase().includes(query.toLowerCase())
    }
    return true
  })
}

const updateScrollView = (container: HTMLElement, item: HTMLElement) => {
  const containerHeight = container.offsetHeight
  const itemHeight = item ? item.offsetHeight : 0

  const top = item.offsetTop
  const bottom = top + itemHeight

  if (top < container.scrollTop) {
    container.scrollTop -= container.scrollTop - top + 5
  } else if (bottom > containerHeight + container.scrollTop) {
    container.scrollTop += bottom - containerHeight - container.scrollTop + 5
  }
}

const CommandList = ({
  items,
  command,
  editor,
  range,
}: {
  items: CommandItemProps[]
  command: any
  editor: any
  range: any
}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const selectItem = React.useCallback(
    (index: number) => {
      const item = items[index]
      if (item) command(item)
    },
    [command, items],
  )

  React.useEffect(() => {
    const navigationKeys = ['ArrowUp', 'ArrowDown', 'Enter']
    const onKeyDown = (e: KeyboardEvent) => {
      if (navigationKeys.includes(e.key)) {
        e.preventDefault()
        if (e.key === 'ArrowUp') {
          setSelectedIndex((selectedIndex + items.length - 1) % items.length)
          return true
        }
        if (e.key === 'ArrowDown') {
          setSelectedIndex((selectedIndex + 1) % items.length)
          return true
        }
        if (e.key === 'Enter') {
          selectItem(selectedIndex)
          return true
        }
        return false
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [items, selectedIndex, setSelectedIndex, selectItem])

  React.useEffect(() => {
    setSelectedIndex(0)
  }, [items])

  const commandListContainer = React.useRef<HTMLDivElement>(null)

  React.useLayoutEffect(() => {
    const container = commandListContainer?.current

    const item = container?.children[selectedIndex] as HTMLElement

    if (item && container) updateScrollView(container, item)
  }, [selectedIndex])

  return items.length > 0 ? (
    <div
      id="slash-command"
      ref={commandListContainer}
      className="border-input z-50 h-auto max-h-[420px] w-56 overflow-y-auto scroll-smooth rounded-md border bg-white p-1 shadow-md transition-all dark:bg-zinc-900"
    >
      {items.map(
        ({title, icon: {iconName, color}}: CommandItemProps, index: number) => {
          const Icon = icons[iconName]
          return (
            <button
              className={clsx(
                'flex w-full items-center space-x-2 rounded-md p-1 text-left text-sm text-zinc-900 dark:text-white',
                {
                  'bg-gray-100/50 dark:bg-zinc-800': selectedIndex === index,
                },
              )}
              key={index}
              onMouseEnter={() => setSelectedIndex(index)}
              onClick={() => selectItem(index)}
            >
              <div
                className={clsx(
                  'flex h-6 w-6 items-center justify-center rounded-md border',
                  {
                    'border-red-200 bg-red-100': color === 'red',
                    'border-orange-200 bg-orange-100': color === 'orange',
                    'border-green-200 bg-green-100': color === 'green',
                    'border-gray-100 bg-white': color === 'default',
                  },
                )}
              >
                <Icon className="stroke-background h-3 w-3" />
              </div>
              <p className="text-xs font-medium">{title}</p>
            </button>
          )
        },
      )}
    </div>
  ) : null
}

const renderItems = () => {
  let component: ReactRenderer | null = null
  let popup: any | null = null

  return {
    onStart: (props: {editor: Editor; clientRect: DOMRect}) => {
      component = new ReactRenderer(CommandList, {
        props,
        editor: props.editor,
      })

      // @ts-ignore
      popup = tippy('body', {
        getReferenceClientRect: props.clientRect,
        appendTo: () => document.body,
        content: component.element,
        showOnCreate: true,
        interactive: true,
        trigger: 'manual',
        placement: 'bottom-start',
      })
    },
    onUpdate: (props: {editor: Editor; clientRect: DOMRect}) => {
      component?.updateProps(props)

      popup &&
        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        })
    },
    onKeyDown: (props: {event: KeyboardEvent}) => {
      if (props.event.key === 'Escape') {
        popup?.[0].hide()

        return true
      }

      // @ts-ignore
      return component?.ref?.onKeyDown(props)
    },
    onExit: () => {
      popup?.[0].destroy()
      component?.destroy()
    },
  }
}

const BasicSlashCommand = CommandExtension.configure({
  suggestion: {
    items: getSuggestionItems,
    render: renderItems,
  },
})

export default BasicSlashCommand
export {
  CommandExtension,
  renderItems,
  updateScrollView,
  CommandList,
  type CommandItemProps,
  type Command,
}
