// Config
const PRESETS = {
	google: { title: "Google", icon: "https://google.com" },
	googledrive: { title: "Google Drive", icon: "https://drive.google.com" },
	desmos: { title: "Desmos", icon: "https://desmos.com/calculator" },
	canvas: { title: "Canvas", icon: "https://canvas.instructure.com" },
	turnitin: { title: "TurnItIn", icon: "https://turnitin.com" },
	collegeboard: { title: "College Board", icon: "https://collegeboard.org" },
};

// Tab Presets
function getFavicon(url, size) {
	return `https://www.google.com/s2/favicons?domain=${url}&sz=${size}`;
}

function changeTab(title, favicon_url) {
	if (title) {
		document.title = title;
		localStorage.setItem("saved-tab-title", title);
	}

	if (favicon_url) {
		const faviconLink = getFavicon(favicon_url, 64);
		const htmlFavicon = document.getElementById("dynamic-favicon");

		htmlFavicon.href = faviconLink;
		localStorage.setItem("saved-tab-icon", faviconLink);
		localStorage.setItem("saved-tab-icon-url", favicon_url);
	}
}

function buildPresets() {
	const presetWrap = document.getElementById("presets");

	for (const presetName in PRESETS) {
		const preset = document.createElement("img");
		const { title, icon } = PRESETS[presetName];

		preset.src = getFavicon(icon, 128);
		preset.dataset.preset = presetName;

		preset.addEventListener("click", () => {
			const urlInput = document.getElementById("tab-icon");
			const tabInput = document.getElementById("tab-title");
			const preview = document.getElementById("icon-preview");

			urlInput.value = icon;
			tabInput.value = title;
			preview.src = getFavicon(icon, 64);

			changeTab(title, icon);
		});

		presetWrap.appendChild(preset);
	}
};

/* Custom Tab Presets
(function initCustomPresets() {
    const presetWrap = document.getElementById("custom-presets");

    for (let i=0; i<4; i++) {
        const preset = document.createElement("img");

        presetWrap.appendChild(preset);
        preset.src = "img/placeholder.png";
    }
})();
*/

// Custom Tab Icon Masking
function buildTabIcon() {
	function isValid(url) {
		const pattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-]*)*$/;
		return pattern.test(url);
	}

	const urlInput = document.getElementById("tab-icon");
	const preview = document.getElementById("icon-preview");
	const savedURL = localStorage.getItem("saved-tab-icon-url");

	if (savedURL) {
		urlInput.value = savedURL;
		preview.src = getFavicon(savedURL, 64);
	}

	urlInput.addEventListener("input", () => {
		if (isValid(urlInput.value)) {
			preview.src = getFavicon(urlInput.value, 64);

			changeTab(null, urlInput.value);
		} else {
			const htmlFavicon = document.getElementById("dynamic-favicon");

			preview.src = "";
			htmlFavicon.href = "img/favicons/favicon-64x64.png";
			localStorage.setItem("saved-tab-icon-url", "");
			localStorage.setItem("saved-tab-icon", "");
		}
	});
};

// Custom Tab Title Masking
function buildTabTitle() {
	const tabInput = document.getElementById("tab-title");

	const originalTitle = "Project-HUB | Settings";
	const savedTitle = localStorage.getItem("saved-tab-title");

	if (savedTitle) tabInput.value = savedTitle;

	tabInput.addEventListener("input", () => {
		const url = tabInput.value.trim();

		if (url.length > 0 && url.length < 64) {
			changeTab(tabInput.value, null);
		} else {
			document.title = originalTitle;
			localStorage.removeItem("saved-tab-title");
		}
	});
};

// Create Persistent Keys
function createToggle(toggleId, cookieName, onChange) {
	const toggle = document.getElementById(toggleId);
	toggle.checked = localStorage.getItem(cookieName) == "true";

	toggle.addEventListener("change", () => {
		localStorage.setItem(cookieName, toggle.checked);

		if (onChange) onChange(toggle.checked);
	});
}

// Advanced Panels
function renderAdvanced() {
	const isRendered = localStorage.getItem("render-advanced") == "true";

	document.querySelectorAll(".advanced").forEach((section) => {
		section.style.display = isRendered ? "block" : "none";
	});
}

// Dark Mode
function buildTheme() {
	const themeToggle = document.getElementById("theme-btn");
	const savedTheme = localStorage.getItem("theme");

	themeToggle.checked = savedTheme == "dark";

	themeToggle.addEventListener("change", () => {
		switchTheme(themeToggle.checked ? "dark" : "light");
	});
};

// Clear Recently Played
function buildClearRecent() {
	const clearBtn = document.getElementById("clear-history-btn");

	clearBtn.addEventListener("click", () => {
		if (getRecentlyPlayed() != "[]") {
			console.info("got recent played");
			localStorage.removeItem("recent-games-played");
		}
	});
};

(function init() {
    createToggle("panic-btn", "panic-toggle");
    createToggle("advanced-btn", "render-advanced", renderAdvanced);
    createToggle("ad-btn", "show-banners");

    renderAdvanced();

    buildPresets();
    buildTabIcon();
    buildTabTitle();
    buildTheme();
    buildClearRecent();
})();

