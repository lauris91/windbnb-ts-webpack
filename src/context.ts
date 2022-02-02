import { createContext } from 'react'

interface WindBnBContextProps {
  locationValue: string
  setLocationValue: (val: string) => void
  guestsValue: string
  setGuestsValue: (val: string) => void
  handleSearch: () => void
}

export const WindBnBContext = createContext<WindBnBContextProps>({} as WindBnBContextProps)

export const { Provider: WindBnBContextProvider, Consumer: WindBnBContextContextConsumer } =
  WindBnBContext
