import React from 'react'
import './styles/styles.css'

type Props = {
    numberOfResults: number | null
}

const SearchResultNumber = (props: Props) => {
    const resultText = props.numberOfResults !== 1 ? 'results' : 'result'
    
    if(props.numberOfResults === null) return <></>
    
    return (
        <div className='search-results__container'>
            <span className='search-results__results'>{props.numberOfResults} {resultText}</span>
        </div>
    )
}

export default SearchResultNumber