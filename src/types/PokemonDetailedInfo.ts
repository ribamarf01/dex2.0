export interface PokemonDetailedInfo {
  id: number
  name: string
  types: [
    { 
      type: {
        name: string
      }, 
    }, {
      type: {
        name: string
      }
    }?
  ]
  abilities: [
    {
      ability: {
        name: string
        is_hidden: boolean
      }
    }, {
      ability: {
        name: string
        is_hidden: boolean
      }
    }?, {
      ability: {
        name: string
        is_hidden: true
      }
    }?
  ]
  stats: [
    {
      base_stat: number
    }, {
      base_stat: number
    }, {
      base_stat: number
    }, {
      base_stat: number
    }, {
      base_stat: number
    }, {
      base_stat: number
    }
  ]
}