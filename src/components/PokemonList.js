import React, { Component } from 'react'

class PokemonList extends Component {
  render() {
    return (
      <div>
        {this.props.store.map((pokemon, index) => <p key={index}>{pokemon.name}</p> )}
        <ul>
          {this.props.store.map((pokemon, index) => <li key={index}>{pokemon.name}</li> )}
        </ul>
      </div>
    )
  }
}

export default PokemonList
