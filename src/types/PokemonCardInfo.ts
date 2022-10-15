export interface PokemonCardInfo {
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
}