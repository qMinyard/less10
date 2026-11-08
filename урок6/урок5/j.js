// let limit = 127
// let url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}`
// let promises=[]
// let pokemons
// let resultElement = document.getElementById("results")

// fetch(url)
// .then(async(response)=>{
//     if (!response.ok) throw new Error(response.statusText);

//     let data = await response.json();

//     data.results.forEach(pokemon => {
//         let promise = fetch(pokemon.url)
//             .then(async (response) => {
//                 if (response.ok) return await response.json();
//                 else throw new Error(response.statusText);
//             });

//         promises.push(promise);
//     });

//     return Promise.all(promises);
// })

// .then((results) =>{
//     console.log(results)
//     sortedPokemons = results
//     sortedPokemons.forEach(pokemon => drawPokemon(pokemon))
// })
// .catch(err => console.error(err))

// function drawPokemon(pokemon) {
//     console.log('ok')
//     let pokemonElement = document.createElement('div');
//     pokemonElement.classList.add('pokemon');

//     pokemonElement.innerHTML = 
//         `<p>id: #${pokemon.id}</p>
//         <hr>
//         <h1>${pokemon.name}</h1>
//         <img src="${pokemon.sprites.front_default}">
//         <div class="stats">
//             <p class="hp">&#10084; ${pokemon.stats[0].base_stat}</p>
//             <p class="attack">&#9876; ${pokemon.stats[1].base_stat}</p>
//             <p class="defence">&#128737; ${pokemon.stats[2].base_stat}</p>
//         </div>`

//     ;

//     let typeList = document.createElement('ul');
//     populateListWithTypes(pokemon.types, typeList);
//     pokemonElement.appendChild(typeList);

//     resultElement.appendChild(pokemonElement);
// }

// function populateListWithTypes(types, ul) {
//     types.forEach(function(type) {
//         let typeItem = document.createElement('li');
//         typeItem.innerText = type.type.name;
//         ul.appendChild(typeItem);
//     });
// }

// function reDrawSortedPokemons() {
//     resultElement.innerHTML = '';
//     sortedPokemons.forEach(pokemon => drawPokemon(pokemon));
// }

// let order = 1;
// let sortForm = document.getElementById('sort-form');

// sortForm.addEventListener('change', function(event) {
//     if (sortedPokemons.length === 0) return;

//     if (event.target.name === 'order') {
//         switch (event.target.value) {
//             case 'upsc':
//                 order = 1;
//                 break;
//             case 'desc':
//                 order = -1;
//                 break;
//         }
//     }
//     switch (sortForm.elements.namedItem('sort').value) {
//         case 'name':
//             sortedPokemons.sort(function(first, second) {
//                 return first.name.localeCompare(second.name) * order;
//             });
//             break;
//     }

//     reDrawSortedPokemons();
// });


// document.getElementById('filter-form').addEventListener('submit', (event)=> {
//     sortedPokemons = pokemons
//     event.preventDefault
// console.log(event.target['name-filter'].value)
//     if(event.target['name-filter'].value){
//         sortedPokemons.filter((pokemon=>{
//             return pokemon.name.indexOf(event.target['name-filter'].value.toLowerCase()) !=-1
//         }))
//     }
        
// })


const LIMIT = 10326;
const API_URL = `https://pokeapi.co/api/v2/pokemon/?limit=${LIMIT}`;

const resultElement = document.getElementById("results");
const statusElement = document.getElementById("status");
const sortForm = document.getElementById("sortForm");
const filterForm = document.getElementById("filter-form");
const nameFilter = document.getElementById("name-filter");

let pokemons = [];

async function loadPokemons() {
    try {
        statusElement.textContent = "Loading Pokémon...";

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        pokemons = await Promise.all(
            data.results.map(async (pokemon) => {
                const response = await fetch(pokemon.url);

                if (!response.ok) {
                    throw new Error(`Failed to load ${pokemon.name}`);
                }

                return response.json();
            })
        );

        updatePokemons();
    } catch (error) {
        console.error(error);
        statusElement.textContent = "Failed to load Pokémon. Check your internet connection and refresh the page.";
    }
}

function getStat(pokemon, statName) {
    return pokemon.stats.find(
        (stat) => stat.stat.name === statName
    )?.base_stat ?? 0;
}

function drawPokemon(pokemon) {
    const element = document.createElement("article");
    element.classList.add("pokemon");

    const image =
        pokemon.sprites.other?.["official-artwork"]?.front_default ||
        pokemon.sprites.front_default;

    const stats = {
        hp: getStat(pokemon, "hp"),
        attack: getStat(pokemon, "attack"),
        defense: getStat(pokemon, "defense")
    };

    element.innerHTML = `
        <p class="pokemon-id">ID: #${pokemon.id}</p>
        <div class="pokemon-image">
            ${image ? `<img src="${image}" alt="${pokemon.name}" loading="lazy">` : ""}
        </div>
        <h2 class="pokemon-name">${pokemon.name}</h2>
        <ul class="types"></ul>
        <div class="stats">
            <div class="stat">
                <span class="stat-icon hp-icon">♥</span>
                <span class="stat-label">HP</span>
                <strong>${stats.hp}</strong>
            </div>
            <div class="stat">
                <span class="stat-icon attack-icon">⚔</span>
                <span class="stat-label">Attack</span>
                <strong>${stats.attack}</strong>
            </div>
            <div class="stat">
                <span class="stat-icon defense-icon">🛡</span>
                <span class="stat-label">Defense</span>
                <strong>${stats.defense}</strong>
            </div>
        </div>
    `;

    const typesList = element.querySelector(".types");

    pokemon.types.forEach(({ type }) => {
        const item = document.createElement("li");
        item.classList.add("type", `type-${type.name}`);
        item.textContent = type.name;
        typesList.appendChild(item);
    });

    resultElement.appendChild(element);
}

function updatePokemons(event) {
    if (event) {
        event.preventDefault();
    }

    const searchValue = nameFilter.value.trim().toLowerCase();

    const hpMin = Number(document.getElementById("hp-min").value);
    const hpMax = Number(document.getElementById("hp-max").value);

    const attackMin = Number(document.getElementById("attack-min").value);
    const attackMax = Number(document.getElementById("attack-max").value);

    const defenseMin = Number(document.getElementById("defense-min").value);
    const defenseMax = Number(document.getElementById("defense-max").value);

    const sortBy = sortForm.elements.namedItem("sort").value;
    const order = sortForm.elements.namedItem("order").value;

    const filteredPokemons = pokemons.filter((pokemon) => {
        const hp = getStat(pokemon, "hp");
        const attack = getStat(pokemon, "attack");
        const defense = getStat(pokemon, "defense");

        return (
            pokemon.name.toLowerCase().includes(searchValue) &&
            hp >= Math.min(hpMin, hpMax) &&
            hp <= Math.max(hpMin, hpMax) &&
            attack >= Math.min(attackMin, attackMax) &&
            attack <= Math.max(attackMin, attackMax) &&
            defense >= Math.min(defenseMin, defenseMax) &&
            defense <= Math.max(defenseMin, defenseMax)
        );
    });

    filteredPokemons.sort((a, b) => {
        const comparison = sortBy === "name"
            ? a.name.localeCompare(b.name)
            : a.id - b.id;

        return order === "asc" ? comparison : -comparison;
    });

    resultElement.replaceChildren();
    filteredPokemons.forEach(drawPokemon);

    statusElement.textContent = filteredPokemons.length
        ? `Pokémon found: ${filteredPokemons.length}`
        : "No Pokémon found.";

    statusElement.hidden = filteredPokemons.length > 0;
    resultElement.hidden = false;
}

sortForm.addEventListener("change", updatePokemons);
filterForm.addEventListener("submit", updatePokemons);

filterForm.addEventListener("reset", () => {
    setTimeout(updatePokemons, 0);
});

document.querySelectorAll('input[type="range"]').forEach((input) => {
    input.addEventListener("input", updatePokemons);
});

nameFilter.addEventListener("input", updatePokemons);

loadPokemons();