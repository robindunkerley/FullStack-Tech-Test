import React from 'react'
import './styles/styles.css'
import Icons from '../../assets/index'

interface Props {
  children: React.ReactNode
}

const Header = (props: Props) => {
  return (
    <div className='header'>
        {props.children}
    </div>
  )
}

export default Header