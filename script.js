const pageInput = document.getElementById("pageInput")
const searchBtn = document.getElementById("searchBtn")
const resultsDiv = document.getElementById("results")

async function fetchCharacters(page) {
    resultsDiv.innerHTML = "<p>Carregando...</p>"

    try {
        const response = await fetch(`https://thesimpsonsapi.com/api/characters?page=${page}`)
        const data = await response.json()
        console.log(data)

        if (data.error) {
            resultsDiv.innerHTML = "<p>Página inválida! Tente outra. (1/42)</p>"
            return
        }

        const imgBaseUrl = "https://cdn.thesimpsonsapi.com/500"

    resultsDiv.innerHTML = ""

        data.results.forEach(character => {
            const portraitPath = character.portrait_path.startsWith('/')
                ? character.portrait_path.slice(1)
                : character.portrait_path
        
            const card = document.createElement("div")
            card.className = 'card'
            card.innerHTML = `
                <img src="${imgBaseUrl}/${portraitPath}" alt="${character.name}">
                <h3>${character.name}</h3>
                <p><strong>Status:</strong> ${character.status}</p>
                <p><strong>Espécie:</strong> ${character.species}</p>
                <p>"${character.phrases[0]}"</p>
            `
            resultsDiv.appendChild(card)
        })

    } catch (error) {
        // console.log("deu ruim")
        resultsDiv.innerHTML = "<p>Erro ao buscar personagens!!!!</p>"
    }
}

searchBtn.addEventListener("click", () => {
    const page = pageInput.value.trim()
    if(page){
        fetchCharacters(page)
    }else{
        resultsDiv.innerHTML = "<p>Digite um número de página</p>"
    
    }
})

fetchCharacters(1)