import type {ReactNode} from 'react'
import React from 'react'
import {useMediaQuery} from './hooks/use-media-query.ts'

type ColumnWrapper = {
  id: string
  items: React.ReactNode[]
}

function MasonryLayout({children}: {children: ReactNode}) {
  const md = useMediaQuery('(min-width: 425px)')
  const lg = useMediaQuery('(min-width: 1024px)')
  const xl = useMediaQuery('(min-width: 1440px)')
  const xl2 = useMediaQuery('(min-width: 1540px)')

  const getColumns = () => {
    if (xl2) return 5
    if (xl) return 4
    if (lg) return 3
    if (md) return 3
    return 2
  }

  const columnWrappers: ColumnWrapper[] = Array.from(
    {length: getColumns()},
    (_, i) => ({
      id: `column${i}`,
      items: [],
    }),
  )

  React.Children.forEach(children, (child, index) => {
    const columnIndex = index % getColumns()
    columnWrappers[columnIndex]!.items.push(
      React.cloneElement(child as React.ReactElement, {key: index}),
    )
  })

  return (
    <div className="flex gap-3">
      {columnWrappers.map(({id, items}, index) => (
        <div key={id} className="flex-1">
          <div className="flex flex-col gap-3">{items}</div>
        </div>
      ))}
    </div>
  )
}

export default MasonryLayout
