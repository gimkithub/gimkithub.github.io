// Global
let games = [];
let currentGame;
let isFavorited = false;

// Toolbar
function addToolbarSVG(id, label = null) {
	const toolbar = document.getElementById("toolbar-buttons");

	const btn = document.createElement("button");
	btn.classList.add("btn-secondary");
	btn.id = id;

    const SVG = id.toUpperCase() + "_SVG";
	btn.innerHTML = eval(SVG);

    if (label) {
        const tooltip = document.createElement("span");
        tooltip.classList.add("tooltip");
        tooltip.textContent = label;

        btn.append(tooltip);
    }

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

    addToolbarSVG("share", "Copy Game Link");
	addToolbarSVG("favorite");
	addToolbarSVG("mute");
	addToolbarSVG("fullscreen");
	initFavorite();
	initFullscreen();

	addRandomGames(games);
})();
