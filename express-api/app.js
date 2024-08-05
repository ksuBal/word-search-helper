const express = require('express');
const app = express();
const wikiRetriever = require('./wiki-retriever');

const port = 5000;

app.get('/search/:word', async (req, res) => {
	const word = req.params.word;
	const wikiBaseUrl = 'https://de.wiktionary.org/api/rest_v1/page/html';
	try {
		const response = await fetch(`${wikiBaseUrl}/${word}`);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		const htmlData = await response.text();
		const data = wikiRetriever.retrieveData(htmlData);
		if (data) {
			res.status(200).json(data);
		} else {
			throw new Error(`Data retrieval failed.`);
		}
	} catch (error) {
		console.log('oh noooo')
		console.error(error.message);
		res.status(404).send('Word not found');
	}

});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});