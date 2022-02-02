import React, { useEffect, useCallback } from 'react'

type IgnoredType = React.RefObject<HTMLElement> | React.RefObject<HTMLElement>[]

export const useOutsideClick = (
  ref: React.RefObject<HTMLElement>,
  handler: () => void,
  ignored?: IgnoredType,
) => {
  const handleOutsideClick = useCallback(
    (event: MouseEvent): void => {
      const ignoredArr = ignored ? (Array.isArray(ignored) ? ignored : [ignored]) : []

      if (
        !ref.current ||
        !event ||
        ref.current.contains(event.target as Node) ||
        ignoredArr.filter(ref => ref.current && ref.current.contains(event.target as Node)).length
      )
        return
      handler()
    },
    [ref, ignored, handler],
  )

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [handleOutsideClick])
}
