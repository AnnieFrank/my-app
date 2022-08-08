import axios from "axios";
import { useState } from "react";
import "./App.css";

function App() {
  // Declare a new state variable, which we'll call "pokemonName"
  const [pokemonName, setPokemonName] = useState("");

  const POKEMON_BASE_URL = "https://pokeapi.co/api/v2";
  return (
    <div>
      <h1>Pokemon Search</h1>

      <div>
        <label>Pokemon Name</label>
        <br />
        <input
          type="text"
          id="pokemon-name"
          name="pokemon-name"
          onChange={(e) => setPokemonName(e.target.value)}
        />
        <br />
        <button onClick={search}>Search</button>
      </div>

      <p>You have entered {pokemonName}</p>

      <div id="pokemon-result">This will show the result</div>
    </div>
  );

  function search() {
    axios.get(POKEMON_BASE_URL + "/pokemon/" + pokemonName).then((res) => {
      console.log(res.data);
    });
  }
}

export default App;