import type {ReactNode} from 'react'
import React from 'react'

type MasonryColumnProps = {
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

export default function MasonryLayout({columns, children}: MasonryLayoutProps) {
  const columnWrappers: ColumnWrapper[] = Array.from(
    {length: columns},
    (_, i) => ({
      id: `column${i}`,
      items: [],
    }),
  )

  React.Children.forEach(children, (child, index) => {
    const columnIndex = index % columns
    columnWrappers[columnIndex]!.items.push(
      React.cloneElement(child as React.ReactElement, {key: index}),
    )
  })

  return (
    <div className="flex gap-3">
      {columnWrappers.map(({id, items}, index) => (
        <div key={id} className="flex-1">
          <MasonryColumn>{items}</MasonryColumn>
        </div>
      ))}
    </div>
  )
}

function MasonryColumn({children}: MasonryColumnProps) {
  return <div className="flex flex-col gap-3">{children}</div>
}
