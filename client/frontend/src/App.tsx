import React from 'react'; 
import Header from './components/header';
import DataDisplay from './components/data-display';
import './App.css';
import SearchBar from './components/search-bar';
import SearchSelect from './components/search-select';
import SearchResults from './components/search-results';
import Tracks from './components/tracks';
import { ResponseData } from './utils/types'

function App() {
  const [search, setSearch] = React.useState<string>('')
  const [searchDetails, setSearchDetails] = React.useState<number | null>(null)
  const [results, setResults] = React.useState<ResponseData | null>(null)
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
      setResults(null)
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
        <SearchResults results={searchDetails}/>
        <Tracks results={results}/>
      </DataDisplay>
    </div>
  );
}

export default App;
