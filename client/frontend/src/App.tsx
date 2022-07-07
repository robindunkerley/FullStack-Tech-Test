import React, {useEffect} from 'react'; 
import Header from './components/header';
import Track from './components/track';
import DataDisplay from './components/data-display';
import axios from 'axios'
import './App.css';
import Icons from './assets';
import SearchBar from './components/search-bar';
import SearchSelect from './components/search-select';
import SearchResults from './components/search-results';


function App() {
  const [search, setSearch] = React.useState<string>('')
  const [searchDetails, setSearchDetails] = React.useState<number | null>(null)
  const [results, setResults] = React.useState<any[]| null>(null)
  const [loading, setLoading] = React.useState(false)
  const [selected, setSelected] = React.useState(false)

  const endpoint = selected ?  '/api/tracks/id/' : 'api/tracks/artist/'
  const placeholder = selected ? 'Search by track id...' : 'Search by artist name...' 

  const handleSearch = async (e: any) => {
    e.preventDefault()
    if(search === '') return;

    const url = `${endpoint}${search}`

    const response = await fetch(url)

    if (!response.ok) {
      setSearch('')
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
      {searchDetails !== null &&
        <SearchResults results={searchDetails}/>
      }
      {results?.map((data) => {
        return (
          <Track key={data.item.id} artist={data.item.artist} title={data.item.title} id={data.item.id}/>
        )
      })}
      </DataDisplay>
    </div>
  );
}

export default App;
