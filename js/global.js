// First-Time Users
(function autoCookies() {
	if (localStorage.getItem("panic-toggle") == null) {
		localStorage.setItem("panic-toggle", "true");
	}

	if (localStorage.getItem("show-banners") == null) {
		localStorage.setItem("show-banners", "true");
	}

	if (localStorage.getItem("theme") == null) {
		localStorage.setItem("theme", "dark");
	}
})();

// Theme
function switchTheme(theme) {
	document.documentElement.setAttribute("data-theme", theme);
	localStorage.setItem("theme", theme);
}

(function initTheme() {
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
})();

// Tab Disguise
(function initMask() {
	const favicon = document.getElementById("dynamic-favicon");

	const savedTitle = localStorage.getItem("saved-tab-title");
	const savedIcon = localStorage.getItem("saved-tab-icon");

	if (savedTitle) {
		document.title = savedTitle;
	}
	if (savedIcon && favicon) {
		favicon.href = savedIcon;
	}
})();

// Panic Hotkey
(function initPanic() {
	let escCount = 0;
	let escTimer = null;

	document.addEventListener("keydown", (input) => {
		if (input.key !== "Escape" || localStorage.getItem("panic-toggle") == "false") return;

		console.info("escape " + escCount);
		escCount++;
		clearTimeout(escTimer);

		escTimer = setTimeout(() => {
			escCount = 0;
		}, 300);

		if (escCount >= 3) {
			console.warn("get sent slime");
			document.location.href = "https://www.google.com/";
		}
	});
})();
