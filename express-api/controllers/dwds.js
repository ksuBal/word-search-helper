const FrequencyData = require("../models/frequencyData");

const baseUrl = 'http://dlexdb.de/sr/dlexdb/kern';

async function fetchData(word) {
	try {
		return await fetchFrequency(word);
	} catch (error) {
		console.error(error.message);
		throw new Error(error);
	}
}

async function fetchFrequency(word) {
	try {
		const typeLemmaResponse = await fetch(`${baseUrl}/typposlem/filter/?select=typ_cit,lem_cit&typ_cit__eq=${word}`, {
			headers: { "Accept": "application/json" }
		});
		if (!typeLemmaResponse.ok) {
			throw new Error(`Fetching lemma data failed. Response status: ${typeLemmaResponse.status}`);
		}
		const typeLemma = await typeLemmaResponse.json();

		if (typeLemma.data.length === 0) {
			throw new Error(`Lemma for a given word doesn't exist.`);
		}

		const frequencyData = new FrequencyData(...typeLemma.data[0]);

		const frequencyResponse = await fetch(`${baseUrl}/typ/filter/?select=typ_cit,typ_freq_abs&typ_cit__eq=${frequencyData.lemma}`, {
			headers: { "Accept": "application/json" }
		});
		if (!frequencyResponse.ok) {
			throw new Error(`Fetching frequency data failed. Response status: ${frequencyResponse.status}`);
		}

		const lemmaFrequency = await frequencyResponse.json();
		frequencyData.lemmaFrequency = lemmaFrequency.data[0][1];
		return frequencyData;
	} catch (error) {
		console.error(error.message);
		throw new Error(error);
	}
}

module.exports = { fetchData };