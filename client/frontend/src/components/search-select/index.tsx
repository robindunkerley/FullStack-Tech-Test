import React from 'react'

type Props = {
    handleSelect: (selected: boolean) => void
    isSelected: boolean
}

const SearchSelect = (props: Props) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px'}}>
        <div style={{height: '15px', width: '15px', border: '1px solid black', borderRadius: '50px'}} onClick={() => props.handleSelect(!props.isSelected)}/>
        <span style={props.isSelected ? {color: 'red'} : {color: 'black'}}>search by ID</span>
    </div>
  )
}

export default SearchSelect