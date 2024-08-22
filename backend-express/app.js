const express = require('express');
const app = express();
const cors = require("cors");
const dlexdbController = require("./controllers/dlexdb");
const wikiController = require("./controllers/wiki");
const dwdsController = require("./controllers/dwds");
const lingueeController = require("./controllers/linguee");

const corsOptions = {
	origin: 'http://localhost:8081'
}

app.use(cors(corsOptions));

app.get('/search/lemma/:word', async (req, res) => {
	const word = req.params.word;
	try {
		const lemma = await dlexdbController.fetchLemma(word);
		res.status(200).json(lemma);
	} catch (error) {
		res.status(404).send('Lemma not found');
	}
});

app.get('/search/linguee/:lemma', async (req, res) => {
	const lemma = req.params.lemma;
	try {
		const data = await lingueeController.fetchData(lemma);
		console.log("IN BACKEND, FETCH LINGUEE DATA: ", data)
		res.status(200).json(data);
	} catch (error) {
		console.log("oooooops, error: ", error)
		res.status(404).send('Linguee Data not found');
	}
});

app.get('/search/dwds/:lemma', async (req, res) => {
	const lemma = req.params.lemma;
	try {
		const data = await dwdsController.fetchData(lemma);
		res.status(200).json(data);
	} catch (error) {
		res.status(404).send('DWDS Data not found');
	}
});

app.get('/search/wiki/:lemma', async (req, res) => {
	const lemma = req.params.lemma;
	try {
		const data = await wikiController.fetchData(lemma);
		res.status(200).json(data);
	} catch (error) {
		res.status(404).send('Wiki Data not found');
	}
});

app.listen(5000, () => {
	console.log(`Server is running on port 5000`);
});