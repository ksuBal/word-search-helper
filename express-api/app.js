const express = require('express');
const app = express();
const wikiController = require("./controllers/wiki");

const port = 5000;

app.get('/search/:word', async (req, res) => {
	const word = req.params.word;
	try {
		const data = await wikiController.fetchData(word);
		res.status(200).json(data);
	} catch (error) {
		res.status(404).send('Word not found');
	}
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});