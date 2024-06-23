const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const nameElement = document.getElementById("pokemon-name");
const idElement = document.getElementById("pokemon-id");
const image = document.getElementById("image");
const typesElement = document.getElementById("types");
const statsContainer = document.getElementById("stats-container");

searchButton.addEventListener("click", () => {
    const searching = searchInput.value.toLowerCase();

    fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searching}`)
        .then((res) => {
            
            return res.json();
        })
        .then((pokemon) => {
            
            updateContent(pokemon);
        })
        .catch((error) => {
        
            alert("Pokémon not found");
        });
});

function updateContent(pokemon) {
    nameElement.textContent = pokemon.name;
    idElement.textContent = pokemon.id;

/**
 * Wasn't sure if this was going to work, but I used the innerHTML properties to figure it out
 */

    image.innerHTML = `<img id="sprite" class="w-full h-auto" src="${pokemon.sprites.front_default}" alt="Pokemon Sprite">`;

    // Update types
    typesElement.innerHTML = pokemon.types.map(type => 
        `<p class="type bg-gray-200 p-1 m-1 rounded">${type.type.name.toUpperCase()}</p>`
    ).join('');

    statsContainer.innerHTML = '';

    const pokemonStats = [
        { label: 'Weight', id: 'weight', value: pokemon.weight },
        { label: 'Height', id: 'height', value: pokemon.height },
        { label: 'HP', id: 'hp', value: pokemon.stats.find(stat => stat.stat.name === "hp").base_stat },
        { label: 'Attack', id: 'attack', value: pokemon.stats.find(stat => stat.stat.name === "attack").base_stat },
        { label: 'Defense', id: 'defense', value: pokemon.stats.find(stat => stat.stat.name === "defense").base_stat },
        { label: 'Special Attack', id: 'special-attack', value: pokemon.stats.find(stat => stat.stat.name === "special-attack").base_stat },
        { label: 'Special Defense', id: 'special-defense', value: pokemon.stats.find(stat => stat.stat.name === "special-defense").base_stat },
        { label: 'Speed', id: 'speed', value: pokemon.stats.find(stat => stat.stat.name === "speed").base_stat }
    ];


    statsContainer.innerHTML = pokemonStats.map(stat => 
        `<div class="stat">
            <p>${stat.label}</p>
            <p id="${stat.id}">${stat.value}</p>
        </div>`
    ).join('');

    /**
     * Joined them to make sure that it was done dynamically. Thought it worked fine even if it doesn't appear at the start, have some CSS properties to help with this
     */
}
