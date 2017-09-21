import React, { Component } from 'react'
import PokemonEntry from './PokemonEntry'

const hasPokemonInfo = ({ info }) => !!info

class PokemonEntryContainer extends Component {
  componentDidMount() {
    this.requestPokemonInfoIfNeeded(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.requestPokemonInfoIfNeeded(nextProps)
  }

  requestPokemonInfoIfNeeded({ pokemon, askForPokemonInfo }) {
    if (!hasPokemonInfo(pokemon)) {
      askForPokemonInfo(pokemon.name)
    }
  }

  render() {
    const { pokemon } = this.props

    return (
      <PokemonEntry
        {...pokemon.info}
      />
    )
  }
}

export default PokemonEntryContainer
