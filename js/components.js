// Navbar
(function initNav() {
	function isActive(href) {
		const currentPage = window.location.pathname;

		if (currentPage.split("/").pop("") == href) return `class="active"`;
	}

	function addLink(href, name) {
		return `
            <a href="${href}" ${isActive(href)}>${name}</a>
        `;
	}

	navbar.innerHTML = `
        <a href="index.html" class="nav-logo">Project-<span>HUB</span></a>

        <div class="nav-links">
            ${addLink("index.html", "Home")}
            ${addLink("games.html", "Games")}
            ${addLink("settings.html", "Settings")}
            ${addLink("about.html", "About")}
        </div>

        <button class="theme-toggle" id="theme-toggle">
            ${SUN_SVG}
            ${MOON_SVG}
        </button>
    `;
})();

// Footer
(function initFooter() {
	const year = new Date().getFullYear();

	footer.innerHTML = `
        ${year} &copy; Christian Santangelo
    `;
})();
