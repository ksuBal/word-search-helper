const {fetchLemma} = require("./dlexdb");
const baseUrl = 'https://linguee-api.fly.dev/api/v2';

async function fetchData(word) {
	try {
		const lemma = await fetchLemma(word);
		const response = await fetch(`${baseUrl}/translations/?query=${lemma}&src=de&dst=en&guess_direction=false&follow_corrections=always`);
		if (!response.ok) {
			throw new Error(`Fetching Linguee data failed. Response status: ${response.status}`);
		}
		const lingueeData = await response.json();
		return lingueeData.map((data) => {
			return {
				featured: data.featured,
				lemma: data.text,
				pos: data.pos, // part of speech
				audioLinks: data.audio_links,
				translations: data.translations,
				examples: data.examples
			}
		});

	} catch (error) {
		console.error(error.message);
		throw new Error(error);
	}
}

module.exports = { fetchData };