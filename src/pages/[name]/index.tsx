import { FC } from 'react'

import { GetStaticPaths, GetStaticProps } from "next"

import { PokemonLink } from "../../types/PokemonLink"
import { PokemonDetailedInfo } from "../../types/PokemonDetailedInfo"

interface PokemonInfoProps {
  pokemon: PokemonDetailedInfo
}

const PokemonInfo: FC<PokemonInfoProps> = ({ pokemon }) => {
  return <h1>{pokemon.stats[0].base_stat}</h1>
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
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`)
  const pokemon = await data.json() as PokemonDetailedInfo

  return {
    props: {
      pokemon 
    }
  }

}

export default PokemonInfo