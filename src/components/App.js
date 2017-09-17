import React, { Component } from 'react'
import PokemonList from './PokemonList'
import SearchInput from './SearchInput'

import { fetchPokemonList, fetchPokemonInfo } from '../api/pokeapi'

const { NUM_PKMN_BY_PAGE, MAX_NUM_PAGES } = require('../config.json')

const extractPokemonFromResource = (resource) => ({
  name: resource.name,
  info: null,
})
const apiParams = {
  limit: MAX_NUM_PAGES * NUM_PKMN_BY_PAGE,
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pokemonStore: [],
      filterByName: '',

      isLoading: true,
    }

    this.updatePokemonList()

    this.setSearchCriteria = this.setSearchCriteria.bind(this)
    this.applySearchCriteria = this.applySearchCriteria.bind(this)
    this.askForPokemonInfo = this.askForPokemonInfo.bind(this)
  }

  updatePokemonList() {
    fetchPokemonList(apiParams)
      .then((response) => {
        this.setState({
          pokemonStore: response.results.map(extractPokemonFromResource),
          isLoading: false,
        })
      })
  }

  askForPokemonInfo(pokemonName) {
    const { pokemonStore } = this.state
    const pokemonData = pokemonStore
      .find((pokemon) => pokemon.name === pokemonName)

    if (pokemonData.info !== null) return
    if (pokemonData.isLoading) return

    fetchPokemonInfo(pokemonData.name)
      .then((info) => {
        pokemonData.info = info
        pokemonData.isLoading = false

        // Since React cannot observe changes inside objects,
        // it is needed to force a re-render
        this.forceUpdate()
      })

    pokemonData.isLoading = true
  }

  setSearchCriteria(criteria) {
    this.setState({
      filterByName: criteria
    })
  }

  applySearchCriteria(pokemon) {
    const search = this.state.filterByName

    return pokemon.name.includes(search)
  }

  render() {
    const { pokemonStore, isLoading } = this.state

    return (
      <div id="pokedex-app" className="pk-structure">
        <SearchInput
          reportCriteria={this.setSearchCriteria}
          isDisabled={isLoading}
        />
        <PokemonList
          store={pokemonStore.filter(this.applySearchCriteria)}
          askForPokemonInfo={this.askForPokemonInfo}
        />
      </div>
    );
  }
}

export default App
