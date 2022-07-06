import React from 'react'
import './styles/styles.css'

type Props = {
  children: React.ReactNode
}

const DataDisplay = (props: Props) => {
  return (
    <div className='data-display__container'>
      <div className='data-display__data-container'>
        {props.children}
      </div>
    </div>
  )
}

export default DataDisplay