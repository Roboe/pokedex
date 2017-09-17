import React, { Component } from 'react'

const PokemonEntryLoaded = ({ name, info }) => (
  <li>
    <span>{`#${info.index}`}</span>
    <span>{info.name}</span>
    <img src={info.picture} alt={`${info.name} in-game`} />
    <ul>
      {info.types.map((type) => <li>{type}</li>)}
    </ul>
    <span>{(info.isEvolutionBase) ? 'Base pokémon' : 'Evolved pokémon' }</span>
  </li>
)

const PokemonEntryLoading = ({ name }) => (
  <li>
    <span>Loading data...</span>
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
