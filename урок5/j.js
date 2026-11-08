let limit = 10
let offset = 0

const url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`

let state = ''

fetch(url)
.then(async(response)=>{
    state = await response.json()
    console.log(state)
    drawList()
}
)

function drawList(){
    let pokemonNameList = ''
    state.results.forEach(pokemon => {
        pokemonNameList += `<li><a href="${pokemon.url}">${pokemon.name}</a></li>`;
    });

     wrapper.innerHTML = `<ul>${pokemonNameList}<ul>`

}

prev.addEventListener('click', ()=>{
    fetch(state.previous)
    .then(async()=>{
        state = await response.json()
        console.log(state)
        drawList()
    })
})

next.addEventListener('click', ()=>{
    fetch(state.next)
    .then(async()=>{
        state = await response.json()
        console.log(state)
        drawList()
    })
})