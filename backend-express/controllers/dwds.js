const {fetchLemma} = require("./dlexdb");
const dwdsUrl = 'https://www.dwds.de/api'

async function fetchData(word) {
	try {
		const lemma = await fetchLemma(word);
		return await fetchFrequency(lemma);
	} catch (error) {
		console.error(error.message);
		throw new Error(error);
	}
}

async function fetchFrequency(lemma) {
	try {
		const frequencyResponse = await fetch(`${dwdsUrl}/frequency/?q=${lemma}`, {
			headers: { "Accept": "application/json" }
		});
		if (!frequencyResponse.ok) {
			throw new Error(`Fetching frequency data failed. Response status: ${frequencyResponse.status}`);
		}
		return await frequencyResponse.json();
	} catch (error) {
		console.error(error.message);
		throw new Error(error);
	}
}

module.exports = { fetchData };