import type { KeyboardShortcutCommand } from "@tiptap/core";
import { InputRule } from "@tiptap/core";
import { Color } from "@tiptap/extension-color";
import Highlight from '@tiptap/extension-highlight';
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import TiptapLink from "@tiptap/extension-link";
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TextStyle from "@tiptap/extension-text-style";
import TiptapUnderline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import CustomKeymap from './custom-keymap.ts';
import MonthlySlashCommand from "../slash-command/monthly.tsx";
import GetSelectedText from "./selected-text.ts";

export const MonthlyExtensions = [
  StarterKit.configure({
    heading: {
      HTMLAttributes: {
        class: 'font-medium',
      },
    },
    horizontalRule: false,
    dropcursor: {
      color: "#DBEAFE",
      width: 4,
    },
    gapcursor: false
  }),
  HorizontalRule.extend({
    addInputRules() {
      return [
        new InputRule({
          find: /^(?:---|—-|___\s|\*\*\*\s)$/,
          handler: ({ state, range, match }) => {
            const attributes = {};

            const { tr } = state;
            const start = range.from;
            let end = range.to;

            tr.insert(start - 1, this.type.create(attributes)).delete(
              tr.mapping.map(start),
              tr.mapping.map(end),
            );
          },
        }),
      ];
    },
  }).configure({
    HTMLAttributes: {
      class: "mt-4 mb-6 border-t border-stone-300",
    },
  }),
  TiptapLink.configure({
    HTMLAttributes: {
      class:
        "text-blue-500 underline underline-offset-[3px] hover:text-blue-700 transition-colors cursor-pointer",
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
  TaskItem.extend({
    addAttributes() {
      return {
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
        Enter: () => {
          const isTaskItem = this.editor.getAttributes('taskItem')?.for
          if (isTaskItem) {
            return this.editor.chain().splitBlock().exitCode().run()
          } else {
            return this.editor.commands.splitBlock()
          }
        },
        Backspace: () => {
          const isTaskItem = this.editor.getAttributes('taskItem')?.for
          if (isTaskItem) {
            // console.log()
            return this.editor.commands.deleteSelection()
          } else {
            console.log('here')
            return this.editor.commands.deleteCurrentNode()
          }
        },
        'Shift-Enter': () => {
          const isTaskItem = this.editor.getAttributes('taskItem')?.for
          if (isTaskItem) {
            return this.editor.chain().splitBlock().exitCode().run()
          } else {
            return this.editor.commands.splitBlock()
          }
        }
      }

      if (!this.options.nested) {
        return shortcuts
      }

      return {
        ...shortcuts,
      }
    },
  }).configure({
    HTMLAttributes: {
      class: 'flex items-start'
    },
    nested: true,
  }),
  MonthlySlashCommand,
  TiptapUnderline,
  TextStyle,
  Color,
  CustomKeymap,
  GetSelectedText
];