const pokemons = document.getElementById('poke_container')
const pokemons_number = 110
const STORAGE_KEY = 'PokemonDB'
let gPokemons = loadFromStorage(STORAGE_KEY) || []

const fetchPokemons = async () => {
    if (gPokemons.length === 0) {
        for (let i = 1; i <= pokemons_number; i++) {
            await getPokemon(i)
        }
        _savePokemonsToStorage()
    } else {
        gPokemons.forEach(createPokemonCard)
    }
}

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`
    const res = await fetch(url);
    const pokemon = await res.json();

    gPokemons.push(pokemon);
    createPokemonCard(pokemon);
}

const createPokemonCard = pokemon => {
    const pokemonEl = document.createElement('div')
    pokemonEl.classList.add('pokemon')
    const { id, name, sprites, types, weight } = pokemon
    const type = types[0].type.name
    const pokeInnerHTML = `
    <div class= 'pokemon_container flex center'>
    <small class='type'>Id: <span>${id}</span></small> 
        <h3 class="name">${name}</h3>
        <div class='img-container'>
            <img src="${sprites.front_default}" alt=${name}>
        </div>
        <div class='info grid'>
            <small class='type'>Type: <span>${type}</span></small> 
            <small class='weight'>Weight: <span>${weight}</span></small>
        </div>
    </div>`;

    pokemonEl.innerHTML = pokeInnerHTML
    pokemons.appendChild(pokemonEl)
}

function refresh() {
    clearStorage(STORAGE_KEY);
}

function _savePokemonsToStorage() {
    saveToStorage(STORAGE_KEY, gPokemons)
}

function saveToStorage(key, val) {
    const str = JSON.stringify(val)
    localStorage.setItem(key, str)
}

function loadFromStorage(key) {
    const str = localStorage.getItem(key)
    const val = JSON.parse(str)
    return val
}

function clearStorage(key) {
    localStorage.removeItem(key)
}

fetchPokemons()
