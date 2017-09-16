import React, { Component } from 'react'
import PokemonList from './PokemonList'
import SearchInput from './SearchInput'

import { fetchPokemonList } from '../api/pokeapi'

const { NUM_PKMN_BY_PAGE, MAX_NUM_PAGES } = require('../config.json')

const extractPokemonFromResource = (resource) => ({
  name: resource.name,
  hasDetails: false,
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
        />
      </div>
    );
  }
}

export default App
