const express = require(`express`);
const expHandlebars = require(`express-handlebars`);
const app = express();
const port = 5555;
const countriesList = require(`countries-list`);
/* eslint-disable-next-line no-unused-vars */
const bodyParser = require(`body-parser`);
/* eslint-disable-next-line no-unused-vars */
const FileReader = require(`filereader`);
/* eslint-disable-next-line no-unused-vars */
const dotenv = require(`dotenv`).config();
const { MongoClient } = require(`mongodb`);

const dbURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_NAME}`;
const client = new MongoClient(dbURL, { useUnifiedTopology: true });

const landen = Object.values(countriesList.countries);
const continenten = Object.values(countriesList.continents);

const hbs = expHandlebars.create({
	helpers: {
		equals: (value1, value2) => { return value1 === value2; }
	}
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(`static/public`));

app.engine(`handlebars`, hbs.engine);
app.set(`view engine`, `handlebars`);

app.get(`/persoonsgegevens`, (req, res) => {
	res.render(`profiel-1`, { landen });
});

app.post(`/fotos`, async (req, res) => {
	let persoonsgegevensDB = {};

	try {
		await client.connect();
		const database = await client.db(process.env.DB_CALL);
		console.log(`Connectie gelukt`);
		const collection = database.collection(`persoonsgegevens`);
		const document = { "name": req.body.name, "nationaliteit": req.body.nation, "geboortedatum": req.body.geboorte, "geslacht": req.body.geslacht, "bio": req.body.bio };
		await collection.insertOne({ document });

		persoonsgegevensDB = await collection.find({}).toArray();

		console.log(persoonsgegevensDB);
	}
	catch (error) {
		console.error(`Connectie mislukt`, error);
	}
	finally {
		await client.close();
	}

	res.render(`addFoto`);
});

app.post(`/profiel/fotos`, async (req, res) => {
	let persoonsgegevensDB = {};
	let fotosDB = {};

	try {
		await client.connect();
		const database = await client.db(process.env.DB_CALL);
		console.log(`Connectie gelukt`);
		const fotoCollection = database.collection(`fotos`);
		const persoonCollection = database.collection(`persoonsgegevens`);
		const document = { "pfImage": req.body.pfImage.innerHTML, "extraImage1": req.body.extraImage1.innerHTML, "extraImage2": req.body.extraImage2.innerHTML, "extraImage3": req.body.extraImage3.innerHTML };
		await fotoCollection.insertOne({ document });

		fotosDB = await fotoCollection.find({}).toArray();
		persoonsgegevensDB = await persoonCollection.find({}).toArray();

		console.log(fotosDB);
		console.log(persoonsgegevensDB);
	}
	catch (error) {
		console.error(`Connectie mislukt`, error);
	}
	finally {
		await client.close();
	}

	res.render(`profiel-2`);
});

app.get(`/zoekopdracht`, async (req, res) => {
	res.render(`addZoekopdracht`);
});

app.post(`/profiel/zoekopdracht`, async (req, res) => {
	let zoekopdrachtDB = {};

	try {
		await client.connect();
		const database = await client.db(process.env.DB_CALL);
		console.log(`Connectie gelukt`);
		const collection = database.collection(`zoekopdracht`);
		const document = { "geslacht": req.body.geslacht, "nationaliteit": req.body.nation, "leeftijd": req.body.leeftijd, "interesses": req.body.interesses };
		await collection.insertOne({ document });

		zoekopdrachtDB = await collection.find({}).toArray();

		console.log(zoekopdrachtDB);
	}
	catch (error) {
		console.error(`Connectie mislukt`, error);
	}
	finally {
		await client.close();
	}
	res.render(`profiel-3`, { zoekopdrachtDB });
});

app.get(`/reizen`, async (req, res) => {
	res.render(`addReizen`, { continenten, landen, hbs });
});

app.post(`/profiel/reizen`, async (req, res) => {
	let landenDB = {};

	try {
		await client.connect();
		const database = await client.db(process.env.DB_CALL);
		console.log(`Connectie gelukt`);
		const collection = database.collection(`landen`);
		const gekozenLanden = { "landen": req.body.landen };
		await collection.insertOne(gekozenLanden);

		landenDB = await collection.find({}).toArray();

		console.log(landenDB);
	}
	catch (error) {
		console.error(`Connectie mislukt`, error);
	}
	finally {
		await client.close();
	}
	res.render(`profiel-4`, { landen, landenDB });
});

app.use(function (req, res) {
	res.status(404).send(`Sorry, deze pagina kon ik niet vinden.`);
});

app.listen(port, () => {
	console.log(`Listening on port: ${port}`);
});