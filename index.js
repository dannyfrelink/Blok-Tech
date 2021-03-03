const express = require(`express`);
const expHandlebars = require(`express-handlebars`);
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

let db = null;

async function run() {
	try {
		await client.connect();
		db = await client.db(process.env.DB_CALL);
		console.log(`Connectie gelukt`);
	}
	catch (error) {
		console.error(`Connectie mislukt`, error);
	}
}

run().catch(console.dir);

const landen = Object.values(countriesList.countries);
const continenten = Object.values(countriesList.continents);

const app = express();
const port = 5555;

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
	res.render(`profiel-1`);
});

app.post(`/fotos`, (req, res) => {
	res.render(`addFoto`);
});

app.post(`/profiel/fotos`, (req, res) => {
	res.render(`profiel-2`);
});

app.get(`/zoekopdracht`, async (req, res) => {
	setTimeout(() => {
		const gekozenZoekopdracht = {"geslacht": req.body.geslacht, "nationaliteit": req.body.nation, "leeftijd": req.body.leeftijd, "interesses": req.body.interesses};
		db.collection(`zoekopdracht`).insertMany(gekozenZoekopdracht);
		res.render(`addZoekopdracht`);
	}, 2000);
});

app.post(`/profiel/zoekopdracht`, (req, res) => {
	res.render(`profiel-3`);
});

app.get(`/reizen`, async (req, res) => {
	setTimeout(() => {
		const gekozenLanden = {"name": req.body.name};
		db.collection(`landen`).insertMany(gekozenLanden);
		res.render(`addReizen`, { continenten, landen, hbs });
	}, 2000);
});

app.post(`/profiel/reizen`, async (req, res) => {
	setTimeout(() => {
		let landenDB = {};
		landenDB = db.collection(`landen`).find({}, {sort: {name: 1}}).toArray();
		res.render(`profiel-4`, { landen, landenDB });
	}, 2000);
});

app.use(function (req, res) {
	res.status(404).send(`Sorry, deze pagina kon ik niet vinden.`);
});

app.listen(port, () => {
	console.log(`Listening on port: ${port}`);
});