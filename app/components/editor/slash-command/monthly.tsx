import {CommandExtension, type Command, renderItems} from './index.tsx'

const getSuggestionItems = ({query}: {query: string}) => {
  return [
    {
      title: 'Pemasukan',
      icon: {
        iconName: 'ArrowDownLeft',
        color: 'green',
      },
      command: ({editor, range}: Command) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .insertContent('Rp. ')
          .toggleTaskList()
          .updateAttributes('taskItem', {for: 'monthly-income'})
          .run()
      },
    },
    {
      title: 'Pengeluaran',
      icon: {
        iconName: 'ArrowUpRight',
        color: 'red',
      },
      command: ({editor, range}: Command) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .insertContent('Rp. ')
          .toggleTaskList()
          .updateAttributes('taskItem', {for: 'monthly-expense'})
          .run()
      },
    },
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
      title: 'Heading',
      icon: {
        iconName: 'Heading',
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
  ].filter(item => {
    if (typeof query === 'string' && query.length > 0) {
      return item.title.toLowerCase().includes(query.toLowerCase())
    }
    return true
  })
}

const MonthlySlashCommand = CommandExtension.configure({
  suggestion: {
    items: getSuggestionItems,
    render: renderItems,
  },
})

export default MonthlySlashCommand
