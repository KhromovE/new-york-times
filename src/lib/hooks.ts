import { useRef, useEffect } from 'react'

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
