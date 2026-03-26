// SVGs
const FULLSCREEN_SVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 800 800" fill="var(--text)">
        <path class="b" d="M374,471.6l-40,149.2c-7.4,27.6-41.9,36.9-62.2,16.7l-19.9-19.9-168,168c-19.2,19.2-50.3,19.2-69.5,0-19.2-19.2-19.2-50.3,0-69.5l168-168-19.9-19.9c-20.2-20.2-11-54.8,16.7-62.2l149.2-40c27.6-7.4,52.9,17.9,45.5,45.5Z"/>
        <path class="b" d="M471.6,426l149.2,40c27.6,7.4,36.9,41.9,16.7,62.2l-19.9,19.9,168,168c19.2,19.2,19.2,50.3,0,69.5-19.2,19.2-50.3,19.2-69.5,0l-168-168-19.9,19.9c-20.2,20.2-54.8,11-62.2-16.7l-40-149.2c-7.4-27.6,17.9-52.9,45.5-45.5Z"/>
        <path class="b" d="M426,328.4l40-149.2c7.4-27.6,41.9-36.9,62.2-16.7l19.9,19.9L716.1,14.4c19.2-19.2,50.3-19.2,69.5,0,19.2,19.2,19.2,50.3,0,69.5l-168,168,19.9,19.9c20.2,20.2,11,54.8-16.7,62.2l-149.2,40c-27.6,7.4-52.9-17.9-45.5-45.5Z"/>
        <path class="b" d="M328.4,374l-149.2-40c-27.6-7.4-36.9-41.9-16.7-62.2l19.9-19.9L14.4,83.9C-4.8,64.7-4.8,33.6,14.4,14.4c19.2-19.2,50.3-19.2,69.5,0l168,168,19.9-19.9c20.2-20.2,54.8-11,62.2,16.7l40,149.2c7.4,27.6-17.9,52.9-45.5,45.5Z"/>
    </svg>
`;

const MUTE_SVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 800 800" fill="var(--text)">
        <path class="b" d="M374,471.6l-40,149.2c-7.4,27.6-41.9,36.9-62.2,16.7l-19.9-19.9-168,168c-19.2,19.2-50.3,19.2-69.5,0-19.2-19.2-19.2-50.3,0-69.5l168-168-19.9-19.9c-20.2-20.2-11-54.8,16.7-62.2l149.2-40c27.6-7.4,52.9,17.9,45.5,45.5Z"/>
    </svg>
`;

// Global
let games = [];
let currentGame;
let isFavorited = false;

// Toolbar
function addToolbarSVG(id) {
	const toolbar = document.getElementById("toolbar-buttons");

	const btn = document.createElement("button");
	btn.classList.add("btn-secondary");
	btn.id = id;

	const SVG = id.toUpperCase() + "_SVG";
	btn.innerHTML = eval(SVG);

	toolbar.append(btn);
}

function initFavorite() {
	const heartBtn = document.getElementById("favorite");
	const heartSVG = document.getElementById("heart_svg");

	heartSVG.style.fill = "transparent";
	heartSVG.style.stroke = "var(--text)";

	let favoritedGames = localStorage.getItem("favorited-games");
	if (favoritedGames) {
		favoritedGames = JSON.parse(favoritedGames);
		isFavorited = favoritedGames.includes(currentGame.gameName);

		if (isFavorited) {
			heartSVG.style.fill = "red";
			heartSVG.style.stroke = "red";
		}
	} else {
		favoritedGames = [];
	}

	heartBtn.addEventListener("click", () => {
		if (!isFavorited) {
			heartSVG.style.fill = "red";
			heartSVG.style.stroke = "red";

			favoritedGames.push(currentGame.gameName);
		} else {
			heartSVG.style.fill = "transparent";
			heartSVG.style.stroke = "var(--text)";

			const indexOfGame = favoritedGames.indexOf(currentGame.gameName);
			favoritedGames.splice(indexOfGame, 1);
		}

		isFavorited = !isFavorited;
		localStorage.setItem("favorited-games", JSON.stringify(favoritedGames));
	});
}

function initFullscreen() {
	const fullscreenBtn = document.getElementById("fullscreen");
	const player = document.getElementById("player");

	fullscreenBtn.addEventListener("click", () => {
		player.requestFullscreen();
	});
}

// Game loading
function loadGame() {
	const player = document.getElementById("player");
	const gameTitle = document.getElementById("game-name");
	const urlGameName = location.search.split("?")[1];

	games.forEach((game) => {
		if (clean(game.gameName) == urlGameName) {
			currentGame = game;
		}
	});

	player.src = `${CDN}${currentGame.gameIndex}`;
	gameTitle.textContent = currentGame.gameName;
}

// Initialize
(async function init() {
	games = await fetchGames();

	loadGame();

	addToolbarSVG("favorite");
	addToolbarSVG("mute");
	addToolbarSVG("fullscreen");
	initFavorite();
	initFullscreen();

	addRandomGames(games);
})();
