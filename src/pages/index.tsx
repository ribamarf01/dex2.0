import { useState, useEffect } from 'react'

import PokemonCard from 'src/components/Card'

import { PokemonLink } from "../types/PokemonLink"
import { PokemonCardInfo } from "../types/PokemonCardInfo"

const Home = () => {

  const [loading, setLoading] = useState<boolean>(true)
  const [pokemonList, setPokemonList] = useState<PokemonCardInfo[]>([])
  let offset = 0

  const fetchData = async () => {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=30&offset=${offset}`)
    const pokemons = await data.json()
    
    const links: PokemonLink[] = pokemons.results
    
    const pokes = await Promise.all(links.map(async link => {
      const data = await fetch(link.url)
      return await data.json() as PokemonCardInfo
    }))
    
    setPokemonList(pokemonList => [...pokemonList, ...pokes])
    offset += 30
  }

  const handleScroll = (e) => {
    if(window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight) {
      setLoading(true)
      fetchData()
      setLoading(false)
    }
  }
 
  useEffect(() => {
    fetchData().catch(err => console.log(err))
    window.addEventListener('scroll', handleScroll)
  }, [])

  return <div className='grid grid-cols-5 w-full place-items-center gap-8'>
    { pokemonList.map(item => <PokemonCard key={item.id} id={item.id} name={item.name} types={item.types} />) }
    { loading ? <div className='w-16 h-16 border-4 border-t-red-500 border-red-400 animate-spin rounded-full col-span-full'><span className='hidden'>loading</span></div> : <></> }
  </div>
}

export default Home