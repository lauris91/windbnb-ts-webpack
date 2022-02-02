import { useState, useCallback } from 'react'
import { isEmpty } from 'lodash'

import { Stay, Header } from '@components'

import places from './stays.json'
import { WindBnBContextProvider } from './context'
import { StayProps } from './types'

export const App = () => {
  const [locationValue, setLocationValue] = useState<string>('')
  const [guestsValue, setGuestsValue] = useState<string>('')
  const [stays, setStays] = useState<StayProps[]>(places)

  const filterStays = useCallback(
    (el: StayProps): boolean => {
      const [city, country] = locationValue.split(', ')

      if (guestsValue && locationValue)
        return el.city === city && el.country === country && +guestsValue <= el.maxGuests

      if (guestsValue) return +guestsValue <= el.maxGuests
      if (locationValue) return el.city === city && el.country === country

      return false
    },
    [guestsValue, locationValue],
  )

  const handleSearch = useCallback(() => {
    const filteredStays = places.filter(filterStays)

    setStays(!isEmpty(filteredStays) ? filteredStays : places)
  }, [filterStays])

  return (
    <WindBnBContextProvider
      value={{
        locationValue,
        setLocationValue,
        guestsValue,
        setGuestsValue,
        handleSearch,
      }}
    >
      <div className='wrapper'>
        <Header />
        <main>
          <div className='information-container d-flex'>
            <h2>Stays in Finland</h2>
            <h5>{stays.length > 12 ? '12+' : stays.length} stays</h5>
          </div>
          <div className='stays-container d-flex'>
            {stays.map(stay => (
              <Stay key={stay.title} data={stay} />
            ))}
          </div>
        </main>
        <footer>
          created by <strong>lauris91</strong> - devChallenges.io
        </footer>
      </div>
    </WindBnBContextProvider>
  )
}
