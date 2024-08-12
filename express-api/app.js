const express = require('express');
const app = express();
const wikiController = require("./controllers/wiki");
const dwdsController = require("./controllers/dwds");

const port = 5000;

app.get('/search/dwds/:word', async (req, res) => {
	const word = req.params.word;
	try {
		const data = await dwdsController.fetchData(word);
		res.status(200).json(data);
	} catch (error) {
		res.status(404).send('FrequencyData not found');
	}
});

app.get('/search/wiki/:word', async (req, res) => {
	const word = req.params.word;
	try {
		const data = await wikiController.fetchData(word);
		res.status(200).json(data);
	} catch (error) {
		res.status(404).send('FrequencyData not found');
	}
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});