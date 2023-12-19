import { useState } from 'react'


function getPokemon  ({id})  {
    const [pokemon, setPokemon] = useState([])
    console.log('https://pokeapi.co/api/v2/pokemon/'+ id)

}

export default getPokemon;
