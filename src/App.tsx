import { useState } from 'react';
import './App.css';

function App() {
  // Declare a new state variable, which we'll call "pokemonName"
  const [pokemonName, setPokemonName] = useState("");

  return (
    <div>
      <h1>
        Pokemon Search
      </h1>
      
      <div>
        <label>Pokemon Name</label><br/>
        <input type="text" id="pokemon-name" name="pokemon-name" onChange={e => setPokemonName(e.target.value)}/><br/>
        <button onClick={search}>
        Search
        </button>
      </div>

      <p>
        You have entered {pokemonName}
      </p>
    </div>
  );

  function search(){
      alert("Search button has been clicked!");
  }
}

export default App;