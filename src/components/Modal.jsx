import React, { useState, useEffect } from 'react';

const Modal = ({ setModal, modal, idPokemon }) => {
  const [pokemonInfo, setPokemonInfo] = useState(null);

  useEffect(() => {
    const getPokemonInfo = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);
        const data = await res.json();

        const pokemonData = {
          name: data.name,
          img: data.sprites.other.dream_world.front_default,
          ability: data.abilities[0].ability.name,
          type: data.types[0].type.name,
          
        };

        setPokemonInfo(pokemonData);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };

    if (modal && idPokemon) {
      getPokemonInfo();
    }
  }, [modal, idPokemon]);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('bg-black')) {
      setModal(false);
    }
  };

  return (
    <>
      {modal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10"
          onClick={handleOverlayClick}
        >
          <div className="bg-blue-100 w-2/3 md:w-1/2 lg:w-1/3 h-auto p-6 rounded-3xl shadow-md text-center z-10">
            {pokemonInfo ? (
              <>
                <h2 className="text-xl font-semibold mb-4 text-red-700">Información de {pokemonInfo.name}</h2>
                <img src={pokemonInfo.img} alt={pokemonInfo.name} className="mx-auto mb-4" />
                <p className="text-gray-700">
                  <strong>Nombre:</strong> {pokemonInfo.name}
                  <br />
                  <strong>Habilidad:</strong> {pokemonInfo.ability}
                  <br />
                  <strong>Tipo:</strong> {pokemonInfo.type}
                </p>
              </>
            ) : (
              <p className="text-gray-700">Cargando información del Pokémon...</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
