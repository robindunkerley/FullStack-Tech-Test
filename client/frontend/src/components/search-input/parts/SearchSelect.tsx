import React from 'react'

type Props = {
    artistSearchSelected: boolean
    trackIdSearchSelected: boolean
}

const SearchSelect = (props: Props) => {
  return (
    <div className='search-select'>
        <div className='search-select__option-container'>
            <div className='search-select__button'/>
            <span style={{fontSize: '12px'}}>Artist</span>
        </div>
        <div className='search-select__option-container'>
            <div className='search-select__button'/>
            <span style={{fontSize: '12px'}}>Track Id</span>
        </div>
    </div>
  )
}

export default SearchSelect