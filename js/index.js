// Config
const REVIEWS = [
	{ user: "typicalsneeze", stars: 4, text: "Project-HUB: A serene digital escape - the calm luh website you've been seeking." },
	{ user: "Leggoome", stars: 5, text: "Before I found this website, I had no girlfriend and was a loser. This hasn't changed, but the website is cool." },
	{ user: "Zachary", stars: 4, text: "This game helped me while I was sick and I think it's amazing." },
];

const FEATURED_REVIEW = [
	{
		user: "Want to be featured? <span>&starf;</span>",
		text: `Fill out <a href="https://forms.gle/2jF6mzjqozU8DNXv8" target="_blank">this form</a> to get a chance for your review to appear on the front page!`,
	},
];

// Global
let games = [];

// Reviews
(function initReviews() {
	const scroller = document.getElementById("reviews-scroller");

	function buildReview({ user, stars, text }) {
		const filled = "&starf;".repeat(stars);
		const empty = "&star;".repeat(5 - stars);

		return `
            <div class="review-card">
                <div class="review-header">
					<span class="review-user">${user}</span>
					<span class="review-stars">${filled}${empty}</span>
                </div>

                <p class="review-text">${text}</p>
            </div>
        `;
	}

	const allCards = [...REVIEWS, ...FEATURED_REVIEW, ...FEATURED_REVIEW, ...FEATURED_REVIEW];

	scroller.innerHTML = [...allCards, ...allCards, ...allCards, ...allCards].map(buildReview).join("");
})();

// Recently played
(function initRecentlyPlayed() {
	const grid = document.getElementById("recently-played-grid");
	const recentGames = getRecentlyPlayed();

	if (!recentGames.length) {
		grid.parentElement.style.display = "none";
	}

	recentGames.forEach((game) => grid.appendChild(buildGameCard(game)));
})();

// Panic Modal
(function initModal() {
	const modal = document.getElementById("panic-modal");
	const exitBtn = document.getElementById("modal-btn");

	if (localStorage.getItem("panic-modal-read")) {
		modal.style = "display: none;";
	}

	exitBtn.addEventListener("click", () => {
		modal.style = "display: none;";
		localStorage.setItem("panic-modal-read", "true");
		localStorage.setItem("panic-toggle", "true");
		localStorage.setItem("show-banners", "true");
	});
})();

// Game Counter
function initGameCounter() {
	const count = document.getElementById("game-count");
	count.textContent = `${games.length} GAMES AVAILABLE`;
}

// Initialize
(async function init() {
	games = await fetchGames();

	initGameCounter();
	addRandomGames(games);
})();
