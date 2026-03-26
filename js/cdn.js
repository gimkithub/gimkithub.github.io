// Config
const CDN = "https://iamchristians.github.io/assets/";
const MAX_RECENT = 12;
const MAX_RANDOM_GAMES = 12;

// SVGs
const FAVORITE_SVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 800 800" fill="#E10" stroke-width="100" id="heart_svg">
        <path class="b" d="M750.8,278.8c0,58.6-20,117.1-60.1,161.8l-262.7,292.8c-15,16.7-40.2,16.7-55.2,0L110.1,440.6c-80.2-89.4-80.2-234.2,0-323.6,40.1-44.7,92.6-67,145.1-67s105.1,22.4,145.1,67c80.1-89.3,210.1-89.3,290.3,0,40.1,44.7,60.1,103.2,60.1,161.8Z"/>
    </svg>
`;

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
            ${favoritedGames.includes(game.gameName) ? `<span class="hot-tag favorite-tag">${FAVORITE_SVG}</span>` : ``}
        </div>
        
        <div class="game-title">${game.gameName}</div>
    `;
	/*
    if (favoritedGames && favoritedGames.includes(game.gameName)) {
        const test = document.createElement("h2");
        test.textContent = "test";
        card.appendChild(test)
    }
    */

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
