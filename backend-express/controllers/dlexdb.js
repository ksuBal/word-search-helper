const baseUrl = 'http://dlexdb.de/sr/dlexdb/kern';

// TODO: Make sure to cache this value to avoid calling the external API multiple times
async function fetchLemma(word) {
	try {
		const lemmaResponse = await fetch(`${baseUrl}/typposlem/filter?select=lem_cit&typ_cit__eq=${word}`, {
			headers: { "Accept": "application/json" }
		});
		if (!lemmaResponse.ok) {
			throw new Error(`Fetching lemma data failed. Response status: ${lemmaResponse.status}`);
		}
		const lemma = await lemmaResponse.json();

		if (lemma.data.length === 0) {
			throw new Error(`Lemma for a given word doesn't exist.`);
		}

		return lemma.data[0];
	} catch (error) {
		console.error(error.message);
		throw new Error(error);
	}
}

module.exports = { fetchLemma };