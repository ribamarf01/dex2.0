/* eslint-disable @next/next/no-img-element */
import { FC } from 'react'

import Link from 'next/link'

import { PokemonCardInfo } from '../../types/PokemonCardInfo'

const PokemonCard: FC<PokemonCardInfo> = ({ id, name, types }) => {

  const borders = () => {
    let border = `border-l-${types[0].type.name} border-t-${types[0].type.name} `
    border += types[1] !== undefined ? `border-r-${types[1].type.name} border-b-${types[1].type.name}` : `border-r-${types[0].type.name} border-b-${types[0].type.name}`

    return border
  }

  return <Link href={`/${name}`}>
    <div className={`${`flex flex-col items-center w-full border-4 rounded-3xl gap-4 p-2 cursor-pointer ` + borders()}`} >
      <p className='text-2xl tracking-wider capitalize'>{name}</p>
      <img className='w-36' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} alt="Pokemon image" loading='lazy' />
      <p className='text-2xl tracking-wider capitalize'>#{id}</p>
      <div className='flex flex-row justify-center text-center w-2/3 gap-x-4'>
        <span className={`border border-black bg-${types[0].type.name} text-white capitalize rounded-full w-2/4`}>{types[0].type.name}</span>
        {types[1] !== undefined ? <span className={`border border-black bg-${types[1].type.name} text-white capitalize rounded-full w-2/4`}>{types[1].type.name}</span> : ""}
      </div>

      <p>Click for more</p>
    </div>
  </Link>
}

export default PokemonCard