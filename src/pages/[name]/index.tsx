/* eslint-disable @next/next/no-img-element */
import { FC } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'

import axios from 'axios'
import { gql } from '@apollo/client'
import client from '@global/apollo'

import StatBar from 'src/components/StatBar'
import LinkBox from 'src/components/LinkBox'

import { capitalizer } from 'src/utils/Capitalizer'
import { removeMinus } from 'src/utils/RemoveMinus'

import type { GetStaticPaths, GetStaticProps } from "next"

import type { PokemonLink } from "../../types/PokemonLink"
import type { PokemonDetailedInfo } from "../../types/PokemonDetailedInfo"

interface PokemonInfoProps {
  pokemon: PokemonDetailedInfo
  prev: PokemonLink
  next: PokemonLink
}

const PokemonInfo: FC<PokemonInfoProps> = ({ pokemon, prev, next }) => {

  const router = useRouter()
  let pageTitle = router.query.name ? removeMinus(capitalizer(router.query.name.toString())) + " | Pokedex!" : "Pokedex!"

  const replacer = (str: string, char: string) => str.replaceAll(char, ' ')

  const numberDotPlacer = (str: number | string): string => {
    str = String(str)
    return str.length === 1 ? "0." + str : str.substring(0, str.length - 1) + "." + str[str.length - 1];
  }

  return <div className="flex-1 flex flex-row justify-around items-center">
    <Head>
      <title>{ pageTitle }</title>
    </Head>
    <LinkBox name={prev.name} side='left' id={ pokemon.id === 1 ? 904 : pokemon.id - 1 } />
    
    <div className='flex flex-col items-center w-1/3'>
      <p className='capitalize text-3xl'>#{ pokemon.id }</p>
      <p className='capitalize text-3xl'>{ removeMinus(pokemon.name) }</p>
      <img className='w-64' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} alt="Pokemon image" />
      
      <div className='flex flex-row justify-center text-center w-full gap-x-4'>
        <span className={`border border-black bg-${pokemon.types[0].type.name} text-white capitalize rounded-full w-1/3`}>{pokemon.types[0].type.name}</span>
        { pokemon.types[1] !== undefined ? <span className={`border border-black bg-${pokemon.types[1].type.name} text-white capitalize rounded-full w-1/3`}>{pokemon.types[1].type.name}</span> : ""}
      </div>

      <p className='text-center text-2xl mt-4'>{pokemon.species.species_name[0].genus}</p>
      <p className='text-center text-lg my-1'>{pokemon.species.species_flavor[0].flavor_text}</p>

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

    <LinkBox name={next.name} side='left' id={ pokemon.id === 904 ? 1 : pokemon.id + 1 } />
  </div>
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query({
    query: gql`
      query PokeAPIquery {
        list: pokemon_v2_pokemon(limit: 905) {
          id
          name
        }
      }
    `
  })
  
  const { list } = data

  const paths = list.map(item => {
    return {
      params: {
        name: item.name
      }
    }
  })
  
  return {
    paths,
    fallback: false
  }

}

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { data } = await client.query({
    query: gql`
      query Pokemon($pokemon: String!) {
        pokemon: pokemon_v2_pokemon_aggregate(where: {name: {_eq: $pokemon}}) {
          nodes {
            id
            name
            height
            weight
            types: pokemon_v2_pokemontypes {
              type: pokemon_v2_type {
                name
              }
            }
            abilities: pokemon_v2_pokemonabilities {
              is_hidden
              ability: pokemon_v2_ability {
                name
              }
            }
            stats: pokemon_v2_pokemonstats {
              base_stat
            }
            species: pokemon_v2_pokemonspecy {
              species_name: pokemon_v2_pokemonspeciesnames(where: {pokemon_v2_language: {name: {_eq: "en"}}}) {
                genus
              }
              species_flavor: pokemon_v2_pokemonspeciesflavortexts(where: {pokemon_v2_language: {name: {_eq: "en"}}}, limit: 1) {
                flavor_text
              }
            }
          }
        }
      }   
    `,
    variables: {
      pokemon: params.name
    }

  })

  const pokemon : PokemonDetailedInfo = data.pokemon.nodes[0]

  let prevNext: string[] = ["", ""]

  if(pokemon.id === 1) {
    prevNext[0] = "https://pokeapi.co/api/v2/pokemon?limit=1&offset=903"
    prevNext[1] = `https://pokeapi.co/api/v2/pokemon?limit=1&offset=${pokemon.id}`
  } else if (pokemon.id === 904) {
    prevNext[0] = `https://pokeapi.co/api/v2/pokemon?limit=1&offset=${pokemon.id - 2}`
    prevNext[1] = `https://pokeapi.co/api/v2/pokemon?limit=1&offset=0`
  } else {
    prevNext[0] = `https://pokeapi.co/api/v2/pokemon?limit=1&offset=${pokemon.id - 2}`
    prevNext[1] = `https://pokeapi.co/api/v2/pokemon?limit=1&offset=${pokemon.id}`
  }

  const { results: prev } = await (await axios.get(prevNext[0])).data
  const { results: next } = await (await axios.get(prevNext[1])).data

  return {
    props: {
      pokemon,
      prev: prev[0], 
      next: next[0]
    }
  }

}

export default PokemonInfo