const express = require(`express`);
const expHandlebars  = require(`express-handlebars`);
const countriesList = require(`countries-list`);
/* eslint-disable-next-line no-unused-vars */
const FileReader = require(`filereader`);
/* eslint-disable-next-line no-unused-vars */
const dotenv = require(`dotenv`).config();
const { MongoClient } = require(`mongodb`);

const dbURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_NAME}`;
const client = new MongoClient(dbURL, {useUnifiedTopology: true});

async function run() {
    try {
        await client.connect();
        console.log(`Connectie gelukt`);
    }
    catch (error) {
        console.error(`Connectie mislukt`, error);
    }
    finally {
        await client.close();
    }
}

run().catch(console.dir);

const landen = Object.values(countriesList.countries);
const continenten = Object.values(countriesList.continents);

const app = express();
const port = 5555;

app.use(express.static(`static/public`));

app.engine(`handlebars`, expHandlebars());
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

app.get(`/zoekopdracht`, (req, res) => {
    res.render(`addZoekopdracht`);
});

app.post(`/profiel/zoekopdracht`, (req, res) => {
    res.render(`profiel-3`);
});

app.get(`/reizen`, (req, res) => {
    res.render(`addReizen`);
});

app.post(`/profiel/reizen`, (req, res) => {
    res.render(`profiel-4`, {landen});
});

app.use(function (req, res, next) {
    res.status(404).send(`Sorry, deze pagina kon ik niet vinden.`);
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
