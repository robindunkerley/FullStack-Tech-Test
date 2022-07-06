import React from 'react';
import './styles/styles.css';
import Icons from '../../assets/index'

type Props = {}

const SearchInput = (props: Props) => {
  const [input, setInput] = React.useState('')

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log(input)
    setInput('')

  }
  return (
    <form className='search__input-container' onSubmit={handleSubmit}>
        <div className='search__icon-container'>
            <img className='search__icon' src={Icons.SearchIcon}/>
        </div>
        <input 
        onChange={(e) => setInput(e.target.value)}
        value={input}
        className='search__input'
        type='text'
        />
    </form>
  )
}

export default SearchInput