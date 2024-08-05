const cheerio = require('cheerio');

function retrieveData(htmlData) {
	const $ = cheerio.load(htmlData);
	const title = $('h2').text().split(' ')[0];
	return { title: title };
}

module.exports = { retrieveData };