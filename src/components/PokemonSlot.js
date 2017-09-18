import React, { Component } from 'react'
import PokemonType from './presentational/PokemonType'


const PokemonEntryLoaded = ({ name, info }) => (
  <li className="pk-pokemon-slot">
    <div className="pk-pokemon-slot--element pk-pokemon-title">
      <span className="pk-pokemon-title--index">{`#${info.index}`}</span>
      <span className="pk-pokemon-title--name">{info.name}</span>
    </div>
    <div className="pk-pokemon-slot--element pk-pokemon-picture">
      <img className="pk-pokemon-picture-img"
        src={info.picture}
        alt={`${info.name} in-game`}
      />
    </div>
    <ul className="pk-pokemon-slot--element pk-pokemon-typelist">
      {info.types.map((type, index) => <PokemonType key={index} type={type} />)}
    </ul>
    <div className="pk-pokemon-slot--element">
      <span>{(info.isEvolutionBase) ? 'Base pokémon' : 'Evolved pokémon' }</span>
    </div>
  </li>
)

const PokemonEntryLoading = ({ name }) => (
  <li className="pk-pokemon-slot">
    <div className="pk-pokemon-slot--element pk-pokemon-title">
      <span className="pk-pokemon-title--index">#</span>
      <span className="pk-pokemon-title--name">Pokémon</span>
    </div>
    <div className="pk-pokemon-slot--element pk-pokemon-picture pk-pokemon-picture_loading" />
    <ul className="pk-pokemon-slot--element pk-pokemon-typelist">
      <PokemonType type={'?'} />
    </ul>
    <div className="pk-pokemon-slot--element">
      <span>Loading data...</span>
    </div>
  </li>
)

class PokemonSlot extends Component {
  componentDidMount() {
    this.requestPokemonInfoIfNeeded(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.requestPokemonInfoIfNeeded(nextProps)
  }

  hasPokemonInfo({ info }) {
    return !!info
  }

  requestPokemonInfoIfNeeded({ pokemon, askForPokemonInfo }) {
    if (!this.hasPokemonInfo(pokemon)) {
      askForPokemonInfo(pokemon.name)
    }
  }

  render() {
    const { pokemon } = this.props

    if (this.hasPokemonInfo(pokemon)) {
      return (
        <PokemonEntryLoaded
          name={pokemon.name}
          info={pokemon.info}
        />
      )
    } else {
      return (
        <PokemonEntryLoading
          name={pokemon.name}
        />
      )
    }
  }
}

export default PokemonSlot
