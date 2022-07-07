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
  const [selected, setSelected] = React.useState(false)

  const endpoint = selected ? 'api/tracks/artist/' : '/api/tracks/id/'

  const handleSearch = async (e: any) => {
    e.preventDefault()
    if(search === '') return;

    const url = `${endpoint}${search}`

    const response = await fetch(url)

    if (!response.ok) {
      throw Error(response.statusText)
    }

    const json = await response.json()

    setResults(json)
    setSearch('')
  }

  console.log(endpoint)

  console.log(results)

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
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px'}}>
          <div style={{height: '15px', width: '15px', border: '1px solid black', borderRadius: '50px'}} onClick={() =>setSelected(!selected)}/>
          <span style={selected ? {color: 'red'} : {color: 'black'}}>search by ID</span>
        </div>
      </Header>
      <DataDisplay>
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
