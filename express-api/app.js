const express = require('express');
const app = express();
const port = 5000;

app.get('/search/:word', async (req, res) => {
	const word = req.params.word;
	const wikiBaseUrl = 'https://de.wiktionary.org/api/rest_v1/page/html';
	try {
		const response = fetch(`${wikiBaseUrl}/${word}`);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		const json = await response.json();
		const data = retrieveWikiData(json);
		if (data) {
			res.status(200).json(data);
		} else {
			throw new Error(`Data retrieval failed.`);
		}
	} catch (error) {
		console.error(error.message);
		res.status(404).send('Word not found');
	}

})

function retrieveWikiData(rawJson) {
	return {};
}

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});