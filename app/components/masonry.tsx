import type { ReactNode } from 'react'
import React from 'react'

type ColumnProps = {
  children: ReactNode
}

type MasonryLayoutProps = {
  columns: number
  children: ReactNode
}

type ColumnWrapper = {
  id: string
  items: React.ReactNode[]
}

function MasonryLayout({ columns, children }: MasonryLayoutProps) {
  const columnWrappers: ColumnWrapper[] = Array.from(
    { length: columns },
    (_, i) => ({
      id: `column${i}`,
      items: [],
    }),
  )

  React.Children.forEach(children, (child, index) => {
    const columnIndex = index % columns
    columnWrappers[columnIndex]!.items.push(
      React.cloneElement(child as React.ReactElement, { key: index }),
    )
  })

  return (
    <div className="flex gap-3">
      {columnWrappers.map(({ id, items }, index) => (
        <div key={id} className="flex-1">
          <Column>{items}</Column>
        </div>
      ))}
    </div>
  )
}

function Column({ children }: ColumnProps) {
  return <div className="flex flex-col gap-3">{children}</div>
}

export default MasonryLayout