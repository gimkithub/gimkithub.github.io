// Global
let games = [];
let currentGame;
let isFavorited = false;

// Toolbar
function addToolbarSVG(id, label = null) {
	const toolbar = document.getElementById("toolbar-buttons");

	const wrapper = document.createElement("div");
	wrapper.classList.add("toolbar-button-wrapper");

	const btn = document.createElement("button");
	btn.classList.add("btn-secondary");
	btn.id = id;

	const SVG = id.toUpperCase() + "_SVG";
	btn.innerHTML = eval(SVG);

	if (label) {
		const tooltip = document.createElement("span");
		tooltip.classList.add("tooltip");
		tooltip.textContent = label;
		tooltip.id = id + "-tooltip";

		btn.append(tooltip);
	}

	wrapper.append(btn);
	toolbar.append(wrapper);
}

function buildShare() {
	addToolbarSVG("share", "Copy Game Link");

	const shareBtn = document.getElementById("share");
	const tooltip = document.getElementById("share-tooltip");

	shareBtn.addEventListener("click", () => {
		try {
			navigator.clipboard.writeText(window.location.href);

			tooltip.textContent = "Link Copied";
			tooltip.classList.add("border-success");
		} catch (error) {
			tooltip.textContent = "Copy Failed";
			tooltip.classList.add("border-fail");
		}

		setTimeout(() => {
			tooltip.textContent = "Copy Game Link";
			tooltip.classList = "tooltip";
		}, 3000);
	});
}

function buildFavorite() {
	addToolbarSVG("favorite");

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

function buildFullscreen() {
	addToolbarSVG("fullscreen");

	const fullscreenBtn = document.getElementById("fullscreen");
	const player = document.getElementById("player");

	fullscreenBtn.addEventListener("click", () => {
		player.requestFullscreen();
	});
}

function buildReport() {
    addToolbarSVG("report", "Report This Game");

    const reportBtn = document.getElementById("report");

    reportBtn.addEventListener("click", () => {
        window.open("https://docs.google.com/forms/d/e/1FAIpQLSeRReCO_upcU9n9MAO6UGGLocosbUnv-SNAUACeN9l0OVKcEw/viewform?usp=pp_url&entry.1163355758=" + currentGame.gameName, "_blank");
    })
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

function loadDetails() {
	const gameDescription = document.getElementById("game-description");
	const gameDetails = document.getElementById("game-details");
    const gameKeys = Object.keys(currentGame);
    const infoButton = document.getElementById("info-btn");

    if (!gameKeys.includes("description") && !gameKeys.includes("details")) {
        infoButton.style.display = "none";
    }

	if (gameKeys.includes("description")) {
		const description = document.createElement("p");
		description.textContent = currentGame["description"];

		gameDescription.append(description);
	} else {
		gameDescription.style.display = "none";
	}

	if (gameKeys.includes("details")) {
		Object.keys(currentGame["details"]).forEach((key) => {
			const detail = document.createElement("div");
			detail.innerHTML = `
                <h4>${key}</h4>
                <p>${currentGame["details"][key]}</p>
            `;

			gameDetails.append(detail);
		});
	} else {
		gameDetails.style.display = "none";
	}
}

// Initialize
(async function init() {
	games = await fetchGames();

	loadGame();
	loadDetails();
    
	buildShare();
    buildReport();
	buildFavorite();
	buildFullscreen();

	addRandomGames(games);
})();
