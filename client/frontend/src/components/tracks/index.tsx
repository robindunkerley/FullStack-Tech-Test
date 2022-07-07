import React from 'react'
import Track from '../track/index'

type Props = {
    results: any[] | null
}

const Tracks = (props: Props) => {
  return (
    <>
        {props.results?.map((data) => {
            return <Track key={data.item.id} artist={data.item.artist} title={data.item.title} id={data.item.id}/>
        })}
    </>
  )
}

export default Tracks