// Config
const CDN = "https://iamchristians.github.io/assets/";
const MAX_RECENT = 12;
const MAX_RANDOM_GAMES = 12;

// Helpers
function clean(name) {
	return name.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
}

// Fetching
async function fetchGames() {
	const games_json = await fetch(`${CDN}list_games.json`);

    if (!games_json.ok) {
        throw new Error(`${games_json.status}: ${games_json.statusText}`);
    }

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

// Cards
function buildGameCard(game) {
	const cleanGameName = clean(game.gameName);
	const imgSrc = `${CDN}img/games/${cleanGameName}.webp`;
	const favoritedGames = JSON.parse(localStorage.getItem("favorited-games"));

	const card = document.createElement("a");
	card.className = "game-card";
	card.innerHTML = `
        <div class="game-image">
            <img src="${imgSrc}" alt="${game.gameName}" loading="lazy" onerror="this.src='img/placeholder.png';this.style='image-rendering: pixelated;'" />

            ${game.popular ? `<span class="hot-tag">HOT 🔥</span>` : ``}
            ${favoritedGames && favoritedGames.includes(game.gameName) ? `<span class="hot-tag favorite-tag">${FAVORITE_SVG}</span>` : ``}
        </div>
        
        <div class="game-title">${game.gameName}</div>
    `;

	card.addEventListener("click", () => {
		recordRecentlyPlayed(game);

		window.open("player.html?" + cleanGameName, "_blank");
	});

	return card;
}

// Add random games to grid
function addRandomGames(games) {
	const grid = document.getElementById("random-games-grid");
	const randomGames = [...games].sort(() => Math.random() - 0.5).slice(0, MAX_RANDOM_GAMES);

	grid.innerHTML = "";
	randomGames.forEach((game) => grid.appendChild(buildGameCard(game)));
}
