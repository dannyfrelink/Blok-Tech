const express = require(`express`);
const expHandlebars = require(`express-handlebars`);
const app = express();
const port = 5555;
const multer = require(`multer`);
const countriesList = require(`countries-list`);
/* eslint-disable-next-line no-unused-vars */
const bodyParser = require(`body-parser`);
/* eslint-disable-next-line no-unused-vars */
const FileReader = require(`filereader`);
/* eslint-disable-next-line no-unused-vars */
const dotenv = require(`dotenv`).config();
const { MongoClient } = require(`mongodb`);

const dbURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_NAME}`;

let db;
let users;
let photos;
let search;
let travel;

MongoClient.connect(dbURL, { useUnifiedTopology: true }, (err, client) => {
	if (err) {
		console.log(`MongoDB Error:` + err);
	} else {
		db = client.db(process.env.DB_CALL);
		users = db.collection(`persoonsgegevens`);
		photos = db.collection(`fotos`);
		search = db.collection(`zoekopdracht`);
		travel = db.collection(`landen`);
	}
});

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, `./static/public/uploads/`);
	},
	filename: (req, file, callback) => {
		callback(null, `${Date.now()}.jpg`);
	}
});

const upload = multer({
	storage: storage
});

const countries = Object.values(countriesList.countries);
const continents = Object.values(countriesList.continents);

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
	res.render(`profiel-1`, { countries });
});

app.post(`/fotos`, async (req, res) => {
	let usersDB = {};

	try {
		const document = { "name": req.body.name, "nationaliteit": req.body.nation, "geboortedatum": req.body.geboorte, "geslacht": req.body.geslacht, "bio": req.body.bio };
		await users.insertOne({ document });

		usersDB = await users.find({}).toArray();

		console.log(usersDB);
	}
	catch (error) {
		console.error(`Error:`, error);
	}

	res.render(`addFoto`);
});

app.post(`/profiel/fotos`, upload.single(`pfImage`), async (req, res) => {
	const img = `uploads/${req.file.path.split(`/`).pop()}`;
	try {
		const document = { "pfImage": img[0], "extraImage1": img[1], "extraImage2": img[2], "extraImage3": img[3] };
		await photos.insertOne({ document });
	}
	catch (error) {
		console.error(`Error:`, error);
	}

	res.render(`profiel-2`);
});

app.get(`/zoekopdracht`, async (req, res) => {
	res.render(`addZoekopdracht`, { countries });
});

app.post(`/profiel/zoekopdracht`, async (req, res) => {
	let searchDB = {};
	try {
		const document = { "geslacht": req.body.geslacht, "nationaliteit": req.body.nation, "leeftijd": req.body.leeftijd, "interesses": req.body.interesses };
		await search.insertOne({ document });

		searchDB = await search.find({}).toArray();

		console.log(searchDB);
	}
	catch (error) {
		console.error(`Connectie mislukt`, error);
	}
	res.render(`profiel-3`, { searchDB });
});

app.get(`/reizen`, async (req, res) => {
	res.render(`addReizen`, { continents, countries, hbs });
});

app.post(`/profiel/reizen`, async (req, res) => {
	let countriesDB = {};

	try {
		const document = { "landen": req.body.landen };
		await travel.insertOne(document);

		countriesDB = await travel.find({}).toArray();

		console.log(countriesDB);
	}
	catch (error) {
		console.error(`Connectie mislukt`, error);
	}
	res.render(`profiel-4`, { countries, countriesDB });
});

app.use(function (req, res) {
	res.status(404).send(`Sorry, deze pagina kon ik niet vinden.`);
});

app.listen(port, () => {
	console.log(`Listening on port: ${port}`);
});