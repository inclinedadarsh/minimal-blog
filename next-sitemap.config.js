/** @type {import('next-sitemap').IConfig} */

module.exports = {
	siteUrl: process.env.SITE_URL || "http://localhost:3000",
	generateRobotsTxt: true,
	generateIndexSitemap: false,
	sitemapSize: 1000,
	exclude: ["/blog/*/llms.txt", "/blog/*/opengraph-image"],
};
