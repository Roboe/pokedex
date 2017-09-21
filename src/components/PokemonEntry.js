import React from 'react'
import PokemonType from './presentational/PokemonType'

const getEvolutionDescription = (isEvolutionBase) => (isEvolutionBase) ? 'Base pokémon' : 'Evolved pokémon'

export default ({ index, name, picture, types, isEvolutionBase }) => {
  const indexText = (!!index) ? `#${index}` : '#'
  const titleText = (!!name) ? name : 'Pokémon'
  const hasPicture = !!picture
  const typesArray = (!!types) ? types : ['?']
  const descriptionText = (isEvolutionBase === undefined) ? 'Loading data' : getEvolutionDescription(isEvolutionBase)

  const pictureElement = (
    <div className="pk-pokemon-slot--element pk-pokemon-picture">
      <img className="pk-pokemon-picture-img"
        src={picture}
        alt={`${titleText} in-game`}
      />
    </div>
  )
  const noPictureElement = (
    <div className="pk-pokemon-slot--element pk-pokemon-picture pk-pokemon-picture_loading" />
  )

  return (
    <li className="pk-pokemon-slot">
      <div className="pk-pokemon-slot--element pk-pokemon-title">
        <span className="pk-pokemon-title--index">{indexText}</span>
        <span className="pk-pokemon-title--name">{titleText}</span>
      </div>
      {(hasPicture) ? pictureElement : noPictureElement}
      <ul className="pk-pokemon-slot--element pk-pokemon-typelist">
        {typesArray.map((type, index) => <PokemonType key={index} type={type} />)}
      </ul>
      <div className="pk-pokemon-slot--element">
        <span>{descriptionText}</span>
      </div>
    </li>
  )
}
