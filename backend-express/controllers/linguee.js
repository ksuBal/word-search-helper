const baseUrl = 'https://linguee-api.fly.dev/api/v2';

async function fetchData(lemma) {
	try {
		const response = await fetch(`${baseUrl}/translations/?query=${lemma}&src=de&dst=en&guess_direction=false&follow_corrections=always`);
		if (!response.ok) {
			throw new Error(`Fetching Linguee data failed. Response status: ${response.status}`);
		}
		const lingueeData = await response.json();

		console.log("lingueeData: ", lingueeData)
		return lingueeData.map((data) => {
			const audioFirstPrefix = "https://www.linguee.com/mp3/";
			const audioSecondPrefix = "https://assets.linguee.com/static/";
			const transformedAudioLinks = data["audio_links"]?.map((audioLink) => {
				const transformedAudioLink = (
					audioLink.url.includes(audioFirstPrefix) && audioLink.url.includes(audioSecondPrefix)
				) ? audioLink.url.replace(audioFirstPrefix, "") : audioLink.url;
				return {
					url: transformedAudioLink,
					lang: audioLink.lang,
				}
			});

			console.log("transformedAudioLinks: ", transformedAudioLinks)

			const transformedTranslations = data.translations?.map((translation) => {
				return {
					featured: translation.featured,
					lemma: translation.text,
					pos: translation.pos,
					examples: translation.examples,
				}
			});

			console.log("featured = ", data.featured)
			console.log("lemma = ", data.text)
			console.log("pos = ", data.pos)
			console.log("audioLinks = ", transformedAudioLinks)
			console.log("translations = ", data.translations)

			return {
				featured: data.featured,
				lemma: data.text,
				pos: data.pos, // part of speech
				audioLinks: transformedAudioLinks,
				translations: transformedTranslations,
			}
		});

	} catch (error) {
		console.error(error.message);
		throw new Error(error);
	}
}

module.exports = { fetchData };