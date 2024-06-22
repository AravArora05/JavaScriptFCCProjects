const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input"); 
const nameElement = document.getElementById("pokemon-name");
const idElement = document.getElementById("pokemon-id");

const image = document.getElementById("image")
const weightElement = document.getElementById("weight");
const heightElement = document.getElementById("height"); 
const typesElement = document.getElementById("types"); 
const hpElement = document.getElementById("hp");
const attackElement = document.getElementById("attack");
const defenseElement = document.getElementById("defense");
const specialAttackElement = document.getElementById("special-attack");
const specialDefenseElement = document.getElementById("special-defense");
const speedElement = document.getElementById("speed");

searchButton.addEventListener("click", () => {
    let searching = searchInput.value.toLowerCase(); // Convert to lowercase for consistency
    console.log("Searching for:", searching);

    fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searching}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error("Pokémon not found");
            }
            return res.json();
        })
        .then((pokemon) => {
            console.log("Fetched Pokémon data:", pokemon);
            console.log("Pokémon name:", pokemon.name);
            nameElement.textContent = pokemon.name.toUpperCase();
            idElement.textContent = pokemon.id;
            heightElement.textContent = pokemon.height;
            weightElement.textContent = pokemon.weight;
            attackElement.textContent = pokemon.stats.find(poki => poki.stat.name === "attack").base_stat;
            hpElement.textContent = pokemon.stats.find(poki => poki.stat.name === "hp").base_stat;
            defenseElement.textContent = pokemon.stats.find(poki => poki.stat.name === "defense").base_stat;
            specialAttackElement.textContent = pokemon.stats.find(poki => poki.stat.name === "special-attack").base_stat;
            specialDefenseElement.textContent = pokemon.stats.find(poki => poki.stat.name === "special-defense").base_stat;
            speedElement.textContent = pokemon.stats.find(poki => poki.stat.name === "speed").base_stat;
            
            typesElement.innerHTML = '';

            
            typesElement.innerHTML += pokemon.types.map(type => 
                `<p class="${type.type.name}">${type.type.name.toUpperCase()}</p>`
            ).join('');
            
            image.innerHTML += `<img id="sprite" src="${pokemon.sprites.front_default}">`
        })
        .catch((error) => {
            console.error("Error fetching Pokémon:", error);
            alert("Pokémon not found");
        });
});
