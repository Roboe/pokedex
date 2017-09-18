import React from 'react'

const typeColors = {
  bug: 'rgb(151, 165, 29)',
  dark: 'rgb(100, 78, 64)',
  dragon: 'rgb(94, 29, 247)',
  electric: 'rgb(246, 201, 19)',
  fairy: 'rgb(232, 120, 144)',
  flying: 'rgb(142, 111, 235)',
  ice: 'rgb(126, 206, 206)',
  fighting: 'rgb(174, 42, 36)',
  fire: 'rgb(237, 109, 18)',
  ghost: 'rgb(100, 78, 136)',
  grass: 'rgb(105, 194, 61)',
  ground: 'rgb(219, 181, 77)',
  normal: 'rgb(156, 156, 99)',
  poison: 'rgb(146, 58, 146)',
  psychic: 'rgb(247, 54, 112)',
  rock: 'rgb(164, 143, 50)',
  steel: 'rgb(160, 160, 192)',
  water: 'rgb(69, 120, 237)',
}

export default ({ type }) => {
  const style={
    backgroundColor: typeColors[type]
  }

  return (
    <li className="pk-pokemon-typelist--type" style={style}>
      {type}
    </li>
  )
}
