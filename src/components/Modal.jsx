import React from 'react'
import { useState, useEffect } from 'react'  

const Modal = ({setModal, modal, idPokemon}) => {
    const [infoPokemon, setinfoPokemon] = useState([])

    const poke = getPokemon(idPokemon)
    console.log(poke)

    function getPokemon  (id)  {
        const [pokemon, setPokemon] = useState([])
        const getPokemonId = async () => {
            const res = await fetch('https://pokeapi.co/api/v2/pokemon/'+ id)
            const data = await res.json()
            const pokemonTemp = {
                name: data.name,
                img: data.sprites.other.dream_world.front_default,
                hability: data.abilities[0].ability.name,
                types: data.types[0].type.name,
            }
            setPokemon(pokemonTemp)
            return{
              pokemon
            }
        }
        useEffect(() => { getPokemonId() }, [])
        return ( pokemon )

    }


  
    const handleOverlayClick = (e) => {
      if (e.target.classList.contains('bg-black')) {
        setModal(false);
    }
    };
  return (
    
    <>
       {modal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    onClick={handleOverlayClick}>
            <div className="bg-white w-2/5 h-96 p-6 rounded-3xl shadow-md">
                <h className="text-xl font-semibold mb-4 text-red-700">Informacion de{}</h>
                <p className="text-gray-700">Contenido del modal...</p>
                {/* <button className=" bg-blue-500 text-white px-4 py-2 rounded-md mt-auto">Cerrar</button> */}
            </div>
        </div>
        )}

    </>
    
  )
}

export default Modal
