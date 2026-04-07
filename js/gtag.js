// Source - https://stackoverflow.com/a/49720545
// Posted by Joshua Berkowitz
// Retrieved 2026-04-06, License - CC BY-SA 3.0

function loadGoogleAnalytics() {
	const ga = document.createElement("script");
	ga.type = "text/javascript";
	ga.async = true;
	ga.src = "https://www.googletagmanager.com/gtag/js?id=G-8TDD592BJ4";

	var s = document.getElementsByTagName("script")[0];
	s.parentNode.insertBefore(ga, s);
}

loadGoogleAnalytics();

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag("js", new Date());

gtag("config", "G-8TDD592BJ4");
