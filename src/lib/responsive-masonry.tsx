import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react'
import { AutoSizer } from 'react-virtualized/dist/es/AutoSizer'
import { Masonry, createCellPositioner } from 'react-virtualized/dist/es/Masonry'
import { CellMeasurer, CellMeasurerCache } from 'react-virtualized/dist/es/CellMeasurer'
import { WindowScroller } from 'react-virtualized/dist/es/WindowScroller'

import { usePrevious } from './hooks'

type RenderProps<T> = {
  data: T
  width: number
  style: React.CSSProperties
}

type Props<T> = {
  items: T[]
  gutterSize?: number
  breakpoints?: number[]
  render(props: RenderProps<T>): React.ReactNode
  loadMore: Function
}

/**
 * Get count of the masonry column
 * @param breakpoints array of the breakpoints
 * @param width width of the container
 * @return column count
 */
const calculateColumnCount = (breakpoints: number[], width: number): number =>
  breakpoints.reduceRight(
    (acc, breakpoint, index) => (breakpoint < width ? acc : index),
    breakpoints.length,
  ) + 1

const defaultBreakpoints = [640, 768, 920, 1200, 1400]

const masiryStyle = {
  willChange: 'auto',
  outline: 'none',
}

/**
 * Responsive custom masory that can ask about more data
 */
export function ResponsiveMasory<T>({
  items,
  gutterSize = 1,
  breakpoints = defaultBreakpoints,
  render,
  loadMore,
}: Props<T>): React.ReactElement {
  const masonryRef: any = useRef(null)
  const previousItems = usePrevious(items)
  const [fullWidth, setFullWidth] = useState(0)
  const [columnCount, setColumnCount] = useState(0)
  const [columnWidth, setColumnWidth] = useState(200)
  const cache = useMemo(
    () =>
      new CellMeasurerCache({
        defaultHeight: 250,
        defaultWidth: 200,
        fixedWidth: true,
        fixedHeight: false,
      }),
    [],
  )
  const cellPositioner = useMemo(
    () =>
      createCellPositioner({
        cellMeasurerCache: cache,
        columnCount,
        columnWidth,
        spacer: gutterSize,
      }),
    [],
  )

  useEffect(() => {
    const newColumnCount = calculateColumnCount(breakpoints, fullWidth)
    const newColumnWidth = Math.floor((fullWidth - newColumnCount * gutterSize) / newColumnCount)

    cache.clearAll()
    cellPositioner.reset({
      columnCount: newColumnCount,
      columnWidth: newColumnWidth,
      spacer: gutterSize,
    })

    masonryRef.current.clearCellPositions()

    setColumnCount(newColumnCount)
    setColumnWidth(newColumnWidth)
  }, [fullWidth, breakpoints])

  useEffect(() => {
    if (
      items.length === 0 ||
      (items.length > 0 && previousItems !== undefined && items[0] !== previousItems[0])
    ) {
      cache.clearAll()
      masonryRef.current.clearCellPositions()
      cellPositioner.reset({
        columnCount,
        columnWidth,
        spacer: gutterSize,
      })
    }
  }, [items])

  const onResize = useCallback(({ width }) => {
    setFullWidth(width)
  }, [])

  const cellRenderer = useCallback(
    ({ index, key, parent, style }) => {
      const data = items[index]
      const newStyle = { ...style, width: columnWidth }

      return (
        items.length > 0 &&
        data !== undefined && (
          <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
            {render({ style: newStyle, data, width: columnWidth })}
          </CellMeasurer>
        )
      )
    },
    [items, fullWidth, columnWidth],
  )

  const onCellsRendered = useCallback(
    ({ stopIndex }): void => {
      if (items.length > 0 && items.length - stopIndex < 4) {
        loadMore()
      }
    },
    [items],
  )

  return (
    <WindowScroller>
      {({ height, scrollTop }): React.ReactNode => (
        <AutoSizer onResize={onResize} style={{ width: '100%', height: '100%' }}>
          {({ width }): React.ReactNode => (
            <Masonry
              autoHeight
              cellCount={items.length}
              cellMeasurerCache={cache}
              cellPositioner={cellPositioner}
              cellRenderer={cellRenderer}
              height={height}
              ref={masonryRef}
              width={width}
              scrollTop={scrollTop}
              onCellsRendered={onCellsRendered}
              tabIndex={-1}
              style={masiryStyle}
            />
          )}
        </AutoSizer>
      )}
    </WindowScroller>
  )
}
