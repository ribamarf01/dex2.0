import { useState, useEffect } from 'react'

import Head from 'next/head'

import PokemonCard from 'src/components/Card'

import { PokemonLink } from "../types/PokemonLink"
import { PokemonCardInfo } from "../types/PokemonCardInfo"

const Home = () => {

  let offset = 0

  const [loading, setLoading] = useState<boolean>(true)
  const [pokemonList, setPokemonList] = useState<PokemonCardInfo[]>([])

  const fetchData = async () => {

    setLoading(loading => true)

    const data = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=30&offset=${offset}`)
    const pokemons = await data.json()
    
    const links: PokemonLink[] = pokemons.results
    
    const pokes = await Promise.all(links.map(async link => {
      const data = await fetch(link.url)
      return await data.json() as PokemonCardInfo
    }))
    
    setPokemonList(pokemonList => {
      offset = offset + 30
      return [...pokemonList, ...pokes]
    })
  }

  const handleScroll = (e) => {
    if(window.innerHeight + e.target.documentElement.scrollTop === e.target.documentElement.offsetHeight) {
      fetchData()
      setLoading(loading => false)
    }
  }
 
  useEffect(() => {
    fetchData()
    setLoading(loading => false)
    window.addEventListener('scroll', handleScroll)
  }, [])

  return <div className='grid grid-cols-5 w-full place-items-center gap-8'>
    <Head>
      <title>Pokedex!</title>
    </Head>
    { pokemonList.map(item => <PokemonCard key={item.id} id={item.id} name={item.name} types={item.types} />) }
    { loading ? <div className='w-16 h-16 border-4 border-t-red-500 border-red-400 animate-spin rounded-full col-span-full'><span className='hidden'>loading</span></div> : <></> }
  </div>
}

export default Home