import React, { useState, useEffect } from 'react';
import './Pokemons.css';

const Pokemons = () => {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(response => response.json())
      .then(data => {
        const fetches = data.results.map(p => fetch(p.url).then(res => res.json()));
        Promise.all(fetches).then(results => setPokemon(results));
      });
  }, []);

  const filteredPokemon = pokemon.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="pokemon-list">
      <input
        type="text"
        placeholder="Search Pokémon"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />
      <div className="pokemon-container">
        {filteredPokemon.map(p => (
          <div key={p.id} className="pokemon-card">
            <img src={p.sprites.front_default} alt={p.name} />
            <h3>{p.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pokemons;
