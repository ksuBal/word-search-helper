const wikiProcessor = require("../data-processors/wiki");
const baseUrl = 'https://de.wiktionary.org/api/rest_v1/page/html';

async function fetchData(word) {
	try {
		const response = await fetch(`${baseUrl}/${word}`);
		if (!response.ok) {
			throw new Error(`Fetching Wiki data failed. Response status: ${response.status}`);
		}
		const htmlData = await response.text();
		const data = wikiProcessor.processFetchedData(htmlData);
		if (data) {
			return data;
		} else {
			throw new Error(`Retrieving Wiki data failed.`);
		}
	} catch (error) {
		console.error(error.message);
		throw new Error(error);
	}
}

module.exports = { fetchData };