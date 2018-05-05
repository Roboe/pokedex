const fse = require('fs-extra')
const requestp = require('request-promise-native')


const ENDPOINT = 'https://pokeapi.co/api/v2'
const GENERATION_TO_FETCH = 1
const DB_PATH = './public/data'
const MAX_CONCURRENCY = 5


function writeJsonToDisk(fileName, json) {
  const fileContent = JSON.stringify(json, null, 2)

  return fse.outputFile(fileName, fileContent)
}


function fetchSpeciesListFromGeneration(generationNum) {
  const speciesToNames = singleSpecies => singleSpecies.name

  return (
    requestp({
      uri: `${ENDPOINT}/generation/${generationNum}`,
      json: true,
    })
    .then((generationData) => generationData['pokemon_species'])
    .then((speciesList) => speciesList.map(speciesToNames))
  )
}

function fetchPokemonResource(id) {
  return (
    requestp({
      uri: `${ENDPOINT}/pokemon/${id}`,
      json: true,
    })
  )
}

function fetchPokemonSpecies(id) {
  return (
    requestp({
      uri: `${ENDPOINT}/pokemon-species/${id}`,
      json: true,
    })
  )
}

function fetchPokemonInfo(id) {
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


async function createDatabase() {
  console.log('Fetching index for first generation...');
  const firstGenSpecies = await fetchSpeciesListFromGeneration(GENERATION_TO_FETCH)
  writeJsonToDisk(`${DB_PATH}/index.json`, firstGenSpecies)
    .then(() => { console.log('"index.json" written to disk') })
    .catch(() => { console.log('Something failed. Couldn\'t write "index.json" to disk.') })

  for (const pokemonName of firstGenSpecies) {
    console.log(`Fetching data for ID: ${pokemonName}`)
    const pokemonInfo = await fetchPokemonInfo(pokemonName)
    writeJsonToDisk(`${DB_PATH}/${pokemonName}.json`, pokemonInfo)
      .then(() => { console.log(`"${pokemonName}.json" written to disk`) })
      .catch(() => { console.log(`Something failed. Couldn\'t write "${pokemonName}.json" to disk.`) })
  }
}

createDatabase()
