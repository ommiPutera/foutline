import type {KeyboardShortcutCommand} from '@tiptap/core'
import {InputRule} from '@tiptap/core'
import CharacterCount from '@tiptap/extension-character-count'
import {Color} from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import TiptapLink from '@tiptap/extension-link'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import TextStyle from '@tiptap/extension-text-style'
import TiptapUnderline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'

import {create} from 'zustand'

import MonthlySlashCommand from '../slash-command/monthly.tsx'
import CustomKeymap from './custom-keymap.ts'
import GetSelectedText from './selected-text.ts'

interface PositionState {
  postion: number
  setPos: (pos: number) => void
}

export const usePositionStore = create<PositionState>(set => ({
  postion: 0,
  setPos: position => set(state => ({postion: position})),
}))

export const MonthlyExtensions = [
  StarterKit.configure({
    heading: {
      HTMLAttributes: {
        class: 'font-medium',
      },
    },
    bulletList: {
      HTMLAttributes: {
        class: 'list-disc list-outside ml-6 text-sm leading-3',
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: 'list-decimal list-outside ml-6 text-sm leading-3',
      },
    },
    listItem: {
      HTMLAttributes: {
        class: 'leading-normal',
      },
    },
    blockquote: {
      HTMLAttributes: {
        class: 'border-l-4 border-gray-100 dark:border-gray-800',
      },
    },
    codeBlock: {
      HTMLAttributes: {
        class:
          'rounded-sm bg-stone-100 p-5 font-mono font-medium text-stone-800',
      },
    },
    horizontalRule: false,
    dropcursor: {
      color: '#DBEAFE',
      width: 4,
    },
    gapcursor: false,
  }),
  HorizontalRule.extend({
    addInputRules() {
      return [
        new InputRule({
          find: /^(?:---|—-|___\s|\*\*\*\s)$/,
          handler: ({state, range, match}) => {
            const attributes = {}

            const {tr} = state
            const start = range.from
            let end = range.to

            tr.insert(start - 1, this.type.create(attributes)).delete(
              tr.mapping.map(start),
              tr.mapping.map(end),
            )
          },
        }),
      ]
    },
  }).configure({
    HTMLAttributes: {
      class: 'mt-4 mb-6 border-t border-stone-300',
    },
  }),
  TiptapLink.configure({
    HTMLAttributes: {
      class:
        'text-blue-500 underline underline-offset-[3px] hover:text-blue-700 transition-colors cursor-pointer',
    },
  }),
  Highlight.configure({
    multicolor: true,
  }),
  CharacterCount.configure({
    limit: 1299,
  }),
  TaskList.configure({
    HTMLAttributes: {
      class: 'not-prose',
    },
  }),
  TaskItem.extend({
    addAttributes() {
      return {
        pocket: {
          default: 'none',
          keepOnSplit: false,
          renderHTML: attributes => ({
            'data-pocket': attributes.pocket,
          }),
        },
        for: {
          default: 'none',
          keepOnSplit: false,
          renderHTML: attributes => ({
            'data-for': attributes.for,
          }),
        },
        checked: {
          default: false,
          keepOnSplit: false,
          parseHTML: element => element.getAttribute('data-checked') === 'true',
          renderHTML: attributes => ({
            'data-checked': attributes.checked,
          }),
        },
      }
    },
    addKeyboardShortcuts() {
      const shortcuts: {
        [key: string]: KeyboardShortcutCommand
      } = {
        // @ts-ignore
        Enter: () => {
          const isTaskItem = this.editor.getAttributes('taskItem')?.for

          if (isTaskItem) {
            return this.editor.chain().splitBlock().exitCode().run()
          }
        },
        Backspace: () => {
          const isTaskItem = this.editor.getAttributes('taskItem')?.for
          if (isTaskItem) {
            return this.editor.commands.deleteSelection()
          } else {
            return this.editor.commands.deleteCurrentNode()
          }
        },
      }

      if (!this.options.nested) {
        return shortcuts
      }

      return {
        ...shortcuts,
      }
    },
    addNodeView() {
      return ({node, HTMLAttributes, getPos, editor}) => {
        const listItem = document.createElement('li')
        const checkboxWrapper = document.createElement('label')
        const checkboxStyler = document.createElement('span')
        const checkbox = document.createElement('input')
        const content = document.createElement('div')

        checkboxWrapper.contentEditable = 'false'
        checkbox.type = 'checkbox'
        checkbox.addEventListener('change', event => {
          // if the editor isn’t editable and we don't have a handler for
          // readonly checks we have to undo the latest change
          if (!editor.isEditable && !this.options.onReadOnlyChecked) {
            checkbox.checked = !checkbox.checked

            return
          }

          const {checked} = event.target as any
          const setPos = usePositionStore.getState().setPos

          if (editor.isEditable && typeof getPos === 'function') {
            editor
              .chain()
              .focus(undefined, {scrollIntoView: false})
              .command(({tr}) => {
                const position = getPos()
                setPos(position)

                const currentNode = tr.doc.nodeAt(position)
                tr.setNodeMarkup(position, undefined, {
                  ...currentNode?.attrs,
                  checked,
                })

                return true
              })
              .run()
          }
          if (!editor.isEditable && this.options.onReadOnlyChecked) {
            // Reset state if onReadOnlyChecked returns false
            if (!this.options.onReadOnlyChecked(node, checked)) {
              checkbox.checked = !checkbox.checked
            }
          }
        })

        Object.entries(this.options.HTMLAttributes).forEach(([key, value]) => {
          listItem.setAttribute(key, value)
        })

        listItem.dataset.checked = node.attrs.checked
        if (node.attrs.checked) {
          checkbox.setAttribute('checked', 'checked')
        }

        checkboxWrapper.append(checkbox, checkboxStyler)
        listItem.append(checkboxWrapper, content)

        Object.entries(HTMLAttributes).forEach(([key, value]) => {
          listItem.setAttribute(key, value)
        })

        return {
          dom: listItem,
          contentDOM: content,
          update: updatedNode => {
            if (updatedNode.type !== this.type) {
              return false
            }

            listItem.dataset.checked = updatedNode.attrs.checked
            if (updatedNode.attrs.checked) {
              listItem.setAttribute('data-pocket', updatedNode.attrs.pocket)
              checkbox.setAttribute('checked', 'checked')
            } else {
              listItem.setAttribute('data-pocket', 'none')
              checkbox.removeAttribute('checked')
            }

            return true
          },
        }
      }
    },
  }).configure({
    HTMLAttributes: {
      class: 'flex items-start',
    },
    nested: true,
  }),
  MonthlySlashCommand,
  TiptapUnderline,
  TextStyle,
  Color,
  CustomKeymap,
  GetSelectedText,
]
