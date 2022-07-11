import React from 'react'; 
import Header from './components/header';
import DataDisplay from './components/data-display';
import './App.css';
import SearchBar from './components/search-bar';
import SearchSelect from './components/search-select';
import SearchResultNumber from './components/search-results';
import Tracks from './components/tracks';
import {EndpointResponse} from '../../../types'

function App() {
  const [search, setSearch] = React.useState<string>('')
  const [searchDetails, setSearchDetails] = React.useState<number | null>(null)
  const [results, setResults] = React.useState<EndpointResponse>([])
  const [selected, setSelected] = React.useState<boolean>(false)

  const endpoint = selected ?  '/api/tracks/id/' : 'api/tracks/artist/'
  const placeholder = selected ? 'Search by track id...' : 'Search by artist name...' 

  const handleSearch = async (e: any) => {
    e.preventDefault()
    if(search === '') return;

    const url = `${endpoint}${search}`

    const response = await fetch(url)

    if (!response.ok) {
      setSearch('')
      setResults([])
      setSearchDetails(0)
      throw Error(response.statusText)
    }

    const json = await response.json()
    setResults(json)
    setSearchDetails(json.length)
    setSearch('')
  }

  return (
    <div className="App">
      <Header>
        <SearchBar handleChange={setSearch} handleSearch={handleSearch} search={search} placeholder={placeholder}/>
        <SearchSelect handleSelect={setSelected} isSelected={selected}/>
      </Header>
      <DataDisplay>
        <SearchResultNumber numberOfResults={searchDetails}/>
        <Tracks results={results}/>
      </DataDisplay>
    </div>
  );
}

export default App;
