import React, { useState, useCallback, useContext, useEffect, useRef } from 'react'
import { uniq, debounce, isEmpty } from 'lodash'

import { useOutsideClick } from '@hooks'

import { WindBnBContext } from '../context'
import stays from '../stays.json'
import { SearchFieldCommonProps, StayProps } from '../types'

interface LocationFieldProps extends SearchFieldCommonProps {
  onChange: (val: string) => void
}

export const LocationField: React.FC<LocationFieldProps> = ({
  placeholder,
  name,
  showDescription,
  onChange,
  onClick,
  ...others
}): React.ReactElement => {
  const [options, setOptions] = useState<string[]>([])
  const [showOptions, setShowOptions] = useState(false)
  const { locationValue } = useContext(WindBnBContext)
  const locationRef = useRef(null)
  const optionsRef = useRef(null)

  const loadOptions = useCallback((): string[] => {
    const filteredLocations = stays
      .filter((loc: StayProps): boolean => {
        const fullLocation = `${loc.city}, ${loc.country}`.toLocaleLowerCase()

        return fullLocation.includes(locationValue.toLocaleLowerCase())
      })
      .map(({ city, country }: StayProps): string => `${city}, ${country}`)

    return uniq(filteredLocations)
  }, [locationValue])

  useOutsideClick(locationRef, () => setShowOptions(false), optionsRef)

  useEffect(() => {
    const debouncedOptions = debounce(() => {
      setOptions(loadOptions())
    }, 300)

    debouncedOptions()
  }, [locationValue, loadOptions])

  const handleOnFocus = (): void => {
    setTimeout(() => {
      setShowOptions(true)
    }, 300)
  }

  return (
    <>
      <div className='input-wrapper' ref={locationRef}>
        {showDescription && <span className='input-wrapper--description'>Location</span>}
        <input
          placeholder={placeholder}
          onChange={event => {
            const {
              target: { value },
            } = event
            if (onChange) onChange(value)
          }}
          onClick={onClick}
          name={name}
          value={locationValue}
          autoComplete='off'
          onFocus={handleOnFocus}
          onKeyDown={({ key }: React.KeyboardEvent): void => {
            key === 'Tab' && setShowOptions(false)
          }}
          {...others}
        />
      </div>
      {showOptions && (
        <div className='options-container' ref={optionsRef}>
          {!isEmpty(options) &&
            options.map((opt, i) => (
              <div
                className='options-container--option'
                aria-hidden='true'
                key={i}
                onClick={(): void => {
                  if (onChange) onChange(opt)
                  setShowOptions(false)
                }}
              >
                <span className='material-icons'>location_on</span>
                <div>{opt}</div>
              </div>
            ))}
        </div>
      )}
    </>
  )
}
