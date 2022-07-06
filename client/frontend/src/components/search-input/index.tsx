import React from 'react';
import './styles/styles.css';
import Icons from '../../assets/index'

interface Props {
  handleSubmit: (e: any) => void
  value: string
}

const SearchInput = (props: Props) => {

  return (
    <form className='search__input-container' onSubmit={props.handleSubmit}>
        <div className='search__icon-container'>
            <img className='search__icon' src={Icons.SearchIcon}/>
        </div>
        <input 
        value={props.value}
        className='search__input'
        type='text'
        />
    </form>
  )
}

export default SearchInput