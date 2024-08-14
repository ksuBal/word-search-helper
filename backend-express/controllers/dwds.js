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

		const frequencyResponse = await fetch(`${baseUrl}/lem/filter/?select=lem_cit,lem_freq_abs&lem_cit__eq=${frequencyData.lemma}`, {
			headers: { "Accept": "application/json" }
		});
		if (!frequencyResponse.ok) {
			throw new Error(`Fetching frequency data failed. Response status: ${frequencyResponse.status}`);
		}

		const lemmaFrequency = await frequencyResponse.json();
		frequencyData.lemmaFrequency = lemmaFrequency.data[0][1];
		frequencyData.lemmaFrequencyLevel = getFrequencyLevel(frequencyData.lemmaFrequency);
		return frequencyData;
	} catch (error) {
		console.error(error.message);
		throw new Error(error);
	}
}

// Same calculation as on DWDS: https://www.dwds.de/d/worthaeufigkeit
function getFrequencyLevel(tokens) {
	if (tokens < 1630) return 0;
	else if (tokens >= 1630 && tokens < 16297) return 1;
	else if (tokens >= 16297 && tokens < 162965) return 2;
	else if (tokens >= 162965 && tokens < 1629647) return 3;
	else if (tokens >= 1629647 && tokens < 16296467) return 4;
	else if (tokens >= 16296467 && tokens < 162964669) return 5;
	else return 6;
}

module.exports = { fetchData };