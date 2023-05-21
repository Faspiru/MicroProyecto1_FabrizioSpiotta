const nombreUsuario = document.getElementById("inputQuery")
const buttonIniciar = document.getElementById("iniciarButton")
const buttonReiniciar = document.getElementById("reiniciarButton")
const gameInitializedCode = document.getElementById("GameInitialized")
const juegoIniciadoCode = document.getElementById("tablero")
const tarjetasCode = document.getElementById("stats")
const endInfoContainerCode = document.getElementById("EndGameInfo")
const endInfoStatsCode = document.getElementById("finalMessage")
const laderCode = document.getElementById("laderboardStats")
const laderboardCode = document.getElementById("cardLader");
const laderTitleCode = document.getElementById("laderTitle")

let timeChangerCode = null;
let carta1 = null
let carta2 =  null
let Front1 = null
let Back1 = null
let firstId = null
let secondId = null
let paresConseguidos = 0
let timer = false
let tiempo = 180
let setIntervalId = null
let scoreQueTeniaElUsuario = 0
let cartasAbiertas = 0
buttonReiniciar.disabled = true

let numerosList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
numerosList = numerosList.sort(() => {return Math.random()-0.5})

function clickButtonInicio(buttonReiniciar) {
    const buttonIniciar = document.getElementById("iniciarButton")
    document.getElementById("Inicio-container").style.justifyContent = "start";
    
    nombreUsuario.disabled = true
    buttonReiniciar.disabled = false
    buttonReiniciar.style.cursor = "pointer"
    buttonReiniciar.style.display = "flex"
    buttonIniciar.style.display = "none"
    juegoIniciadoCode.innerHTML = numerosList.map((numero) => {
        return `
        <div class = "card" id =${numero}>
            <div class = "cardFront" id = cardFront${numero} onclick = "revealPhoto(${numero})">
            </div>
            <div class = "cardBack" id = cardBack${numero}>
            </div>
        </div> 
        `
    }).join("");  
    tarjetasCode.innerHTML = `
        <div class = "tarjeta" id = "tarjeta 1">
            <h2 class  = "puntajesLabel" id = "puntajesLabel">
                Puntaje: 0
            </h2>
        </div>
        <div class = "tarjeta" id = "tarjeta 2">
            <h2 class  = "tiempoRestanteLabel" id = "tiempoRestanteLabel">
                Tiempo: 180 segundos
            </h2>
        </div>
        `
}

function clickButtonReinicio() {
    const buttonIniciar = document.getElementById("iniciarButton")
    document.getElementById("Inicio-container").style.justifyContent = "start";
    
    gameInitializedCode.style.display = "flex"
    endInfoContainerCode.style.display = "none"
    laderTitleCode.style.display = "none"

    buttonIniciar.disabled = true
    buttonIniciar.style.cursor = "default"

    numerosList = numerosList.sort(() => {return Math.random()-0.5})
    juegoIniciadoCode.innerHTML = numerosList.map((numero) => {
        return `
        <div class = "card" id =${numero}>
            <div class = "cardFront" id = cardFront${numero} onclick = "revealPhoto(${numero})">
            </div>
            <div class = "cardBack" id = cardBack${numero}>
            </div>
        </div> 
        `
    }).join("");  
    tarjetasCode.innerHTML = `
        <div class = "tarjeta" id = "tarjeta 1">
            <h2 class  = "puntajesLabel" id = "puntajesLabel">
                Puntaje: 0
            </h2>
        </div>
        <div class = "tarjeta" id = "tarjeta 2">
            <h2 class  = "tiempoRestanteLabel" id = "tiempoRestanteLabel">
                Tiempo: 180 segundos
            </h2>
        </div>
        `
}

function saveScore(name, score) {
    let scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.push({ name: name, score: score });
    scores.sort((a, b) => b.score - a.score);
    scores = scores.slice(0, 10);
    localStorage.setItem('scores', JSON.stringify(scores));
}

function getLocalStorageData () {
    const savedScores = JSON.parse(localStorage.getItem('scores'));
    const laderboard = {};
    console.log(savedScores)
    savedScores.forEach(score => {
        const name = score.name;
        console.log(name)
        const actualScore = score.score;
        console.log(actualScore)
        if (laderboard.hasOwnProperty(name) && actualScore > laderboard[name]) {
            laderboard[name] = actualScore;
        } else if (!laderboard.hasOwnProperty(name)){
            laderboard[name] = actualScore;
        }
        console.log(laderboard)
    }); 
    return laderboard
}

function blockCards() {
    for (let index = 1; index <= 16; index++) {
        let puttingPhotoCard = document.getElementById("cardBack"+index)
        puttingPhotoCard.style.cursor = "default"
        puttingPhotoCard.style.backgroundImage = `url("./Unimet\ F${index}.jpeg")`
        Front1 = document.getElementById("cardFront"+index)
        console.log(Front1)
        Front1.style.transform = "perspective(500px) rotateY(180deg)"

        Back1 = document.getElementById("cardBack"+index)
        Back1.style.transform = "perspective(500px) rotateY(360deg)"
    }
    alert("Vaya! parece que se te ha acabado el tiempo")
}

function runTime() {
    setIntervalId = setInterval(() => {
        timeChangerCode = document.getElementById("tiempoRestanteLabel")
        tiempo --;
        timeChangerCode.innerHTML = "Tiempo: " + tiempo + " segundos"
        if (tiempo == 0) {
            clearInterval(setIntervalId);
            blockCards()
        }
    }, 1000);
}

buttonIniciar.addEventListener("click", () => {
    const {value} = nombreUsuario
    if (value == "") {
        alert("Porfavor ingrese un nombre para iniciar")
    } else {
        clickButtonInicio(buttonReiniciar)
    }
})

buttonReiniciar.addEventListener("click", () => {
    laderboardCode.innerHTML = ""
    nombreUsuario.disabled = true
    clearInterval(setIntervalId)
    paresConseguidos = 0
    tiempo = 180
    timer = false
    scoreQueTeniaElUsuario = 0
    const {value} = nombreUsuario
    if (value == "") {
        alert("Porfavor ingrese un nombre para iniciar")
    } else {
        clickButtonReinicio()
    }
})

revealPhoto = (id) => {

    if (timer == false) {
        runTime()
        timer = true
    }

    cartasAbiertas ++
    if(cartasAbiertas == 1) {
        carta1 = document.getElementById("cardBack"+id)
        carta1.style.backgroundImage = `url("./Unimet\ F${id}.jpeg")`
        carta1.disabled = true
        document.getElementById(id).style.cursor = "default"
        firstId = id

        cartaFront1 = document.getElementById("cardFront"+id)
        cartaFront1.style.transform = "perspective(500px) rotateY(180deg)"

        cartaBack1 = document.getElementById("cardBack"+id)
        cartaBack1.style.transform = "perspective(500px) rotateY(360deg)"


    } else if (cartasAbiertas == 2) {
        carta2 = document.getElementById("cardBack"+id)
        carta2.style.backgroundImage = `url("./Unimet\ F${id}.jpeg")`
        carta2.disabled = true
        document.getElementById(id).style.cursor = "default"
        secondId = id

        cartaFront1 = document.getElementById("cardFront"+id)
        cartaFront1.style.transform = "perspective(500px) rotateY(180deg)"
    
        cartaBack1 = document.getElementById("cardBack"+id)
        cartaBack1.style.transform = "perspective(500px) rotateY(360deg)"

        if (firstId == (secondId + 8) || secondId == (firstId + 8)) {
            cartasAbiertas = 0

            scoreChangerCode = document.getElementById("puntajesLabel")
            let puntos = (50 * ((tiempo)/180)) 
            console.log(puntos)
            scoreChangerCode.innerHTML = `Puntaje: ${Math.round(puntos) + scoreQueTeniaElUsuario} puntos`
            scoreQueTeniaElUsuario = Math.round(puntos) + scoreQueTeniaElUsuario


            paresConseguidos++
            if (paresConseguidos  == 8) {
                nombreUsuario.disabled = false
                const {value} = nombreUsuario
                saveScore(value, scoreQueTeniaElUsuario)
                clearInterval(setIntervalId)
                gameInitializedCode.style.display = "none"
                endInfoContainerCode.style.display = "flex"
                laderTitleCode.style.display = "flex"
                endInfoStatsCode.innerHTML = `Felicidades ${value}! haz completado el juego de memoria unimet en ${180-tiempo} segundos y tu puntuacion fue de ${scoreQueTeniaElUsuario} puntos`
                laderCode.style.display = "flex"
                let laderboard = getLocalStorageData()
                console.log(laderboard)
                Object.keys(laderboard).forEach((name, indice) => {
                    laderboardCode.innerHTML += `
                    <h2 class = "laderText" id = "laderText">
                        ${indice + 1}. ${name}: ${laderboard[name]} puntos
                    </h2>
                    `
                })
            }
        } else {
            setTimeout(() => {
                cartaFront1 = document.getElementById("cardFront"+firstId)
                cartaFront1.style.transform = "perspective(500px) rotateY(0deg)"
                cartaBack1 = document.getElementById("cardBack"+firstId)
                cartaBack1.style.transform = "perspective(500px) rotateY(180deg)"

                cartaFront2 = document.getElementById("cardFront"+secondId)
                cartaFront2.style.transform = "perspective(500px) rotateY(0deg)"
                cartaBack2 = document.getElementById("cardBack"+secondId)
                cartaBack2.style.transform = "perspective(500px) rotateY(180deg)"

                carta1.disabled = false
                carta2.disabled = false
                document.getElementById(firstId).style.cursor = "pointer"
                document.getElementById(secondId).style.cursor = "pointer"
                cartasAbiertas = 0
            }, 1000)
        }
    }
}
