// Config
const CDN = "https://iamchristians.github.io/assets/";
const MAX_RECENT = 12;

// Helpers
function clean(name) {
	return name.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
}

// Fetching
async function fetchGames() {
	const games_json = await fetch(`${CDN}list_games.json`);

	return games_json.json();
}

// Recently Played
function getRecentlyPlayed() {
	return JSON.parse(localStorage.getItem("recent-games-played") || "[]");
}

function recordRecentlyPlayed(game) {
	let recent = getRecentlyPlayed().filter((recentGame) => recentGame.gameName !== game.gameName);
	recent.unshift(game);

	localStorage.setItem("recent-games-played", JSON.stringify(recent.slice(0, MAX_RECENT)));
}

// Launching
function launchGame(game) {
	const gameSrc = `${CDN}${game.gameIndex}`;

	recordRecentlyPlayed(game);

	localStorage.setItem("srcGame", gameSrc);
	window.open("player.html", "_blank");
}

// Cards
function buildGameCard(game) {
	const imgSrc = `${CDN}img/games/${clean(game.gameName)}.webp`;

	const card = document.createElement("a");
	card.className = "game-card";
	card.innerHTML = `
        <div class="game-image">
            <img src="${imgSrc}" alt="${game.gameName}" loading="lazy" onerror="this.src='img/placeholder.png';this.style='image-rendering: pixelated;'" />

            ${game.popular == true ? `<span class="hot-tag">HOT 🔥</span>` : ``}
        </div>
        
        <div class="game-title">${game.gameName}</div>
    `;

	card.addEventListener("click", () => {
		launchGame(game);
	});

	return card;
}
