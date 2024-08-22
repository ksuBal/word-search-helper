const baseUrl = 'https://www.dwds.de/api'

async function fetchData(lemma) {
	try {
		return await fetchFrequency(lemma);
	} catch (error) {
		console.error(error.message);
		throw new Error(error);
	}
}

async function fetchFrequency(lemma) {
	try {
		const frequencyResponse = await fetch(`${baseUrl}/frequency/?q=${lemma}`, {
			headers: { "Accept": "application/json" }
		});
		if (!frequencyResponse.ok) {
			throw new Error(`Fetching frequency data failed. Response status: ${frequencyResponse.status}`);
		}
		const frequencyData = await frequencyResponse.json();
		frequencyData.lemma = lemma;
		return frequencyData;
	} catch (error) {
		console.error(error.message);
		throw new Error(error);
	}
}

module.exports = { fetchData };