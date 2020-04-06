import { useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Store previous value
 * @param value stored value
 * @return stored value
 */
export const usePrevious = (value: any): any => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

/**
 * Scroll page to the top
 */
export const useScrollToTop = (): void => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
}
