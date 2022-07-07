import React from 'react'
import './styles/styles.css'

type Props = {
    handleSelect: (selected: boolean) => void
    isSelected: boolean
}

const SearchSelect = (props: Props) => {
  return (
    <div className='search-select__container' >
        <div className='search-select__button' onClick={() => props.handleSelect(!props.isSelected)} style={props.isSelected? {backgroundColor: 'green'} : {}}/>
        <span className='search-select__text'>search by ID</span>
    </div>
  )
}

export default SearchSelect