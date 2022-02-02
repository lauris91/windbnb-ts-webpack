import React, { useState, useCallback, useMemo, useContext, useEffect, useRef } from 'react'

import { useOutsideClick } from '@hooks'

import { WindBnBContext } from '../context'
import { SearchFieldCommonProps } from '../types'

export const GuestsField: React.FC<SearchFieldCommonProps> = ({
  placeholder,
  name,
  showDescription,
  onClick,
  ...others
}): React.ReactElement => {
  const [showOptions, setShowOptions] = useState<boolean>(false)
  const [adults, setAdults] = useState<number>(0)
  const [children, setChildren] = useState<number>(0)

  const { guestsValue, setGuestsValue } = useContext(WindBnBContext)
  const guestsRef = useRef(null)
  const optionsRef = useRef(null)

  useOutsideClick(guestsRef, () => setShowOptions(false), optionsRef)

  const updateAdults = useCallback(
    (action = 'add') => {
      if (action === 'add') {
        setAdults(adults + 1)
        return
      }

      if (adults !== 0) {
        setAdults(adults - 1)
        return
      }

      return
    },
    [adults],
  )

  const updateChildren = useCallback(
    (action = 'add') => {
      if (action === 'add') {
        setChildren(children + 1)
        return
      }

      if (children !== 0) {
        setChildren(children - 1)
        return
      }

      return
    },
    [children],
  )

  const handleOnFocus = (): void => {
    setTimeout(() => {
      setShowOptions(true)
    }, 300)
  }

  const value = useMemo((): string => {
    const guests = adults + children
    if (guests > 0) return `${guests}`

    return ''
  }, [adults, children])

  useEffect(() => setGuestsValue(value), [value, setGuestsValue])

  return (
    <>
      <div className='input-wrapper' ref={guestsRef}>
        {showDescription && <span className='input-wrapper--description'>Guests</span>}
        <input
          placeholder={placeholder}
          onClick={onClick}
          name={name}
          onFocus={handleOnFocus}
          id='guests-input'
          autoComplete='off'
          value={guestsValue ? `${guestsValue} guests` : ''}
          onKeyDown={({ key }: React.KeyboardEvent) => {
            if (key === 'Backspace') {
              adults && setAdults(0)
              children && setChildren(0)
            }
          }}
          onChange={() => null}
          {...others}
        />
      </div>
      {showOptions && (
        <div className='options-container' ref={optionsRef}>
          <div className='options-container--option guests'>
            <div className='guests--type'>Adults</div>
            <div className='guests--ages'>Ages 13 or above</div>
            <div className='guests--count'>
              <span
                className='material-icons'
                aria-hidden='true'
                onClick={() => updateAdults('remove')}
              >
                remove
              </span>
              {adults}
              <span className='material-icons' aria-hidden='true' onClick={() => updateAdults()}>
                add
              </span>
            </div>
          </div>
          <div className='options-container--option guests'>
            <div className='guests--type'>Children</div>
            <div className='guests--ages'>Ages 2 - 12</div>
            <div className='guests--count'>
              <span
                className='material-icons'
                aria-hidden='true'
                onClick={() => updateChildren('minus')}
              >
                remove
              </span>
              {children}
              <span className='material-icons' aria-hidden='true' onClick={() => updateChildren()}>
                add
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
