import React, {useEffect} from 'react'; 
import Header from './components/header';
import Track from './components/track';
import DataDisplay from './components/data-display';
import axios from 'axios'
import './App.css';
import SearchInput from './components/search-input';
import Icons from './assets';


function App() {
  const [search, setSearch] = React.useState<string>('')
  const [results, setResults] = React.useState<any[]| null>(null)
  const [loading, setLoading] = React.useState(false)

  const handleSearch = async (e: any) => {
    e.preventDefault()
    if(search === '') return;

    const endpoint = `api/tracks/artist/${search}`

    const response = await fetch(endpoint)

    if (!response.ok) {
      throw Error(response.statusText)
    }

    const json = await response.json()

    setResults(json)
    setSearch('')
  }

  return (
    <div className="App">
      <Header>
          <form className='search__input-container' onSubmit={handleSearch}>
            <div className='search__icon-container'>
                <img className='search__icon' src={Icons.SearchIcon}/>
            </div>
            <input
            className='search__input'
            type='search'
            placeholder='Search for a track'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />
        </form>
      </Header>
      <DataDisplay>
      {results?.map((data) => {
        return (
          <Track key={data.id} artist={data.artist} title={data.title} id={data.id}/>
        )
      })}
      </DataDisplay>
    </div>
  );
}

export default App;
