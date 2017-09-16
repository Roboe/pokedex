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

export const fetchPokemonInfo = (id) => {
  return fetchJSON(`${ENDPOINT}/pokemon/${id}/`)
}
