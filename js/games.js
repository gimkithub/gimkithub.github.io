// Global
let games = [];
let activeFilter = "";
let search = "";

// Create Sorted Games List
(async function initGrid() {
	games = await fetchGames();
	games.sort((a, b) => a.gameName.localeCompare(b.gameName));

	renderGrid();
})();

// Filters
(function initFilters() {
	const filters = document.querySelectorAll(".filter");
	const searchInput = document.getElementById("search-input");

	filters.forEach((button) => {
		button.addEventListener("click", () => {
			filters.forEach((filter) => filter.classList.remove("active"));

			if (button.dataset.filter != activeFilter) {
				button.classList.add("active");
				activeFilter = button.dataset.filter;
			} else {
				activeFilter = "";
			}

			renderGrid();
		});
	});

	searchInput.addEventListener("input", () => {
		search = searchInput.value.toLowerCase().trim();
		renderGrid();
	});
})();

// Render (Filtered) Games
function renderGrid() {
	const pills = document.querySelectorAll(".filter");
	let favoritedGames = [];

	if (localStorage.getItem("favorited-games")) {
		favoritedGames = JSON.parse(localStorage.getItem("favorited-games"));
	}

	const filtered = games.filter((game) => {
		const matchesSearch = game.gameName.toLowerCase().includes(search);
		let matchesFilter = !activeFilter;

		pills.forEach((pill) => {
			if (pill.classList.contains("active")) {
				switch (pill.dataset.filter) {
					case "hot": {
						matchesFilter = game.popular;
						break;
					}
					case "favorite": {
						matchesFilter = favoritedGames.includes(game.gameName);
						break;
					}
					default: {
						matchesFilter = game.gameName.includes(pill.dataset.filter);
						break;
					}
				}
			}
		});

		return matchesFilter && matchesSearch;
	});

	const grid = document.getElementById("games-grid");
	grid.innerHTML = "";

	if (!filtered.length) {
		grid.innerHTML = `No games found.`;
	} else {
		filtered.forEach((game) => grid.appendChild(buildGameCard(game)));
	}
}
