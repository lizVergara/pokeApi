import React from 'react'
import Modal from '../components/Modal'
import usePokemones from '../hooks/usePoke'
import  InfiniteScroll from 'react-infinite-scroll-component'
import { useState, useEffect } from 'react'
import getPokemon from '../hooks/getPokemon'

function PokeCard({id,name,img,types}) 
{
  const [modal, setModal] = useState(false)

  const infoPokemon = () => {

      setModal(true)
  }
    return (
      <>
      <div className="w-30 rounded-2xl bg-yellow-100 shadow-sm px-5 py-5 flex flex-col items-center justify-between shadow-sky-700" onClick={infoPokemon}>
        <h2 className="text-black font-bold mb-2"># {id}</h2>
        <img src={img} alt={name} className="w-full max-h-36 object-contain mb-2" />
        <h1 className="text-black font-bold text-center capitalize text-lg">{name}</h1>
      </div>
      {modal && <Modal setModal={setModal} modal={modal} idPokemon={id} />}
      </>

    
  )
}
const Body = () => {
  const {pokemones, loadMore, more} = usePokemones() 
  return (
    <InfiniteScroll
      dataLength={pokemones.length}
      next={loadMore}
      hasMore={more}
      loader={<h4>Loading...</h4>}
      endMessage={<h3>No mas pokemones</h3>}
    >
     <div className="w-full mx-auto pt-100 px-20 pt-10">
        <div className="grid grid-cols-3 gap-8">
          {pokemones.map((pokemon) => <PokeCard key={pokemon.id} {...pokemon} /> )}
        </div>
      </div>
    </InfiniteScroll>
    )
}

export default Body
