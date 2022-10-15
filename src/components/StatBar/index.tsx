import { FC } from 'react'

interface Stats {
  stats: {
    base_stat: number
  }[]
}

const StatBar: FC<Stats> = ({ stats }) => {

  return <div className='flex flex-col w-full gap-y-2 mt-4'>
    <div className="w-full flex items-center">
      <span className="mx-3 w-3/12">HP</span>
      <div className="w-full rounded-xl bg-hp_fade">
        <div 
          style={{
            width: stats[0].base_stat / 2 > 3 ? `${stats[0].base_stat / 2}%` : `3%`
          }}
          className={`rounded-xl text-center bg-hp`}
        >
          <span className="text-gray-100">{ stats[0].base_stat }</span>
        </div>
      </div>
    </div>
    <div className="w-full flex items-center">
      <span className="mx-3 w-3/12">Attack</span>
      <div className="w-full rounded-xl bg-attack_fade">
        <div 
          style={{
            width: stats[1].base_stat / 2 > 3 ? `${stats[1].base_stat / 2}%` : `3%`
          }}
          className={`rounded-xl text-center bg-attack`}
        >
          <span className="text-gray-100">{ stats[1].base_stat }</span>
        </div>
      </div>
    </div>
    <div className="w-full flex items-center">
      <span className="mx-3 w-3/12">Defense</span>
      <div className="w-full rounded-xl bg-defense_fade">
        <div 
          style={{
            width: stats[2].base_stat / 2 > 3 ? `${stats[2].base_stat / 2}%` : `3%`
          }}
          className={`rounded-xl text-center bg-defense`}
        >
          <span className="text-gray-100">{ stats[2].base_stat }</span>
        </div>
      </div>
    </div>
    <div className="w-full flex items-center">
      <span className="mx-3 w-3/12">Sp Atk</span>
      <div className="w-full rounded-xl bg-sp_atk_fade">
        <div 
          style={{
            width: stats[3].base_stat / 2 > 3 ? `${stats[3].base_stat / 2}%` : `3%`
          }}
          className={`rounded-xl text-center bg-sp_atk`}
        >
          <span className="text-gray-100">{ stats[3].base_stat }</span>
        </div>
      </div>
    </div>
    <div className="w-full flex items-center">
      <span className="mx-3 w-3/12">Sp Def</span>
      <div className="w-full rounded-xl bg-sp_def_fade">
        <div 
          style={{
            width: stats[4].base_stat / 2 > 3 ? `${stats[4].base_stat / 2}%` : `3%`
          }}
          className={`rounded-xl text-center bg-sp_def`}
        >
          <span className="text-gray-100">{ stats[4].base_stat }</span>
        </div>
      </div>
    </div>
    <div className="w-full flex items-center">
      <span className="mx-3 w-3/12">Speed</span>
      <div className="w-full rounded-xl bg-speed_fade">
        <div 
          style={{
            width: stats[5].base_stat / 2 > 3 ? `${stats[5].base_stat / 2}%` : `3%`
          }}
          className={`rounded-xl text-center bg-speed`}
        >
          <span className="text-gray-100">{ stats[5].base_stat }</span>
        </div>
      </div>
    </div>
  </div>
}

export default StatBar