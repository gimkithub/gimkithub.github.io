// TODO: Move reused input code to a function sometime
// TODO: Add ability to hide ads (when i even get to those)

// Config
const PRESETS = {
	google: { title: "Google", icon: "https://google.com" },
	googledrive: { title: "Google Drive", icon: "https://drive.google.com" },
	desmos: { title: "Desmos", icon: "https://desmos.com/calculator" },
	canvas: { title: "Canvas", icon: "https://canvas.instructure.com" },
	turnitin: { title: "TurnItIn", icon: "https://turnitin.com" },
	collegeboard: { title: "College Board", icon: "https://collegeboard.org" },
};

// Helpers
function getFavicon(url, size) {
	return `https://www.google.com/s2/favicons?domain=${url}&sz=${size}`;
}

function isValid(url) {
    const pattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-]*)*$/;
    return pattern.test(url);
}

// Tab Presets
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
	const urlInput = document.getElementById("tab-icon");
    const inputWrapper = urlInput.parentElement;
	const preview = document.getElementById("icon-preview");
	const savedURL = localStorage.getItem("saved-tab-icon-url");
    let statusTimeout = null;

    const urlStatus = document.createElement("p");
    inputWrapper.appendChild(urlStatus);

	if (savedURL) {
		urlInput.value = savedURL;
		preview.src = getFavicon(savedURL, 64);
	}

	urlInput.addEventListener("input", () => {
        urlStatus.style.display = "block";
        clearTimeout(statusTimeout);

		if (isValid(urlInput.value)) {
            urlStatus.textContent = "✔ Valid URL";
            inputWrapper.classList.add("border-success");
            inputWrapper.classList.remove("border-fail");
            inputWrapper.classList.remove("border-caution");

			preview.src = getFavicon(urlInput.value, 64);
			changeTab(null, urlInput.value);
		} else {
            if (urlInput.value.trim() != "") {
                urlStatus.textContent = "✖ Invalid URL";
                inputWrapper.classList.add("border-fail");
                inputWrapper.classList.remove("border-success");
                inputWrapper.classList.remove("border-caution");
            } else {
                urlStatus.textContent = "⚠ URL Set to Default";
                inputWrapper.classList.remove("border-fail");
                inputWrapper.classList.remove("border-success");
                inputWrapper.classList.add("border-caution");
            }

			const htmlFavicon = document.getElementById("dynamic-favicon");

			preview.src = "";
			htmlFavicon.href = "img/favicons/favicon-64x64.png";
			localStorage.setItem("saved-tab-icon-url", "");
			localStorage.setItem("saved-tab-icon", "");
		}

        statusTimeout = setTimeout(() => {
			urlStatus.style.display = "none";
            urlStatus.textContent = "";
            inputWrapper.classList.remove("border-success");
            inputWrapper.classList.remove("border-fail");
		}, 3000);
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

// Panic Button
function buildPanic() {
    const urlInput = document.getElementById("panic-site");
    const inputWrapper = urlInput.parentElement;
	const savedURL = localStorage.getItem("saved-panic-url");
    let statusTimeout = null;

    const urlStatus = document.createElement("p");
    inputWrapper.appendChild(urlStatus);

	if (savedURL) {
		urlInput.value = savedURL;
	}

	urlInput.addEventListener("input", () => {
        urlStatus.style.display = "block";
        clearTimeout(statusTimeout);

		if (isValid(urlInput.value)) {
            urlStatus.textContent = "✔ Valid URL";
            inputWrapper.classList.add("border-success");
            inputWrapper.classList.remove("border-fail");
            inputWrapper.classList.remove("border-caution");

			localStorage.setItem("saved-panic-url", urlInput.value);
		} else {
            if (urlInput.value.trim() != "") {
                urlStatus.textContent = "✖ Invalid URL";
                inputWrapper.classList.add("border-fail");
                inputWrapper.classList.remove("border-success");
                inputWrapper.classList.remove("border-caution");
            } else {
                urlStatus.textContent = "⚠ URL Set to Default";
                inputWrapper.classList.remove("border-fail");
                inputWrapper.classList.remove("border-success");
                inputWrapper.classList.add("border-caution");
            }

			localStorage.setItem("saved-panic-url", "https://google.com/");
		}

        statusTimeout = setTimeout(() => {
			urlStatus.style.display = "none";
            urlStatus.textContent = "";
            inputWrapper.classList.remove("border-success");
            inputWrapper.classList.remove("border-fail");
            inputWrapper.classList.remove("border-caution");
		}, 3000);
	});
}

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
    renderAdvanced();

    createToggle("panic-btn", "panic-toggle");
    createToggle("advanced-btn", "render-advanced", renderAdvanced);
    // createToggle("ad-btn", "show-banners");

    buildPresets();
    buildTabIcon();
    buildTabTitle();
    buildTheme();
    buildPanic();
    buildClearRecent();
})();

