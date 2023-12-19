import { useState, useEffect } from 'react'
const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'


function usePokemones(){
    const [pokemones, setPokemones] = useState([])
    const [nexturl, setNexturl] = useState('')
    const [more, setMore] = useState(true)

    //por cada map se ejecuta una peticion y se extrae un pokemon

    const getPokemones = async (url = API_URL) => {
        const res = await fetch(url)
        const data = await res.json()
        const {next, results } = data
        const newPokemones = await Promise.all(results.map( async (pokemon) => {
            const response = await fetch(pokemon.url)
            const poke = await response.json()
            return {
              id: poke.id,
              name: poke.name,
              img: poke.sprites.other.dream_world.front_default,
              types: poke.types
            }
          })
        )
        return{
          newPokemones,
          next
        }
        // next contiene la sgte url que se necesita para hacer la sgte peticion
    }
  
    const defaultPokemones = async () => {
        const { next, newPokemones} = await getPokemones()
        setPokemones(newPokemones)
        setNexturl(next)
    }

    const loadMore = async () => {
        const { next, newPokemones} = await getPokemones(nexturl)
        setPokemones(prev => [...prev, ...newPokemones])
        next === null ? setMore(false) : setMore(true)
        setNexturl(next)
    }

    useEffect(() => { defaultPokemones() }, [])
    return { pokemones, loadMore, more }
}

export default usePokemones;