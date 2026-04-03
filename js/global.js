// First-Time Users
function autoCookies() {
	function setCookie(cookieName, property) {
		if (localStorage.getItem(cookieName) == null) localStorage.setItem(cookieName, property || "true");
	}

	setCookie("panic-toggle");
	setCookie("show-banners");
	setCookie("theme", "dark");
	setCookie("favorited-games", "[]");
	setCookie("panic-site", "https://google.com/");
}

// Theme
function switchTheme(theme) {
	document.documentElement.setAttribute("data-theme", theme);
	localStorage.setItem("theme", theme);
}

function initTheme() {
	const themeToggle = document.getElementById("theme-btn");
	const themeBtn = document.getElementById("theme-toggle");
	const savedTheme = localStorage.getItem("theme");

	if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);

	themeBtn.addEventListener("click", () => {
		document.documentElement.getAttribute("data-theme") == "dark" ? switchTheme("light") : switchTheme("dark");

		if (themeToggle) {
			themeToggle.checked = !themeToggle.checked;
		}
	});
}

// Tab Disguise
function initMask() {
	const favicon = document.getElementById("dynamic-favicon");

	const savedTitle = localStorage.getItem("saved-tab-title");
	const savedIcon = localStorage.getItem("saved-tab-icon");

	if (savedTitle) {
		document.title = savedTitle;
	}
	if (savedIcon && favicon) {
		favicon.href = savedIcon;
	}
}

// Panic Hotkey
function initPanic() {
	let escCount = 0;
	let escTimeout = null;

	document.addEventListener("keydown", (input) => {
		if (input.key !== "Escape" || localStorage.getItem("panic-toggle") == "false") return;

		escCount++;
		clearTimeout(escTimeout);

		escTimeout = setTimeout(() => {
			escCount = 0;
		}, 300);

		if (escCount >= 3) {
			document.location.href = localStorage.getItem("panic-site");
		}
	});
}

// Initialization
(function init() {
	autoCookies();
	initTheme();
	initMask();
	initPanic();
})();
