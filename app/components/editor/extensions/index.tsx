import { InputRule } from '@tiptap/core'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import TiptapLink from '@tiptap/extension-link'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import TextStyle from '@tiptap/extension-text-style'
import TiptapUnderline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'
import CustomKeymap from './custom-keymap.ts'
import BasicSlashCommand from '../slash-command/index.tsx'
import GetSelectedText from './selected-text.ts'

export const BasicExtensions = [
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
          handler: ({ state, range, match }) => {
            const attributes = {}

            const { tr } = state
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
  TaskList.configure({
    HTMLAttributes: {
      class: 'not-prose',
    },
  }),
  TaskItem.configure({
    HTMLAttributes: {
      class: 'flex items-start',
    },
    nested: true,
  }),
  BasicSlashCommand,
  TiptapUnderline,
  TextStyle,
  Color,
  CustomKeymap,
  GetSelectedText,
]
