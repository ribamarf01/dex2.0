/* eslint-disable @next/next/no-img-element */
import { FC } from 'react'

import Head from 'next/head'

import StatBar from 'src/components/StatBar'

import type { GetStaticPaths, GetStaticProps } from "next"

import type { PokemonLink } from "../../types/PokemonLink"
import type { SpeciesInfo } from "../../types/SpeciesInfo"
import type { PokemonDetailedInfo } from "../../types/PokemonDetailedInfo"

interface PokemonInfoProps {
  pokemon: PokemonDetailedInfo
  specs: SpeciesInfo
}

const PokemonInfo: FC<PokemonInfoProps> = ({ pokemon, specs }) => {

  const capitalizer = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

  const replacer = (str: string, char: string) => {
    return str.replaceAll(char, ' ')
  }

  const numberDotPlacer = (str: number | string): string => {
    str = String(str)
    return str.length === 1 ? "0." + str : str.substring(0, str.length - 1) + "." + str[str.length - 1];
  }

  return <div className="flex-1 flex flex-row justify-center items-center">
    <Head>
      <title> | Pokedex!</title>
    </Head>
    <div className='flex-1'></div>
    
    <div className='flex flex-col items-center flex-1'>
      <p className='capitalize text-3xl'>#{ pokemon.id }</p>
      <p className='capitalize text-3xl'>{ pokemon.name }</p>
      <img className='w-64' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} alt="Pokemon image" />
      
      <div className='flex flex-row justify-center text-center w-full gap-x-4'>
        <span className={`border border-black bg-${pokemon.types[0].type.name} text-white capitalize rounded-full w-1/3`}>{pokemon.types[0].type.name}</span>
        { pokemon.types[1] !== undefined ? <span className={`border border-black bg-${pokemon.types[1].type.name} text-white capitalize rounded-full w-1/3`}>{pokemon.types[1].type.name}</span> : ""}
      </div>

      <p className='text-center text-2xl mt-4'>{specs.genera[7].genus}</p>
      <p className='text-center text-lg my-1'>{replacer(specs.flavor_text_entries[0].flavor_text, '')}</p>

      <p className='text-center text-2xl mt-4'>Abilities: </p>
      <div className="flex flex-row gap-x-8">
        { pokemon.abilities.map(item => {
          if(!item.is_hidden) return <span className='capitalize text-lg' key={item.ability.name}> {replacer(item.ability.name, '-')} </span>
          return <span className='capitalize text-lg text-gray-600' key={item.ability.name}>{replacer(item.ability.name, '-')} <abbr className='text-red-500' title='Hidden Ability'> *</abbr> </span>
        }) 
        }
      </div>

      <p className='text-center text-2xl mt-4'>About: </p>
      <div className="flex flex-row gap-x-8">
        <span className='capitalize text-lg'>{ numberDotPlacer(pokemon.height) }m</span>
        <span className='capitalize text-lg'>{ numberDotPlacer(pokemon.weight) }kg</span>
      </div>

      <StatBar stats={pokemon.stats} />
      
    </div>

    <div className='flex-1'></div>
  </div>
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=905`)
  const parsedData = await data.json()

  const links: PokemonLink[] = parsedData.results

  const paths = links.map(item => ({ params: { name: item.name }}))

  return {
    paths,
    fallback: false
  }

}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pokemonData = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`)
  const pokemon = await pokemonData.json() as PokemonDetailedInfo

  const speciesData = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${params.name}`)
  const pokemonSpecs = await speciesData.json() as SpeciesInfo

  let prevNext: string[] = ["", ""]

  if(pokemon.id === 1) {
    prevNext[0] = "https://pokeapi.co/api/v2/pokemon?limit=1&offset=904"
    prevNext[1] = `https://pokeapi.co/api/v2/pokemon?limit=1&offset=${pokemon.id}`
  } else if (pokemon.id === 905) {
    prevNext[0] = `https://pokeapi.co/api/v2/pokemon?limit=1&offset=${pokemon.id - 2}`
    prevNext[1] = `https://pokeapi.co/api/v2/pokemon?limit=1&offset=0`
  } else {
    prevNext[0] = `https://pokeapi.co/api/v2/pokemon?limit=1&offset=${pokemon.id - 2}`
    prevNext[1] = `https://pokeapi.co/api/v2/pokemon?limit=1&offset=${pokemon.id}`
  }

  console.log(await (await fetch(prevNext[0])).json())

  return {
    props: {
      pokemon,
      specs: pokemonSpecs
    }
  }

}

export default PokemonInfo