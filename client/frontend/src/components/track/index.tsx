import React from 'react'

interface Props {
    artist: string
    title: string
    id: number
}

const Track = (props: Props) => {
  return (
    <div className='track'>
        <h3>{props.title}</h3>
        <h4>{props.title}</h4>
    </div>
  )
}

export default Track

