import {Extension} from '@tiptap/core'
import type {Editor} from '@tiptap/react'

declare module '@tiptap/core' {
  interface Commands {
    getSelectedText: {
      getSelectedText: () => ({editor}: {editor: Editor}) => string
    }
  }
}

const GetSelectedText = Extension.create({
  name: 'myGetSelectedText',
  addCommands() {
    return {
      getSelectedText:
        () =>
        ({editor}: {editor: Editor}): string => {
          const {from, to, empty} = editor.state.selection
          if (empty) return ''
          return editor.state.doc.textBetween(from, to, ' ')
        },
    }
  },
})

export default GetSelectedText
