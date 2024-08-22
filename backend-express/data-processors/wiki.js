const cheerio = require('cheerio');

/** TODO: corner case scenario: a noun can be masculine with its meanings but also feminine, depending on the context
 * TODO: corner case scenario: if a verb is entered in a tense other than present, get its infinitive and call wiki endpoint again
 * TODO: add translations as well
 * */
function processFetchedData(htmlData) {
	const $ = cheerio.load(htmlData);
	const title = $('h2').text().split(' ')[0];
	const meanings = $('section [data-mw-section-id=2] p[title="Sinn und Bezeichnetes (Semantik)"] + dl').text();
	const examples= $('section [data-mw-section-id=2] p[title="Verwendungsbeispielsätze"] + dl').text();

	return { lemma: title, meanings: meanings, examples: examples };
}

module.exports = { processFetchedData };