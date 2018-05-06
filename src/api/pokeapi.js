// Consts
const DB_PATH = '/data'
const INDEX_PATH = `${DB_PATH}/index.json`


// Utils
function fetchJSON(url) {
  return fetch(url)
    .then((response) => {
      if (response.ok) return response.json()
      else return Promise.reject(response)
    })
}

// Functions
export const fetchPokemonList = () => {
  return fetchJSON(INDEX_PATH)
}

export const fetchPokemonInfo = (id) => {
  return fetchJSON(`${DB_PATH}/${id}.json`)
}
