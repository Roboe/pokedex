// Consts
const ENDPOINT = 'https://pokeapi.co/api/v2'
const DEFAULT_PARAMS = {
  limit: 50
}


// Utils
function fetchJSON(url) {
  return fetch(url)
    .then((response) => {
      if (response.ok) return response.json()
      else return Promise.reject(response)
    })
}

function convertToGetParameters(paramsObject) {
  if (Object.keys(paramsObject).length === 0) return ''

  const paramsString = Object.keys(paramsObject)
    .reduce((accumulator, key) => {
      accumulator.push(`${key}=${paramsObject[key]}`);
      return accumulator;
    }, [])
    .join('&')

  return `?${paramsString}`
}


// Functions
export const fetchPokemonList = (params = DEFAULT_PARAMS) => {
  const getParameters = convertToGetParameters(params)
  return fetchJSON(`${ENDPOINT}/pokemon/${getParameters}`)
}

export const fetchPokemonResource = (id) => {
  return fetchJSON(`${ENDPOINT}/pokemon/${id}/`)
}

export const fetchPokemonSpecies = (id) => {
  return fetchJSON(`${ENDPOINT}/pokemon-species/${id}/`)
}

export const fetchPokemonInfo = (id) => {
  return Promise.all([
    fetchPokemonResource(id),
    fetchPokemonSpecies(id),
  ])
  .then(([resource, species]) => {
    return Promise.resolve({
      index: species.pokedex_numbers.find((dexEntry) => dexEntry.pokedex.name === 'national').entry_number,
      name: species.names.find((nameEntry) => nameEntry.language.name === 'en').name,
      types: resource.types.sort((typeEntry) => typeEntry.slot).map((typeEntry) => typeEntry.type.name),
      picture: resource.sprites.front_default,
      isEvolutionBase: species.evolves_from_species === null,
    })
  })
}
