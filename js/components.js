// Navbar
(function initNav() {
	const SUN_SVG = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" viewBox="0 0 800 800" fill="none" stroke="var(--text2)" stroke-width="100">
            <circle cx="400" cy="400" r="125" />
            <path d="M735,436.3l-57.5,57.5c-9.6,9.6-15,22.7-15,36.3v81.3c0,28.3-22.9,51.3-51.2,51.3h-81.3c-13.6,0-26.6,5.4-36.2,15l-57.5,57.5c-20,20-52.4,20-72.5,0l-57.5-57.5c-9.6-9.6-22.6-15-36.2-15h-81.3c-28.3,0-51.2-23-51.2-51.3v-81.3c0-13.6-5.4-26.6-15-36.3l-57.5-57.5c-20-20-20-52.5,0-72.5l57.5-57.5c9.6-9.6,15-22.7,15-36.3v-81.3c0-28.3,22.9-51.3,51.2-51.3h81.3c13.6,0,26.6-5.4,36.2-15l57.5-57.5c20-20,52.4-20,72.5,0l57.5,57.5c9.6,9.6,22.6,15,36.2,15h81.3c28.3,0,51.2,23,51.2,51.3v81.3c0,13.6,5.4,26.6,15,36.3l57.5,57.5c20,20,20,52.5,0,72.5Z"/>
        </svg>
    `;
    
	const MOON_SVG = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" viewBox="0 0 800 800"  fill="none" stroke="var(--text2)" stroke-width="100">
            <path d="M747.7,409.8c1.6.9,2.4,3.7,2.6,7.9-2.1,63.7-24,125.1-57.3,175.6-88.7,137.6-279,198.3-429.4,127.3-101.2-47.7-185.9-145.9-207.4-256.5C16.6,256.4,174.3,60.3,380,50.3c12.3-1,20.9,1.2,8.6,11.6-31.7,26.8-57.1,60.6-72.1,99.4-49.3,124,19,263.9,140.9,310.5,92.5,38.1,208.4,14.7,276.6-53.6,3.8-3.3,10.1-10.3,13.7-8.4Z"/>
        </svg>
    `;

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
