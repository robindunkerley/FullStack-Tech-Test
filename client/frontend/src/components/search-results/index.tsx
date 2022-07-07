import React from 'react'
import './styles/styles.css'

type Props = {
    results: number | null
}

const SearchResults = (props: Props) => {
    const resultText = props.results !== 1 ? 'results' : 'result'
    
    if(props.results === null) return <></>
    
    return (
        <div className='search-results__container'>
            <span className='search-results__results'>{props.results} {resultText}</span>
        </div>
    )
}

export default SearchResults