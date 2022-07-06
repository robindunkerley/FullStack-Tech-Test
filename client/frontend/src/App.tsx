import React from 'react'; 
import Header from './components/header';
import DataDisplay from './components/data-display';
import axios from 'axios'
import './App.css';
import SearchInput from './components/search-input';


function App() {
  const [input, setInput] = React.useState<string>('')
  const [data, setData] = React.useState<any[]| null>(null)

    
  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log(input)
    setInput('')
  }

  React.useEffect(() => {
    fetch(`/api/tracks/artist/3am`).then(res => res.json()).then(data => setData(data))
  }, [])


  return (
    <div className="App">
      <Header>
        <SearchInput/>
      </Header>
    </div>
  );
}

export default App;
