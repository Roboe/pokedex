import React, { Component } from 'react'
import PokemonEntryContainer from './PokemonEntryContainer'

const { NUM_PKMN_BY_PAGE } = require('../config.json')

class PokemonList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentPage: 0,
    }

    this.getPrevPageButton.bind(this)
    this.getNextPageButton.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.store.length !== this.props.store.length) {
      this.setState({
        currentPage: 0,
      })
    }
  }

  lastPageNumber() {
    return Math.ceil(this.props.store.length / NUM_PKMN_BY_PAGE) - 1
  }
  turnPage(numOfPages) {
    this.setState((prevState) => {
      return {
        currentPage: prevState.currentPage + numOfPages
      }
    })
  }
  getPrevPageButton() {
    const isDisabled = this.state.currentPage <= 0
    return (
      <button className="pk-nav-button pk-nav-button_previous"
        onClick={() => this.turnPage(-1)}
        disabled={isDisabled}>
          previous page
      </button>
    )
  }
  getNextPageButton() {
    const isDisabled = this.state.currentPage >= this.lastPageNumber()
    return (
      <button className="pk-nav-button pk-nav-button_next"
        onClick={() => this.turnPage(1)}
        disabled={isDisabled}>
          next page
      </button>
    )
  }

  onlyPokemonInCurrentPage() {
    const pageStartIndex = this.state.currentPage * NUM_PKMN_BY_PAGE
    const pageEndIndex = pageStartIndex + NUM_PKMN_BY_PAGE

    return (pokemon, index) => {
      return index >= pageStartIndex && index < pageEndIndex
    }
  }

  render() {
    const { store, askForPokemonInfo } = this.props

    const pokemonEntriesInCurrentPage = store
      .filter(this.onlyPokemonInCurrentPage())
      .map((pokemon, index) => (
        <PokemonEntryContainer key={index}
          pokemon={pokemon}
          askForPokemonInfo={askForPokemonInfo}
        />
      ))

    return (
      <div className="pk-pokemon-list">
        <nav className="pk-pokemon-list--navigation">
          {this.getPrevPageButton()}
          {this.getNextPageButton()}
        </nav>
        <ul className="pk-pokemon-list--content">
          {pokemonEntriesInCurrentPage}
        </ul>
      </div>
    )
  }
}

export default PokemonList
