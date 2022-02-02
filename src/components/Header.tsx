import { useState, useCallback, useContext, useRef } from 'react'

import { LocationField, GuestsField } from '@components'

import { useOutsideClick } from '../hooks/useOutsideClick'
import { WindBnBContext } from '../context'

export const Header = (): React.ReactElement => {
  const [showSearch, setShowSearch] = useState(false)
  const { setLocationValue, handleSearch } = useContext(WindBnBContext)
  const searchContainerRef = useRef(null)

  const toggleSearch = useCallback((state: boolean): void => {
    setShowSearch(state)
  }, [])

  useOutsideClick(searchContainerRef, () => toggleSearch(false))

  return (
    <header className={`header ${showSearch ? 'header-expanded' : ''}`}>
      {showSearch && (
        <div className='d-flex edit-search-row'>
          Edit your search
          <span className='material-icons' aria-hidden='true' onClick={() => toggleSearch(false)}>
            close
          </span>
        </div>
      )}
      <div className='logo'></div>
      <div className='search-container d-flex' ref={searchContainerRef}>
        <LocationField
          name='location'
          placeholder='Add location'
          onChange={val => setLocationValue(val)}
          onClick={() => {
            if (!showSearch) toggleSearch(true)
          }}
          showDescription={showSearch}
        />
        <GuestsField
          name='guests'
          placeholder='Add guests'
          onClick={() => {
            if (!showSearch) toggleSearch(true)
          }}
          showDescription={showSearch}
        />
        <div className='input-wrapper search-btn'>
          <button
            className='d-flex'
            onClick={() => {
              if (showSearch) toggleSearch(false)
              handleSearch()
            }}
          >
            <span className='material-icons'>search</span>
            {showSearch && 'Search'}
          </button>
        </div>
      </div>
    </header>
  )
}
