import { GetStaticProps } from "next"

import { PokemonLink } from "../types/PokemonLink"

const Home = ({ pokemons }) => {
  return <h1>Hello WOrld</h1>
}

export const getStaticProps: GetStaticProps = async () => {

  const data = await fetch("https://pokeapi.co/api/v2/pokemon?limit=905")
  const pokemons = await data.json()

  const links: PokemonLink[] = pokemons.results

  console.log(pokemons.results)

  return {
    props: {
      links
    }
  }
}

export default Home