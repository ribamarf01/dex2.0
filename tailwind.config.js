/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "src/**/*.tsx"
  ],
  theme: {
    fontFamily: {
      'rslab': ['Roboto Slab'],
      'rubik': ['Rubik']
    },
    extend: {
      colors: {
        fire: '#d93106',
        grass: '#77c43a',
        electric: '#eca81b',
        water: '#328ce4',
        ground: '#ceac54',
        rock: '#b7a255',
        fairy: '#d79ed8',
        poison: '#5d2c5c',
        bug: '#8b990e',
        dragon: '#6f5bca',
        psychic: '#ed4480',
        flying: '#8da1ea',
        fighting: '#8da1ea',
        normal: '#c5c0b6',
        dark: '#513d2d',
        steel: '#b2b1c1',
        ice: '#79d8f5',
        ghost: '#5c5da8',
        hp: '#ff0000',
        hp_fade: '#ff5959',
        attack: '#f08030',
        attack_fade: '#f5ac78',
        defense: '#f8d030',
        defense_fade: '#fae078',
        sp_atk: '#6890f0',
        sp_atk_fade: '#9db7f5',
        sp_def: '#78c850',
        sp_def_fade: '#a7db8d',
        speed: '#f85888',
        speed_fade: '#fa92b2'
      }
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /bg-(fire|grass|electric|water|ground|rock|fairy|poison|bug|dragon|psychic|flying|fighting|normal|dark|steel|ice|ghost)/
    }, {
      pattern: /border-(t|b|r|l)-(fire|grass|electric|water|ground|rock|fairy|poison|bug|dragon|psychic|flying|fighting|normal|dark|steel|ice|ghost)/
    }
  ]
}
