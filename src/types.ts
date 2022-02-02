export interface StayProps {
  city: string
  country: string
  superHost: boolean
  title: string
  rating: number
  maxGuests: number
  type: string
  beds: number | null
  photo: string
}

export interface SearchFieldCommonProps {
  placeholder: string
  name: string
  showDescription: boolean
  onClick: () => void
}
