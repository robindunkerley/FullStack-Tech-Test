import React from 'react'
import Icons from '../../assets'

type Props = {
    handleSearch: (e: any) => void
    handleChange: (e: any) => void
    search: string
}

const SearchBar = (props: Props) => {
  return (
    <form className='search__input-container' onSubmit={props.handleSearch}>
        <div className='search__icon-container'>
            <img className='search__icon' src={Icons.SearchIcon}/>
        </div>
        <input
        className='search__input'
        type='search'
        placeholder='Search for a track'
        value={props.search}
        onChange={(e) => props.handleChange(e.target.value)}
        />
    </form>
  )
}

export default SearchBar