
let currentRoomCode = "";
let playersProgress = [];
let finishedPlayers = [];
let currentPlayerIndex = 0;
let timer;
let currentQuestion = {};

const mapCountries = [
    { country: "Brasil", flag: "🇧🇷" },
    { country: "Estados Unidos", flag: "🇺🇸" },
    { country: "Canadá", flag: "🇨🇦" },
    { country: "Países Baixos", flag: "🇳🇱" },
    { country: "Alemanha", flag: "🇩🇪" },
    { country: "França", flag: "🇫🇷" },
    { country: "Itália", flag: "🇮🇹" },
    { country: "Espanha", flag: "🇪🇸" },
    { country: "Rússia", flag: "🇷🇺" },
    { country: "Angola", flag: "🇦🇴" },
    { country: "Nigéria", flag: "🇳🇬" },
    { country: "Cazaquistão", flag: "🇰🇿" },
    { country: "Arábia Saudita", flag: "🇸🇦" },
    { country: "Emirados Árabes Unidos", flag: "🇦🇪" },
    { country: "Iraque", flag: "🇮🇶" },
    { country: "Índia", flag: "🇮🇳" },
    { country: "China", flag: "🇨🇳" },
    { country: "Japão", flag: "🇯🇵" },
    { country: "Coreia do Sul", flag: "🇰🇷" },
    { country: "Tailândia", flag: "🇹🇭" },
    { country: "Singapura", flag: "🇸🇬" }
];

function generateRoomCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    currentRoomCode = code;
    document.getElementById('roomCode').textContent = currentRoomCode;
}

document.getElementById('generateCodeBtn').addEventListener('click', generateRoomCode);

function joinRoom(inputCode) {
    if (inputCode === currentRoomCode) {
        document.getElementById('waitingRoom').style.display = "block";
        document.getElementById('joinRoomArea').style.display = "none";
        document.getElementById('worldMap').style.display = "block";

        const playerName = prompt("Digite seu nome:");
        const playerCountry = prompt("Escolha seu país:");

        playersProgress.push({
            name: playerName,
            country: playerCountry,
            correctAnswers: 0
        });

        updatePlayersList();
        updateMap();

    } else {
        alert("Código errado! Tente novamente.");
    }
}

function tryJoin() {
    const inputCode = document.getElementById('playerRoomCode').value.toUpperCase();
    joinRoom(inputCode);
}

function updatePlayersList() {
    const list = document.getElementById('playerList');
    list.innerHTML = "";
    playersProgress.forEach(player => {
        const item = document.createElement('div');
        item.innerText = `${player.country} - ${player.name}`;
        list.appendChild(item);
    });
}

function updateMap() {
    const mapContainer = document.getElementById('mapContainer');
    mapContainer.innerHTML = "";

    mapCountries.forEach((location, index) => {
        const countryDiv = document.createElement('div');
        countryDiv.innerHTML = `
            <strong>${location.flag} ${location.country}</strong>
            <div id="playersAt_${index}"></div>
        `;
        mapContainer.appendChild(countryDiv);
    });

    playersProgress.forEach(player => {
        const position = Math.min(player.correctAnswers, mapCountries.length - 1);
        const playerDiv = document.createElement('div');
        playerDiv.style.fontSize = "12px";
        playerDiv.innerHTML = `<span>${player.country} - ${player.name}</span>`;
        document.getElementById(`playersAt_${position}`).appendChild(playerDiv);
    });
}

document.getElementById('updateMapBtn').addEventListener('click', updateMap);

function showPodium() {
    let podiumHTML = `
        <h1>🏆 Corrida Finalizada!</h1>
        <h2>🥇 1º Lugar: ${finishedPlayers[0]?.name || "Nenhum"}</h2>
        <h2>🥈 2º Lugar: ${finishedPlayers[1]?.name || "Nenhum"}</h2>
        <h2>🥉 3º Lugar: ${finishedPlayers[2]?.name || "Nenhum"}</h2>
        <h3>Parabéns a todos!</h3>
    `;
    document.getElementById('waitingRoom').innerHTML = podiumHTML;
}
