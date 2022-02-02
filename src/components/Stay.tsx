import { StayProps } from '../types'

interface StayComponentProps {
  data: StayProps
}

export const Stay: React.FC<StayComponentProps> = ({
  data: { superHost, title, rating, type, beds, photo },
}): React.ReactElement => {
  return (
    <article>
      <div className='img-container'>
        <img loading='lazy' src={photo} alt={title} />
      </div>
      <div className='stay-description d-flex'>
        {superHost && <div className='stay-description--superhost'>SUPER HOST</div>}
        <div className='stay-description--type'>
          {`${type} ${beds ? '. ' + beds + ' beds' : ''}`}
        </div>
        <div className='stay-description--rating d-flex'>
          <span className='material-icons'>star</span>
          {rating.toFixed(2)}
        </div>
      </div>
      <h3>{title}</h3>
    </article>
  )
}
