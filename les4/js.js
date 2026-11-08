const url = `https://pokeapi.co/api/v2/pokemon/`

const submitButton = document.getElementById('submit')
const userInput = document.getElementById('userInput')
const wrapper = document.getElementById('wrapper')

submitButton.addEventListener('click', (e)=>{
    e.preventDefault()
    let userChoise = userInput.value.trim()
    userInput.value = ''
    console.log(url+userChoise)
    fetch(url+userChoise)
    .then(async (pokemonInfo) => {
        if(pokemonInfo.status > 300){
            wrapper.innerHTML = `There is no such pokemon!`
        }
        else{
            let pokemon = await pokemonInfo.json()
        console.log(pokemon)
        drawPokemon(pokemon)
        }
    })
    .catch((err)=>{
        console.log(err)
        wrapper.innerHTML = `There was some error during search! Try again later!`
    })
})

function drawPokemon(pokemonchik) {
    let pokemonAbilitiesList = ''
    pokemonchik.abilities.forEach(parametr => {
        pokemonAbilitiesList += `<li>${parametr.ability.name}</li>`
    })
    console.log(pokemonAbilitiesList)

    wrapper.innerHTML = `
        <div class="card" id="card">
            <img class="pokemonImg" src="${pokemonchik.sprites.front_default}" alt="Pockemon's image">
            <h2 class="pokemonName">${pokemonchik.name}</h2>
            <p class="pokemonId">ID: ${pokemonchik.id}</p>
            <p class="pokemonAbilities">Abilities:</p>
            <ul class="pokemonAbilitiesList">${pokemonAbilitiesList}</ul>
            <p class="pokemonHeight">Height: ${pokemonchik.height}</p>
            <p class="pokemonWeight">Weight: ${pokemonchik.weight}</p>
        </div>
    `
}