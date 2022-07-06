import React from 'react'
import Icons from '../../assets'
import './styles/styles.css'

interface Props {
    artist: string
    title: string
    id: number
}

const Track = (props: Props) => {
  return (
    <div className='track'>
      <div className='track__icon-container'>
        <img src={Icons.MusicIcon} alt="" style={{height: '70%'}}/>
      </div>
      <div className='track__text-container'>
        <div className='track__title-container'>
          <span className='track__title'>{props.title}</span>
        </div>
        <div className='track__artist-container'>
          <span className='track__artist'>{props.artist}</span>
          <span>id: {props.id}</span>
        </div>
      </div>
    </div>
  )
}

export default Track

