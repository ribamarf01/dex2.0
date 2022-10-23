import { useState, useEffect, FC } from 'react'

import Head from 'next/head'

import { gql } from "@apollo/client"
import client from "@global/apollo"

import PokemonCard from 'src/components/Card'

import { PokemonLink } from "../types/PokemonLink"
import { PokemonCardInfo } from "../types/PokemonCardInfo"

import type { GetStaticProps } from 'next'

interface HomeProps {
  pokemonList: PokemonCardInfo[]
}

const Home: FC<HomeProps> = ({ pokemonList }) => {

  return <div className='grid grid-cols-5 w-full place-items-center gap-8'>
    <Head>
      <title>Pokedex!</title>
    </Head>
    { pokemonList.map(item => <PokemonCard key={item.id} id={item.id} name={item.name} types={item.types} />) }
  </div>
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query PokeAPIquery {
        pokemon: pokemon_v2_pokemon(limit: 905) {
          id
          name
          types: pokemon_v2_pokemontypes {
            type:pokemon_v2_type {
              name
            }
          }
        }
      }
    `
  })

  console.log(data.pokemon)

  return {
    props: {
      pokemonList: data.pokemon
    }
  }
}

export default Home