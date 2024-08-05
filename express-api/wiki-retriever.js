const cheerio = require('cheerio');

function retrieveData(htmlData) {
	const $ = cheerio.load(htmlData);
	const title = $('h2').text().split(' ')[0];
	const meanings = $('section [data-mw-section-id=2] p[title="Sinn und Bezeichnetes (Semantik)"] + dl').text();
	const examples= $('section [data-mw-section-id=2] p[title="Verwendungsbeispielsätze"] + dl').text();

	return { title: title, meanings: meanings, examples: examples };
}

module.exports = { retrieveData };