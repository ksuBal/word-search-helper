const dlexDBUrl = 'http://dlexdb.de/sr/dlexdb/kern';
const dwdsUrl = 'https://www.dwds.de/api'

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
		const lemmaResponse = await fetch(`${dlexDBUrl}/typposlem/filter?select=lem_cit&typ_cit__eq=${word}`, {
			headers: { "Accept": "application/json" }
		});
		if (!lemmaResponse.ok) {
			throw new Error(`Fetching lemma data failed. Response status: ${lemmaResponse.status}`);
		}
		const lemma = await lemmaResponse.json();

		if (lemma.data.length === 0) {
			throw new Error(`Lemma for a given word doesn't exist.`);
		}

		const frequencyResponse = await fetch(`${dwdsUrl}/frequency/?q=${lemma.data[0]}`, {
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