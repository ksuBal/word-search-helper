const wikiProcessor = require("../data-processors/wiki");
const wikiBaseUrl = 'https://de.wiktionary.org/api/rest_v1/page/html';

async function fetchData(word) {
	try {
		const response = await fetch(`${wikiBaseUrl}/${word}`);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		const htmlData = await response.text();
		const data = wikiProcessor.retrieveData(htmlData);
		if (data) {
			return data;
		} else {
			throw new Error(`Data retrieval failed.`);
		}
	} catch (error) {
		console.error(error.message);
		throw new Error(error);
	}
}

module.exports = { fetchData };