/* eslint-disable @next/next/no-img-element */
import { FC }  from 'react'

import Link from 'next/link'

import { capitalizer } from 'src/utils/Capitalizer'
import { removeMinus } from 'src/utils/RemoveMinus'

interface LinkBoxProps {
  id: number
  side: 'right' | 'left'
  name: string
}

const LinkBox: FC<LinkBoxProps> = ({ id, side, name }) => {
  
  return <Link href={`/${name}`}>
    <div className='flex flex-col justify-center items-center h-36 w-36 border border-gray-300 rounded-xl hover:bg-gray-200 cursor-pointer duration-300'>
      <img className='w-24 h-24' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt={`${name} pixel game image`} />
      <p className='text-lg' >#{ id } { removeMinus(capitalizer(name)) }</p>
    </div>
  </Link>
}

export default LinkBox